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
            { test:/\.jsx$/, exclude:/node_modules/, loader: 'babel-loader!jsx-loader?harmony'},
            {test: /\.css$/, exclude:/node_modules/, loader: "style-loader!css-loader?modules"},
            {test: /\.(jpg|png)$/, loader: "url-loader"},
        ]
    },
    devServer:{
        port:8881,
        proxy:{
            "/api":backend,
            "/test/api":testBackend,
        },
    },
    devtool:"source-map",
};