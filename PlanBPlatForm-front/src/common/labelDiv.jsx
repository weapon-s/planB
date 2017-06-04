import React  from "react";

export default class LabelDiv extends React.Component{
    constructor(props) {
        super(props);
    }
    
    render() {
        return <div className="col-md-1">
            <label>{this.props.title}</label>
        </div>;
    }

}