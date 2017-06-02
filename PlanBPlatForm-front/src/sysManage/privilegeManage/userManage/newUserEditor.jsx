var React = require("react");

class NewUserEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount() {
  	$("#newUserForm").ajaxForm({
      success:(data)=>{
        this.props.afterSave(data);
      },
      beforeSerialize:($form,options)=>{
        if($('[name=userName]').val() == ''){
          commonUtils.warn("用户名不能为空");
          return false;
        }
        if($('[name=password]').val() == ''){
          commonUtils.warn("密码不能为空");
          return false;
        }
        if($('[name=realName]').val() == ''){
          commonUtils.warn("真实姓名不能为空");
          return false;
        }

        if($('[name=password2]').val() != $('[name=password]').val()){
          commonUtils.warn("两次密码输入不一致");
          return false;
        }
        return true;
      }
    });
  }
  
  render(){
    return <div className="container">
      <div className="panel panel-default" id="addUserPanel">
        <div className="panel-heading">
          <h1 className="text-center text-primary">新增用户</h1>
        </div>
        <div className="panel-body">
          <form id="newUserForm" method="POST" action="../../../api/sysManage/userManage/user/save.do">
            <div className="row">
              <div className="form-group col-md-6">
                <input className="form-control input-lg" placeholder="账号"
                       name="userName"/>
              </div>
              <div className="form-group col-md-6">
                <input className="form-control input-lg"
                       placeholder="真实姓名" name="realName"/>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <input type="password" className="form-control input-lg"
                       placeholder="密码" name="password"/>
              </div>
              <div className="form-group col-md-6">
                <input type="password" className="form-control input-lg"
                       placeholder="再次输入密码" name="password2"/>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <input className="form-control input-lg" placeholder="邮箱"
                       name="email"/>
              </div>
              <div className="form-group col-md-6">
                <input className="form-control input-lg" placeholder="电话"
                       name="phone"/>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <input className="form-control input-lg" placeholder="公司名称"
                       name="company"/>
              </div>
            </div>
            <div>
              <button type="submit" className="btn  btn-lg btn-primary btn-block">保 存</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  }
}

exports.NewUserEditor = NewUserEditor;