import React  from "react";

import TabList from "../../common/tabList.jsx";


export default class MenuEditor extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            tabItems: this.makeTabListItems(),
            name:"",
            href:"",
            sort:"",
            parentname:"",
            parentId:"",
            lists:[],
        }
    }

    makeTabListItems(){
        if("new" == this.props.action || "add" == this.props.action){
            return this.makeNewTabListItems();
        }else if(this.props.action == "modify"){
            return this.makeModifyTabListItems();
        }
    }

    makeNewTabListItems(){
        let items = [
            {
                text: "菜单列表",
                onClick:()=>{
                    this.props.setComponent(<menuList.Menulist selected={0} setComponent={this.props.setComponent}/>);
                }
            },{
                text: "新建菜单",
            }
        ];
        return items;
    }

    makeModifyTabListItems(){
        let items = [
            {
                text: "菜单列表",
                onClick:()=>{
                    this.props.setComponent(<menuList.Menulist selected={0} setComponent={this.props.setComponent}/>);
                }
            },{
                text: "修改菜单",
            }
        ];
        return items;
    }

    modalShow(){
        if("add" == this.props.action){
            return;
        }
        this.loadMenusTree();
        $('#menuModal').modal('show');
    }

    componentWillMount(){
        this.loadStateFromProps(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.loadStateFromProps(nextProps);
    }

    loadStateFromProps(props){
        if(props.menu){
            let menu = props.menu;
            this.setState({
                id : menu.id,
                name: menu.name,
                sort: menu.sort,
                href: menu.href ? menu.href:"",
            });
        }
        this.setState({
            parentId: props.parentMenu ? props.parentMenu.id : "",
            parentname: props.parentMenu ? props.parentMenu.name : "",
        });
    }

    componentDidMount(){
        this.initJQueryPlugin();
    }

    componentDidUpdate(prevProps, prevState){
        this.initJQueryPlugin();
    }

    initJQueryPlugin(){
        let $treeTable = $("#treeTable");
        if($treeTable.length > 0){
            $treeTable.treetable({ expandable: true });
            $treeTable.treetable("expandAll");
        }
    }

    loadMenusTree(callback){
        $.get("../api/menuManage/allMenus.do",{},(data) => {
            this.setState({
                lists:data
            });
        },"json");
    }

    selectedName(menu){
        this.setState({
            parentname:menu.name,
            parentId:menu.id,
        });
    }

    saveMenu() {
        if("new" == this.props.action || "add" == this.props.action){
            $.post("../api/menuManage/saveMenu.do", {
                parentId : this.state.parentId,
                name : this.state.name,
                href : this.state.href,
                sort : this.state.sort,
            }, (data) => {
                if(data.code == 200){
                    commonUtils.alert("保存成功!");
                    this.props.setComponent(<menuList.Menulist selected={0} setComponent={this.props.setComponent}/>);
                }else{
                    commonUtils.warn(data.data);
                }
            }, "json");
        }else if("modify" == this.props.action){
            $.post("../api/menuManage/saveMenu.do", {
                parentId : this.state.parentId,
                name : this.state.name,
                href : this.state.href,
                sort : this.state.sort,
                id:this.state.id,
            }, (data) => {
                if(data.code == 200){
                    commonUtils.alert("保存成功!");
                    this.props.setComponent(<menuList.Menulist selected={0} setComponent={this.props.setComponent}/>);
                }else{
                    commonUtils.warn(data.data);
                }
            }, "json");
        }
    }

    onInputDataChange(e){
        let state = {};
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    renderlists(){
        let index = 0;
        return this.state.lists.map((list) =>{
            const result =  <tr data-tt-id={list.id} data-tt-parent-id={list.parentId} key={index}>
                <td><a onClick={this.selectedName.bind(this,list)} data-dismiss="modal">{list.name}</a></td>
            </tr>;
            index = index + 1;
            return result;
        });
    }

    renderMenuListModal(){
        let treeTable = null;
        if(this.state.lists.length > 0){
            treeTable = <table id="treeTable" className="table table-striped table-bordered">
                <tbody>
                {this.renderlists()}
                </tbody>
            </table>;
        }

        return <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span><span className="sr-only">Close</span>
                    </button>
                    <h4 className="modal-title">菜单列表</h4>
                </div>
                <div className="modal-body">
                    <div className="panel panel-default ">{treeTable}</div>
                </div>
            </div>
        </div>
    }

    renderMenueditor(){
        let state = this.state;

        return  <div className="container-fluid">
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="row">
                        <div className="form-group col-md-2">
                            <label htmlFor="parentName">上级菜单:</label>
                            <input id="parentName" className="form-control" onClick={this.modalShow.bind(this)}
                                   value={this.state.parentname} readOnly={true}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-4">
                            <label htmlFor="name">名称:</label>
                            <input className="form-control" id="name" name="name" value={state.name} onChange={this.onInputDataChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-7">
                            <label htmlFor="href">链接:</label>
                            <input className="form-control " id="href" name="href" value={state.href} onChange={this.onInputDataChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-2">
                            <label htmlFor="sort">排序:</label>
                            <input className="form-control " id="sort" name="sort" value={state.sort} onChange={this.onInputDataChange.bind(this)}/>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-primary" id="insert" onClick={this.saveMenu.bind(this)}>保存</button>
                    </div>
                    <div id="menuModal" className="modal fade">{this.renderMenuListModal()}</div>
                </div>
            </div>
        </div>;
    }

    render(){
        return <div>
            <TabList items={this.state.tabItems} selected={1}/>
            {this.renderMenueditor()}
        </div>
    }
}