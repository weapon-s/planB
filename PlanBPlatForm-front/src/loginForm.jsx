var React = require("react");
var style = require('../static/css/login.css');

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:"",
            managecom:""
        };
    }

    componentWillMount(){
        this.loadManageComOptions();
    }

    componentDidMount(){
        this.initJQueryPlugin();
    }

    loadManageComOptions(){
        $("body").css({background:"url(../static/image/bck-img.jpg)"}).css({height:"100%"});
    }

    initJQueryPlugin(){
        $("#loginForm").ajaxForm({
            success: (data) => {
                if(200 == data.code){
                    commonUtils.alert("登入成功");
                    this.props.loginSucc();
                }else{
                    commonUtils.warn(data.data);
                }
            }
        });
    }

    onInputDataChange(e){
        let state = {};
        state[e.target.name] = e.target.value;
        this.setState(state);
        console.log(this)
    }

    render(){
        return <div>
        <div className="container" style={{padding:"250px 0px"}}>
        <div className="row">
                <div className="col-md-4  col-md-offset-1">
                    <img src="../static/image/logo.png" width="370px" height="219"/>
                </div>
                <div className="col-md-4  col-md-offset-2">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">
                                <label>登录</label>
                            </h3>
                        </div>
                        <div className="panel-body">
                            <form id="loginForm" action="../api/userCenter/login.do" method="POST" acceptCharset="UTF-8" role="form">
                                <fieldset>
                                    <div className="form-group">
                                        <input type="text" name="usercode" className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password" className="form-control"/>
                                    </div>
                                    <button className="btn btn-lg btn-warning btn-block" type="submit">SIGN IN</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
    }
}

exports.LoginForm = LoginForm;