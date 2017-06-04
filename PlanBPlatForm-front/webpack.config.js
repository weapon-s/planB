var webpack = require('webpack');
var path = require('path');
var backend = "http://localhost:8080";
var testBackend = "http://localhost:3000";
module.exports = {
    entry: {
        "app":"./src/index.jsx",
    },
    output: {
        filename: '[name]/index.js',
    },

    module: {
        loaders:[
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    plugins:['transform-runtime'],
                    presets: ['es2015',"react"]
                }
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    plugins:['transform-runtime'],
                    presets: ['es2015']
                }
            }
        ]
    },
    devServer:{
        port:8881,
        proxy:{
            "/api":backend,
            "/test/api":testBackend,
        }
    },
    devtool:"source-map",
};