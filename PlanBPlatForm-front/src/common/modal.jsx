var React = require("react");
var ReactDOM = require("react-dom");

class Modal extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return <div className="modal fade" id={this.props.modalId}>
      <div className={this.props.modalSize} role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">{this.props.title}</h4>
          </div>
          <div className="modal-body">
            {this.props.children}
          </div>
          <div className="modal-footer">
            {this.props.buttons ? this.props.buttons() : null}
          </div>
        </div>
      </div>
    </div>
  }
}

exports.Modal = Modal;