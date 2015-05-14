import React from "react";
import {Modal, Button} from "react-bootstrap";
import LoginService from "../services/LoginService";
import t from "tcomb-form";
var {Form} = t.form;
import {Navigation} from "react-router";
import reactMixin from "react-mixin";

let Session = t.struct({
  username: t.Str,
  password: t.Str
});

let formOptions = {
  fields: {
    password: {
      type: 'password'
    }
  }
};

var LoginModal = React.createClass({
  mixins: [Navigation],

  render() {
    return (
      <Modal {...this.props} title='Sign in to Hands@Work' animation={true}>
        <div className='modal-body' onSubmit={this.login}>
          <Form ref="form" type={Session} options={formOptions} />
        </div>
        <div className='modal-footer'>
          <Button onClick={this.props.onRequestHide}>Close</Button>
          <Button bsStyle='primary' onClick={this.login}>Sign in</Button>
        </div>
      </Modal>
    );
  },

  login(e) {
    e.preventDefault();
    let values = this.refs.form.getValue();
    if (values) {
      LoginService.login(values.username, values.password, (err, user) => {
        if (err) return console.log(err.message);
        
      });
    }
  }
});

export default LoginModal;