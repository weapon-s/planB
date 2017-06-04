import React  from "react";

import RoleGrantModal from './roleGrantModal.jsx';


import PageTable from "../../../common/pageTable.jsx";

export default class RoleGrantForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentRoleMsg:[],
            availableRoles:{},
            unableRoles:{}
        }
    }

    componentWillMount(){
        this.loadAvailableRoles(1);
    }

    loadAvailableRoles(pageNo){
        $.get("../api/roleManage/role/"+ this.props.currentRoleInfo.rolecode +"/usersInRole/"+ pageNo+ ".do", {}, (data) => {
            this.setState({
                availableRoles:data
            });
        }, "json");
    }

    loadUnableRoles(pageNo){
        $.get("../api/roleManage/role/"+ this.props.currentRoleInfo.rolecode +"/usersNotInRole/"+ pageNo +".do", {}, (data) => {
            this.setState({
                unableRoles:data
            });
        }, "json");
    }

    grantRoleModal(pageNo){
        $.get("../api/roleManage/role/"+ this.props.currentRoleInfo.rolecode +"/usersNotInRole/"+ pageNo +".do", {}, (data) => {
            this.setState({
                unableRoles:data
            });
            $("#roleGrant").modal("show");
        }, "json");
    }

    onChangeCurrentPageNo(pageNo) {
        this.loadAvailableRoles(pageNo)
    }

    onChangeCurrentPageNos(pageNo) {
        this.loadUnableRoles(pageNo)
    }

    onDelList(userCode){
        $.post("../api/roleManage/role/"+this.props.currentRoleInfo.rolecode+"/removeUser.do", {
            userCode:userCode
        }, (data) => {
            if (200 == data.code) {
                commonUtils.alert("删除成功！");
                this.loadAvailableRoles(1);
            } else {
                commonUtils.warn(data.data);
            }
        }, "json");
    }

    render(){
        let availableRoles = this.state.availableRoles;
        if(availableRoles){
            return <div className="container-fluid">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <label htmlFor="">角色名称：{this.props.currentRoleInfo.name}</label>
                        <label htmlFor="" className="col-md-offset-1"></label>
                        <label htmlFor="">角色描述：{this.props.currentRoleInfo.note}</label>
                        <div className="btn btn-danger btn-sm col-md-offset-8" onClick={this.grantRoleModal.bind(this,1)}>角色授予</div>
                    </div>
                    <div className="panel-body">
                        <div className="panel panel-default">
                            <PageTable firstPageNo={availableRoles.firstPage} lastPageNo={availableRoles.lastPage}
                                       currentPageNo={availableRoles.pageNum}
                                       totalPageNo={availableRoles.pages} totalCount={availableRoles.total}
                                       titles={["用户名","真实姓名","操作"]}
                                       onChangeCurrentPageNo={this.onChangeCurrentPageNo.bind(this)}
                                       rows={availableRoles.list}>
                                {
                                    (row) =>{
                                        return <tr key={row.userCode}>
                                            <td>{row.userCode}</td>
                                            <td>{row.userName}</td>
                                            <td>
                                                <button className="btn btn-danger btn-xs" onClick={this.onDelList.bind(this,row.userCode)}>移 除</button>&nbsp;
                                            </td>
                                        </tr>
                                    }
                                }
                            </PageTable>
                        </div>
                    </div>
                </div>
                <RoleGrantModal modalId="roleGrant"
                                unableRoles = {this.state.unableRoles}
                                roleCode = {this.props.currentRoleInfo.rolecode}
                                onChangeCurrentPageNo={this.onChangeCurrentPageNos.bind(this)}
                                onSaveAfter={this.loadAvailableRoles.bind(this,1)}
                />
            </div>
        }else{
            return <div></div>
        }
    }
}