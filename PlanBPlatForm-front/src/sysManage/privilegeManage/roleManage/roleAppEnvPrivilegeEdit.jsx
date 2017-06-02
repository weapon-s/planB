var React = require("react");

class RoleAppEnvPrivilegeEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
      this.loadMenuTree();
    }

    loadMenuTree(){
        let ztreeSetting = {
            check : {
                enable : true
            }
        };
        let zTree = null;
        $.get("../api/roleManage/role/"+ this.props.currentRoleInfo.rolecode +"/roleMenusPrivilegeTree.do",{},(data)=>{
            zTree = $.fn.zTree.init($("#treeDemo"), ztreeSetting, data);
            this.setState({
                zTree:zTree
            })
        },"json");
    }

    saveMenu(){
        let menuIds = [];
        let nodes = this.state.zTree.getNodes();
        for (let i = 0; i < nodes.length; i++) {
            var childs = nodes[i].children;
            if (childs) {
                for (let j = 0; j < childs.length; j++) {
                    let threeChilds = childs[j].children;
                    if(threeChilds){
                        for(let a = 0; a < threeChilds.length; a++){
                            let leafMenu = threeChilds[a];
                            if(leafMenu.getCheckStatus().checked){
                                menuIds.push(leafMenu.menuId);
                            }
                        }
                    }
                }
            }
        }
        var obj = {
            roleCode : this.props.currentRoleInfo.rolecode,
            menuIds : menuIds
        };

        $.ajax({
            method : "POST",
            url : "../api/roleManage/saveRoleMenusPrivilege.do",
            contentType : "text/json",
            data : JSON.stringify(obj),
            success : function(data) {
                if(200 == data.code){
                    commonUtils.alert("保存成功！");
                }else{
                    commonUtils.warn(data.data);
                }
            }
        });
    }

    render(){
        return <div className="panel panel-default">
            <div className="panel-heading">
                <div className="row">
                    <label htmlFor="">角色名称：{this.props.currentRoleInfo.name}</label>
                    <label htmlFor="" className="col-md-offset-1"></label>
                    <label htmlFor="">角色描述：{this.props.currentRoleInfo.note}</label>
                </div>
            </div>
            <div className="panel panel-body">
                <div className="panel panel-default">
                    <div className="panel-heading">菜单权限列表</div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-12">
                                <ul id="treeDemo" className="ztree"></ul>
                            </div>
                            <div className="col-md-12">
                                <div className="btn btn-primary" onClick={this.saveMenu.bind(this)}>保存菜单权限</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}


exports.RoleAppEnvPrivilegeEdit = RoleAppEnvPrivilegeEdit;