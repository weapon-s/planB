import React  from "react";

export default class SelectDiv extends React.Component{
    constructor(props) {
        super(props);
    }

    renderOptions(){
        if(this.props.options){
            let options = this.props.options;
            return options.map((option,index) =>{
                return <option key={index+1}>{option.value}</option>
            })
        }else{
            return this.props.children;
        }
    }
    render() {
        return <div className="col-md-3">
            <input type="text" className="form-control" defaultValue={this.props.value} list={this.props.name} onChange={this.props.onChange} name={this.props.name}/>
            <datalist id={this.props.name}>
                {this.renderOptions()}
            </datalist>
        </div>
    }

}