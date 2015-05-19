import React from "react";
import LoginService from "../services/LoginService";
import {Button} from "react-bootstrap";
import t from "tcomb-form";
var {Form} = t.form;
import {Navigation} from "react-router";

import NotificationActions from "../actions/NotificationActions";

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
      <div className="Login container">
        <div className="page-header">
          <h1>Sign in to Hands@Work</h1>
        </div>
        <form onSubmit={this.login}>
          <Form ref="form" type={Session} options={formOptions} />
          <Button bsStyle='primary' type="submit">Sign in</Button>
        </form>
      </div>
    );
  },

  login(e) {
    e.preventDefault();
    let values = this.refs.form.getValue();
    if (values) {
      LoginService.login(values.username, values.password, (err, user) => {
        if (err) return NotificationActions.addNotification({message: err.message, type: 'error'});
        NotificationActions.addNotification({message: "Logged in successfully.", type: "success"});
        this.transitionTo('dashboard');
      });
    }
  }
});

export default LoginModal;