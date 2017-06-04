import React  from "react";
import ReactDOM from "react-dom";

import ModuleMenu from "./moduleMenu.jsx";

import Navbar from './navbar.jsx';

import LoginForm from "./loginForm.jsx";

export default class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            moduleId: null,
            loginState: "",
            currentUser:null,
            component:null,
        };
    }

    componentWillMount(){
        this.loadLoginState();
    }

    componentWillReceiveProps(nextProps){
        this.loadLoginState();
    }

    loadLoginState(){
        $.get("../api/userCenter/currentUser.do",{},(data)=>{
          if(200 == data.code){
            this.setState({loginState:"login",currentUser:data.data});
          }else{
            this.setState({loginState:"unLogin"});
          }
        });
        this.setState({loginState:"unLogin"});
    }

    logout(){
        $.get("../api/userCenter/logout.do",{},(data) => {
            if(200 == data.code){
                commonUtils.alert("退出成功");
                this.setState({loginState: "unLogin",currentUser:null});
            }
        },"json");
    }

    moduleClick(moduleId){
        this.setState({
            moduleId:moduleId,
            component:""
        });
    }

    setComponent(component){
        this.setState({
            component:component,
        });
    }

    loginSucc(){
        this.loadLoginState();
    }

    renderComponent(){
        if(this.state.component){
            return this.state.component;
        }
    }

    renderMain(){
        if(this.state.loginState == "login"){
            let moduleMenu = null;
            if(this.state.moduleId){
                moduleMenu = <ModuleMenu moduleId={this.state.moduleId} setComponent={this.setComponent.bind(this)} currentUser={this.state.currentUser}/>;
            }
            return <div>
                <Navbar moduleClick={this.moduleClick.bind(this)} currentUser={this.state.currentUser}
                        logout={this.logout.bind(this)}/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2" style={{padding:"50px 0px"}}>
                            <div className="panel-group" id="menuTree" role="tablist"
                                 aria-multiselectable="true">{moduleMenu}</div>
                        </div>
                        <div className="col-md-10" id="components">
                        {this.renderComponent()}
                        </div>
                    </div>
                </div>
            </div>
        }else if(this.state.loginState == "unLogin"){
            return <LoginForm loginSucc={this.loginSucc.bind(this)}/>
        }
        return null;
    }

    render(){
        return this.renderMain();
    }
}

$(document).ready(()=>{
    ReactDOM.render(<Main />,document.getElementById("root"));
});