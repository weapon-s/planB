import React  from "react";

import TabList from "../../../common/tabList.jsx";

import RoleList from './roleList.jsx';

import NewRoleForm  from './newRoleForm.jsx';

import RoleGrantForm from './roleGrantForm.jsx';

import RoleAppEnvPrivilegeEdit from './roleAppEnvPrivilegeEdit.jsx';

export default class RoleManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.actions = {
            "list": this.renderRoleList.bind(this),
            "new": this.renderNewRoleForm.bind(this),
            "edit": this.renderRoleAppEnvPrivilegeEdit.bind(this),
            "grant": this.renderRoleGrantForm.bind(this)
        }
    }
    componentWillMount() {
        this.showRoleList();
    }

    renderRoleList(){
        return <RoleList onEnvEdit={this.showRoleAppEnvPrivilegeEdit.bind(this)}
                         onGrantRole={this.showRoleGrantForm.bind(this)}
        />
    }

    renderNewRoleForm(){
        return <NewRoleForm  afterSave={
			()=>{
				this.setState({
					tabIndex: 0,
					action:"list"
				});
				}
			}/>
    }

    renderRoleAppEnvPrivilegeEdit(){
        return <RoleAppEnvPrivilegeEdit currentRoleInfo={this.state.currentRoleMsg} afterSave={
			()=>{
				this.setState({
					tabIndex: 0,
					action:"list"
				});
				}
			}/>
    }

    renderRoleGrantForm(){
        return <RoleGrantForm currentRoleInfo={this.state.currentRoleMsg} afterSave={
			()=>{
				this.setState({
					tabIndex: 0,
					action:"list"
				});
				}
			}/>
    }

    showRoleList(){
        this.setState({
            tabItems:[
                {
                    text:"角色列表",
                    onClick:()=>{
                        this.setState({
                            action: "list",
                            tabIndex: 0
                        });
                    }
                },{
                    text:"新建角色",
                    onClick:() =>{
                        this.showNewRoleForm();
                    }
                }
            ],
            tabIndex:0,
            action:"list"
        });
    }

    showNewRoleForm(){
        this.setState({
            tabItems:[
                {
                    text:"角色列表",
                    onClick:()=>{
                        this.setState({
                            action: "list",
                            tabIndex: 0
                        });
                    }
                },
                {
                    text:"新建角色",
                    onClick:()=>{
                        this.setState({
                            action: "new",
                            tabIndex: 1
                        });
                    }
                }
            ],
            tabIndex:1,
            action:"new"
        });
    }

    showRoleGrantForm(info){
        this.setState({
            tabItems:[
                {
                    text:"角色列表",
                    onClick:()=>{
                        this.showRoleList();
                    }
                },
                {
                    text:"角色授予",
                    onClick:()=>{
                        this.setState({
                            action: "grant",
                            tabIndex: 1
                        });
                    }
                }
            ],
            tabIndex:1,
            action:"grant",
            currentRoleMsg:info
        });
    }

    showRoleAppEnvPrivilegeEdit(info){
        this.setState({
            tabItems: [
                {
                    text:"角色列表",
                    onClick:()=>{
                        this.showRoleList();
                    }
                },
                {
                    text:"环境权限编辑",
                    onClick:()=>{
                        this.setState({
                            action: "edit",
                            tabIndex: 1,
                        });
                    }
                }
            ],
            tabIndex:1,
            action:"edit",
            currentRoleMsg:info
        });
    }

    render(){
        return <div>
            <TabList items={this.state.tabItems} selected={this.state.tabIndex}/>
            {this.actions[this.state.action]()}
        </div>
    }
}