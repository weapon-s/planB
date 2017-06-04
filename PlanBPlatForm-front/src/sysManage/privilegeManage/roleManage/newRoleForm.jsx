import React  from "react";

export default class NewRoleForm extends React.Component{
    constructor(props){
        super(props);
    }

    onSaveRoleInfo(){
        $.post("../api/roleManage/saveRole.do",
            {
                roleName:$("#roleName").val(),
                note: $("#roleNote").val()
            },
            (data)=>{
                if(200 == data.code){
                    commonUtils.alert("保存成功！");
                    if(this.props.afterSave){
                        this.props.afterSave();
                    }
                }else{
                    commonUtils.warn(data.data);
                }
            },"json");
    }

    render(){
        return <div className="container" style={{marginTop:"20px"}}>
            <div className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="key" className="col-sm-2 control-label">角色名称</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="roleName"/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="type" className="col-sm-2 control-label">角色描述</label>
                    <div className="col-sm-10">
                        <textarea className="form-control" id="roleNote" rows="5"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="button" className="btn btn-primary" onClick={this.onSaveRoleInfo.bind(this)}>保存</button>
                    </div>
                </div>
            </div>
        </div>
    }
}