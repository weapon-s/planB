import React from "react";

import OutsidePlanInput  from  "./outsidePlanInput.jsx";

import OutsidePlanQuery from "./outsidePlanQuery.jsx";

export default class OutsidePlan extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.actions = {
            "input":this.renderOutsidePlanInput.bind(this),
            "query":this.renderOutsidePlanQuery.bind(this)
        }
    }

    componentWillMount() {
        this.showAgentConfQuery();
    }

    renderOutsidePlanInput(){
        return <OutsidePlanInput currentPersonData={this.state.currentData} afterSave={
            () =>{
                this.setState({
                    action:"query"
                })
            }
        }/>
    }

    renderOutsidePlanQuery(){
        return <OutsidePlanQuery onViewDetails={this.showOutsidePlanInput.bind(this)}/>
    }

    showOutsidePlanInput(info){
        this.setState({
            action:"input",
            currentData:info
        })
    }

    showAgentConfQuery(){
        this.setState({
            action:"query"
        })
    }
    
    render(){
        return <div>
            {this.actions[this.state.action]()}
        </div>
    }
}

