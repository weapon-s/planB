import React  from "react";

import TabList from "../../../common/tabList.jsx";

import UserList from "./userList.jsx";

import NewUserEditor from "./newUserEditor.jsx";

export default class UserManager extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.actions = {
      "list":()=>{
        return <UserList/>
      },
      "new":()=>{
        return <NewUserEditor afterSave={this.afterSaveNewUser.bind(this)}/>
      }
    }
  }

  componentWillMount() {
    this.showList();
  }

  showList(){
    this.setState({
      tabItems:[
        {
          text:"用户信息",
          onClick:()=>{
            this.setState({
              tabIndex:0,
              action:"list",
            });
          }
        },{
          text:"新建用户",
          onClick:()=>{
            this.setState({
              tabIndex:1,
              action:"new",
            });
          }
        }
      ],
      tabIndex:0,
      action:"list",
    });
  }

  afterSaveNewUser(data){
    if(200 == data.code){
      commonUtils.alert("创建成功");
      this.showList();
    }else{
      commonUtils.warn(data.data);
    }
  }

  render(){
    return <div>
      <TabList items={this.state.tabItems} selected={this.state.tabIndex}/>
      {this.actions[this.state.action]()}
    </div>
  }
}