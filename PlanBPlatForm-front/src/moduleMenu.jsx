import React from "react";
import components from "./components";

export default class ModuleMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menus:{
                childMenus:[]
            },
        };
    }

    componentWillMount(){
        this.loadStateFromProps(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.loadStateFromProps(nextProps);
    }

    componentDidMount() {
        this.initPlugin();
    }

    componentDidUpdate(prevProps, prevState) {
        this.initPlugin();
    }

    initPlugin(){
        $(".collapse").on("show.bs.collapse",function(){
            var selector = "#" + $(this).attr("aria-labelledby") + " span";
            $(selector).removeClass("glyphicon-chevron-right")
            .addClass("glyphicon-chevron-down");
        });

        $('.collapse').on('hide.bs.collapse', function () {
            var selector = "#" + $(this).attr("aria-labelledby") + " span";
            $(selector).removeClass("glyphicon-chevron-down")
            .addClass("glyphicon-chevron-right");
        });
    }

    loadStateFromProps(props){
        $.get("../api/menuManage/module/" + props.moduleId + "/menus.do",{},(data) => {
            this.setState({
                menus:data
            });
        });
    }

    renderPanelHeading(menu){
        return <div key={'tree' + menu.menu.id} className="panel-heading" id={'tree' + menu.menu.id} role="tab">
            <h4 className="panel-title">
                <a data-toggle="collapse" data-parent="#menuTree"
                   href={'#collapse' + menu.menu.id} aria-expanded="true" aria-controls={'collapse' + menu.menu.id}>
                    <span className="glyphicon glyphicon-chevron-right"></span>&nbsp;{menu.menu.name}</a>
            </h4>
        </div>
    }

    renderCollapse(menu){
        return <div key={'collapse' + menu.menu.id} id={'collapse' + menu.menu.id} className="panel-collapse collapse"
                    role="tabpanel" aria-labelledby={'tree' + menu.menu.id}>
            <div className="list-group">{this.renderMenuItem(menu)}</div>
        </div>;
    }

    renderMenuItem(menu){
        return menu.childMenus.map((menuItem) => {
            return <a key={menuItem.menu.id} className="list-group-item" style={{cursor:"pointer"}}
                onClick={this.selectMenu.bind(this,menuItem)}>
                <span className="glyphicon glyphicon-tag"></span>&nbsp;{menuItem.menu.name}</a>
        });
    }

    renderMenus(){
        let result = [];
        let menus = this.state.menus.childMenus;
        menus.map((menu) => {
          result.push(this.renderPanelHeading(menu));
          result.push(this.renderCollapse(menu));
        });
        return result;
    }

    selectMenu(info,e){
        $("#menuTree .list-group a").removeClass("active");
        $(e.target).addClass("active");

        if(this.props.setComponent){
            const Component = components[info.menu.href];
            if(Component){
                this.props.setComponent(<Component setComponent={this.props.setComponent} currentUser={this.props.currentUser}/>);
            }
        }
    }

    render(){
        return <div className="panel panel-default">{this.renderMenus()}</div>;
    }
}