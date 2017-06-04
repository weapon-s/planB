import React from "react";

import TabList from "../../common/tabList.jsx";

import MenuEditor from "./menuEditor.jsx";

export default class Menulist extends React.Component{
    constructor(props){
        super(props);
        let items = [
            {
                text : "菜单列表",
                onClick:() => {
                    this.props.setComponent(<Menulist selected={0} setComponent={this.props.setComponent}/>);
                },
            },{
                text : "菜单添加",
                onClick:() => {
                    this.props.setComponent(<MenuEditor action="new" setComponent={this.props.setComponent}/>);
                }
            }
        ];
        this.state = {
            tabItems: items,
            lists:[],
        };
    }

    componentWillMount(){
        this.loadMenus();
    }

    componentWillReceiveProps(){
        this.loadMenus();
    }

    componentDidMount() {
        this.initJQueryPlugin();
    }

    componentDidUpdate(){
        this.initJQueryPlugin();
    }

    // 加载数据
    loadMenus(){
        $.get("../api/menuManage/allMenus.do",{},(data) => {
            this.setState({
                lists:data,
            });
        },"json");
    }

    initJQueryPlugin(){
        let $treeTable = $("#treeTable");
        if($treeTable.length > 0){
            $treeTable.treetable({ expandable: true });
            $treeTable.treetable("expandAll");
        }
    }

    modifyOrderlist(menu){
        let parentMenu = null;
        for(let i = 0; i < this.state.lists.length; i++){
            if(this.state.lists[i].id == menu.parentId){
                parentMenu = this.state.lists[i];
            }
        }
        this.props.setComponent(<MenuEditor action="modify" menu={menu} parentMenu={parentMenu}
                setComponent={this.props.setComponent}/>);
    }

    addNextlist(parentMenu){
        this.props.setComponent(<MenuEditor action="add" parentMenu={parentMenu}
            setComponent={this.props.setComponent}/>);
    }
    
    delMenu(id){
        $.get("../api/menuManage/menu/" + id + "/delete.do",{},(data) => {
          commonUtils.alert("删除成功");
            this.loadMenus();
        },"json");
    }
    renderlists(){
        if(this.state.lists.length < 1){
            return null;
        }

        return <table id="treeTable" className="table table-striped table-bordered">
            <tbody>
            <tr>
                <th className="col-md-4">名称</th>
                <th className="col-md-4">链接</th>
                <th className="col-md-1">排序</th>
                <th className="col-md-3">操作</th>
            </tr>
            {this.state.lists.map((list)=>{
                return <tr data-tt-id={list.id} data-tt-parent-id={list.parentId} key={list.id}>
                    <td>{list.name}</td>
                    <td>{list.href}</td>
                    <td>{list.sort}</td>
                    <td>
                        <a onClick={this.modifyOrderlist.bind(this,list)} className="btn btn-primary btn-xs">修改</a>&nbsp;
                        <a onClick={this.delMenu.bind(this,list.id)} className="btn btn-danger btn-xs">删除</a>&nbsp;
                        <a onClick={this.addNextlist.bind(this,list)} className="btn btn-primary btn-xs">添加下级菜单</a>
                    </td>
                </tr>;
            })}
            </tbody>
        </table>;
    }

    renderListform(){
        return <form id="listForm" method="post">
            <div className="container-fluid">
                <div className="panel panel-default">
                    {this.renderlists()}
                </div>
            </div>
        </form>
    }
    render(){
        return <div>
            <TabList items={this.state.tabItems} selected={0}/>
            {this.renderListform()}
        </div>
    }
}