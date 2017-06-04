import React  from "react";

export default class InputDiv extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        let readOnly = !this.props.onChange;
        return <div className="col-md-3">
            <input type="text" className="form-control" value = {this.props.value?this.props.value:""} readOnly={readOnly}
                   onChange={this.props.onChange} name={this.props.name} placeholder={this.props.placeholder?this.props.placeholder:""}/>
        </div>;
    }

}