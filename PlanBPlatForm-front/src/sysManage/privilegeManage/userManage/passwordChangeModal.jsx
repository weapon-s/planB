import React  from "react";

import Modal from "../../../common/modal.jsx";

function Form(props) {
  return <form action={props.action} id="passwordChangeForm">
    <div>
      <div className="form-group">
        <label>新密码</label>
        <input type="password" name="password" className="form-control"/>
      </div>
      <div className="form-group">
        <label>再次输入密码</label>
        <input type="password" id="password2" className="form-control"/>
      </div>
    </div>
  </form>
}

export default class PasswordChangeModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  onSave(){
    $("#passwordChangeForm").ajaxSubmit({
      success:(data)=>{
        this.props.afterSave(data);
      },
      beforeSerialize:($form,options)=>{
        if($("[name=password]").val() != $("#password2").val()){
          commonUtils.warn("两次密码不一致");
          return false;
        }
      }
    });
  }

  render(){
    let buttons = ()=>{
      return <div>
        <button className="btn btn-primary" onClick={this.onSave.bind(this)}>保 存</button>
      </div>
    };
    
    return <Modal title="密码修改" buttons={buttons} modalId={this.props.modalId}>
      <Form action={"../../../api/sysManage/userManage/user/" + this.props.userId + "/modifyPassword.do"}/>
    </Modal>
  }
}