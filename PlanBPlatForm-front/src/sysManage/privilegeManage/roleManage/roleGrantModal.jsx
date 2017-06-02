var React = require("react");

var Modal = require("../../../common/modal.jsx");
Modal = Modal.Modal;

var pageTable = require("../../../common/pageTable.jsx");
var PageTable = pageTable.PageTable;

class RoleGrantModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    onSave(){
        let userIds = [];
        let checkBoxs = $('input');
        for (let i = 0; i < checkBoxs.length; i++) {
            let checkBox = checkBoxs[i];
            if (checkBox.checked) {
                userIds.push(checkBox.value);
            }
        }
        let obj = {
          userCodes:userIds
        };

        $.post("../api/roleManage/role/" + this.props.roleCode + "/addUsers.do",obj,(data)=>{
          if(200 == data.code){
            if(checkBoxs.length>0){
              if(userIds.length<1){
                commonUtils.warn("请重新选择授予角色");
              }else{
                $("#"+this.props.modalId).modal('hide');
                commonUtils.alert("授予角色保存成功");
                if(this.props.onSaveAfter){
                  this.props.onSaveAfter();
                }
              }
            }else{
              commonUtils.warn("暂无可选授予角色");
            }
          }else{
            commonUtils.warn(data.data);
          }
        },"json");
    }

    render(){
        if(this.props.unableRoles){
            let unableRoles = this.props.unableRoles;
            let buttons = ()=>{
                return <div>
                    <button type="button" id="roleGrantBtn" className="btn btn-primary" onClick={this.onSave.bind(this)}>保 存</button>
                </div>
            };
            return <Modal modalId={this.props.modalId} buttons={buttons} title="角色授予">
                <div className="panel panel-default">
                    <PageTable firstPageNo={unableRoles.firstPage} lastPageNo={unableRoles.lastPage}
                               currentPageNo={unableRoles.pageNum}
                               totalPageNo={unableRoles.pages} totalCount={unableRoles.total}
                               titles={["","姓名","操作员"]}
                               onChangeCurrentPageNo={this.props.onChangeCurrentPageNo.bind(this)}
                               rows={unableRoles.list}>
                        {
                            (row) =>{
                                return <tr key={row.userCode}>
                                    <td><input type="checkbox" value={row.userCode}/></td>
                                    <td>{row.userName}</td>
                                    <td>{row.operator}</td>
                                </tr>
                            }
                        }
                    </PageTable>
                </div>
            </Modal>
        }else{
            return <div></div>
        }
    }
}

exports.RoleGrantModal = RoleGrantModal;