var React = require("react");
var ReactDOM = require("react-dom");

class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menus: [],
        };
    }
    //
    componentWillMount(){
        this.loadModules();
    }

    componentWillReceiveProps(nextProps){
        this.loadModules(nextProps);
    }

    //请求顶层导航目录json//
    loadModules(){
        $.get("../api/menuManage/modules.do",{},(data) => {
            this.setState({
                menus:data,
            });
        },"json");
    }

    onModuleClick(module){
        this.setState({
            selectedId:module.id,
        });
        this.props.moduleClick(module.id);
    }
    // 模块列表
    renderItems(){
        return this.state.menus.map((menu) => {
            var className = menu.id == this.state.selectedId ? 'active' : '';
            return <li role="modulLink" className={className} key={menu.id} style={{cursor:"pointer"}}>
                <a onClick={this.onModuleClick.bind(this,menu)}>{menu.name}</a>
            </li>
        });
    }

    render(){
        return <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed"
                            data-toggle="collapse" data-target="#navbar" aria-expanded="false"
                            aria-controls="navbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar">
                        </span>
                        <span className="icon-bar">
                        </span>
                        <span className="icon-bar">
                        </span>
                    </button>

                    <a className="navbar-brand" href="index.html">需求管理平台</a>
                </div>

                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">{this.renderItems()}</ul>
                    <div className="navbar-right">
                        <p className="navbar-text">
                            <a className="text-muted" target="homeFrame" href="#" >{this.props.currentUser?this.props.currentUser.userCode:""}</a>
                        </p>
                        <ul className="nav navbar-nav">
                            <li><a style={{cursor:"pointer"}} onClick={this.props.logout}>logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    }
}

exports.Navbar = Navbar;