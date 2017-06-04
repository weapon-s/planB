import React  from "react";

export default class RoleList extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    componentWillMount() {
        this.loadRoleListDatas();
    }

    loadRoleListDatas(){
        $.get("../api/roleManage/roles.do",{},(data)=>{
            this.setState({
                roleListData: data
            });
        },"json");
    }

    onDelRoleList(roleCode){
        $.get("../api/roleManage/role/" + roleCode + "/delete.do",{},(data)=>{
            if(200 == data.code){
                commonUtils.alert("删除成功！");
                this.loadRoleListDatas();
            }else{
                commonUtils.warn(data.data);
            }
        },"json");
    }

    onEnvPrivilegeEdit(info){
        this.props.onEnvEdit(info);
    }

    onRoleGrant(info){
        this.props.onGrantRole(info);
    }

    renderRoleList(){
        if(this.state.roleListData){
            return this.state.roleListData.map((role,index) =>{
                return <tr key={index}>
                    <td>{index+1}</td>
                    <td>{role.roleName}</td>
                    <td>{role.note}</td>
                    <td>
                        <button className="btn btn-danger btn-xs" onClick={this.onDelRoleList.bind(this,role.rolecode)}>删除</button>&nbsp;
                        <button className="btn btn-primary btn-xs" onClick={this.onEnvPrivilegeEdit.bind(this,role)}>权限编辑</button>&nbsp;
                        <button className="btn btn-primary btn-xs" onClick={this.onRoleGrant.bind(this,role)}>角色授予</button>
                    </td>
                </tr>
            })
        }else{
            return <tr></tr>
        }
    }

    render(){
        return <div className="container-fluid">
            <table className="table table-striped table-bordered" style={{margin:"0px auto"}}>
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>角色名称</th>
                        <th>描述</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                {this.renderRoleList()}
                </tbody>
            </table>
        </div>
    }
}