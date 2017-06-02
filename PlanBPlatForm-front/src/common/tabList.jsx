var React = require("react");
var ReactDOM = require("react-dom");

/**
 * 必要属性 items,selected
 * items，为数组，元素属性 {text,onClick}
 */
class TabList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selected : props.selected,
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            selected : nextProps.selected,
        });
    }

    onItemClick(index){
        this.setState({
            selected : index
        });
        if(this.props.items[index].onClick){
            this.props.items[index].onClick();
        }
    }

    renderItems(){
        let index = 0;
        return this.props.items.map((item) => {
            let className = "";
            if (index == this.state.selected) {
                className = "active";
            }
            const result = <li key={index} role="presentation" className={className}>
                <a href="javascript:void(0)" onClick={this.onItemClick.bind(this,index)}>{item.text}</a></li>;
            index = index + 1;
            return result
        });
    }

    render(){
        return <ul className="nav nav-tabs" role="tablist">{this.renderItems()}</ul>
    }
}

exports.TabList = TabList;