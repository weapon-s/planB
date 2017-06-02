var React = require("react");

/**
 * 属性说明：
 * className：定义 input 标签的样式
 * value：日期空间的初始值，数据类型是 Date
 * name：空间的标识，在 onDatePicked 回调中用到
 * onDatePicked ：当日期被选择后的回调，参数表如下： (name,value) name 为属性中的 name，value 则是新的日期
 */
class DatePicker extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let d = this.props.value;
    this.setState({
      value: $.formatDateTime("yy-mm-dd", d),
    });
  }

  onClick() {
    WdatePicker({
      el: this.input,
      onpicked: (dp) => {
        let dpNewDate = dp.cal.newdate;
        let str = dpNewDate.y + "-" + dpNewDate.M + "-" + dpNewDate.d;
        let newDate = new Date(str);

        this.fireDatePicked(str);

        str = $.formatDateTime("yy-mm-dd", newDate);
        this.setState({
          value: str
        });
        return true;
      },

      oncleared:() => {
        this.setState({
          value:""
        });
        this.fireDatePicked(null);
      }
    });
  }

  fireDatePicked(str){
    if (this.props.onDatePicked){
      this.props.onDatePicked(this.props.name, str);
    }
  }

  render() {
    return <div className="input-group">
      <input className={this.props.className} value={this.state.value} name={this.props.name} readOnly ref={(input) => {
        this.input = input
      }}/>
      <div className="input-group-addon" onClick={this.onClick.bind(this)}>
        <span className="glyphicon glyphicon-calendar"/>
      </div>
    </div>
  }
}

exports.DatePicker = DatePicker;