var React = require("react");

class LabelDiv extends React.Component{
    constructor(props) {
        super(props);
    }
    
    render() {
        return <div className="col-md-1">
            <label>{this.props.title}</label>
        </div>;
    }

}
exports.LabelDiv = LabelDiv;