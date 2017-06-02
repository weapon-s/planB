var React = require("react");

var Modal = require("../../../common/modal.jsx");
Modal = Modal.Modal;

function Form(props) {
  if(props.user){
    return form = <form id="userInfoChangeForm" action={props.action} method="POST">
      <input type="hidden" name="id" value={props.user.id}/>
      <div>
        <div className="form-group">
          <label htmlFor="realName">真实姓名</label>
          <input name="realName" className="form-control" value={props.user.realName}
                 onChange={props.onInputDataChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">邮箱</label>
          <input name="email" className="form-control" value={props.user.email}
                 onChange={props.onInputDataChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="phone">电话</label>
          <input name="phone" className="form-control" value={props.user.phone}
                 onChange={props.onInputDataChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="company">公司名称</label>
          <input name="company" className="form-control" value={props.user.company}
                 onChange={props.onInputDataChange}/>
        </div>
      </div>
    </form>;
  }else{
    return <form action={props.action}/>
  }
}

class UserChangeModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {};    
  }

  componentWillMount() {
    this.loadStateFromProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadStateFromProps(nextProps);
  }

  loadStateFromProps(props){
    if(props.user){
      let user = {};
      $.extend(user,props.user);
      this.setState({
        user:user,
      });
    }
  }

  onInputDataChange(e){
    let user = this.state.user;
    user[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      user: user,
    });
  }
  
  render(){
    let onSave = ()=>{
      $("#userInfoChangeForm").ajaxSubmit({
        success:(data)=>{
          this.props.onSave(data);
        }
      });
    };
    let buttons = ()=>{
      return <div>
        <button className="btn btn-primary" onClick={onSave}>保存修改</button>
      </div>
    };
    return <Modal title="用户信息" modalId={this.props.modalId} buttons={buttons}>
      <Form user={this.state.user} onInputDataChange={this.onInputDataChange.bind(this)}
            action="../../../api/sysManage/userManage/user/save.do"/>
    </Modal>
  }
}

exports.UserChangeModal = UserChangeModal;