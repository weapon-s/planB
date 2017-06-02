var React = require("react");

var TabList = require("../../../common/tabList.jsx");
TabList = TabList.TabList;

var UserList = require("./userList.jsx");
UserList = UserList.UserList;

var NewUserEditor = require("./newUserEditor.jsx");
NewUserEditor = NewUserEditor.NewUserEditor;

class UserManager extends React.Component {
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

exports.UserManager = UserManager;