var React = require("react");

var PageTable = require("../../../common/pageTable.jsx");
PageTable = PageTable.PageTable;

var UserChangeModal = require("./userChangeModal.jsx");
UserChangeModal = UserChangeModal.UserChangeModal;

var PasswordChangeModal = require("./passwordChangeModal.jsx");
PasswordChangeModal = PasswordChangeModal.PasswordChangeModal;

class UserList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      condition:{
        userCode:"",
        userName:"",
        operator:"",
      }
    };
  }

  componentWillMount() {
    this.loadUsers(1);
  }

  loadUsers(pageNo){
    pageNo = pageNo || this.state.usersPager.pageNum;
    let condition = this.state.condition;
    $.post("../api/userManage/users/" + pageNo + ".do",this.state.condition,(data)=>{
      this.setState({
        usersPager: data,
      });
    },"json");
  }

  onClickModifyUserInfo(user){
    this.setState({
      currentChangeUser: user,
    });
    $("#userChangeModal").modal("show");
  }

  onClickModifyPassword(user){
    this.setState({
      currentChangeUser: user,
    });
    $("#passwordChangeModal").modal("show");
  }

  onClickDelete(user){
    var Confirm = new jBox('Confirm', {
      content: '是否要删除',
      confirmButton:"确定",
      cancelButton:"取消",
      confirm:()=>{
        $.get("../../../api/sysManage/userManage/user/" + user.id + "/delete.do",{},(data)=>{
          if(200 == data.code){
            commonUtils.alert("删除成功");
            this.loadUsers();
          }else{
            commonUtils.warn(data.data);
          }
        },"json");
      }
    });
    Confirm.open();
  }

  afterUserInfoModify(data){
    if(200 == data.code){
      commonUtils.alert("修改成功");
      $("#userChangeModal").modal("hide");
      this.loadUsers();
    }else{
      commonUtils.warn(data.data);
    }
  }

  afterPasswordModify(data){
    if(200 == data.code){
      commonUtils.alert("修改成功");
      $("#passwordChangeModal").modal("hide");
      this.loadUsers();
    }else{
      commonUtils.warn(data.data);
    }
  }

  onConditionChange(e){
    let condition = this.state.condition;
    condition[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      condition: condition,
    });
  }

  render(){
    let pageTale = null;
    if(this.state.usersPager){
      let titles = ["用户名","姓名","管理机构","代理编号","操作员","操作"];
      let usersPager = this.state.usersPager;
      pageTale = <PageTable titles={titles} rows={usersPager.list} firstPageNo={usersPager.firstPage}
      lastPageNo={usersPager.lastPage} currentPageNo={usersPager.pageNum} totalPageNo={usersPager.pages}
      totalCount={usersPager.total}>
        {
          (user,index)=>{
            return <tr key={user.userCode}>
              <td>{user.userCode}</td>
              <td>{user.userName}</td>
              <td>{user.comCode}</td>
              <td>{user.agencyCode}</td>
              <td>{user.operator}</td>
              <td>
                <a type="button" className="btn btn-primary btn-xs"
                   onClick={this.onClickModifyUserInfo.bind(this,user)}>修改用户信息</a>&nbsp;
                <a type="button" className="btn btn-primary btn-xs"
                   onClick={this.onClickModifyPassword.bind(this,user)}>修改密码</a>&nbsp;
                <a type="button" onClick={this.onClickDelete.bind(this,user)} className="btn btn-primary btn-xs">删除</a>
              </td>
            </tr>
          }
        }
      </PageTable>
    }

    return <div className="container-fluid" style={{padding:"0px"}}>
      <div className="panel panel-default">
        <div className="panel-heading">用户信息</div>
        <div className="panel-body">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="form-horizontal">
                <div className="form-group">
                  <label className="col-sm-2 control-label">真实姓名</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" value={this.state.condition.userCode}
                           name="userCode" onChange={this.onConditionChange.bind(this)}/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-2 control-label">用户名</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" value={this.state.condition.userName}
                           name="userName" onChange={this.onConditionChange.bind(this)}/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-2 control-label">用户名</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" value={this.state.condition.operator}
                           name="operator" onChange={this.onConditionChange.bind(this)}/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10">
                    <button className="btn btn-default" onClick={()=>{this.loadUsers()}}>查 询</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {pageTale}
        </div>
      </div>
      <UserChangeModal modalId="userChangeModal" user={this.state.currentChangeUser} onSave={this.afterUserInfoModify.bind(this)}/>
      <PasswordChangeModal modalId="passwordChangeModal" userId={this.state.currentChangeUser ? this.state.currentChangeUser.id : null}
                           afterSave={this.afterPasswordModify.bind(this)}/>
    </div>;
  }
}

exports.UserList = UserList;