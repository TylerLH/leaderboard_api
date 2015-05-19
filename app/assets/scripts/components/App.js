import React from "react";
import {RouteHandler} from "react-router";
import {Navbar, Nav, NavItem, ModalTrigger, DropdownButton, MenuItem} from "react-bootstrap";
import {NavItemLink, MenuItemLink} from "react-router-bootstrap";
import {Link} from "react-router";
import Notifications from "react-bs-notifier";

import NotificationActions from "../actions/NotificationActions";
import NotificationStore from "../stores/NotificationStore";
import LoginActions from "../actions/LoginActions";
import LoginStore from "../stores/LoginStore";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: LoginStore.getState(),
      alerts: NotificationStore.getState()
    };

    this.loginChanged = this._loginChanged.bind(this);
    this.notificationChanged = this._notificationsChanged.bind(this);
  }

  componentDidMount() {
    NotificationStore.listen(this.notificationChanged);
    LoginStore.listen(this.loginChanged);
  }

  componentWillUnmount() {
    NotificationStore.unlisten(this.notificationChanged);
    LoginStore.unlisten(this.loginChanged);
  }

  render() {
    let authLinks = <NavItemLink to='login' eventKey={0}>Login</NavItemLink>;
    if (LoginStore.isLoggedIn()) {
      authLinks = (
        <DropdownButton eventKey={0} title={this.state.login.user.name.full}>
          <MenuItemLink to="dashboard" eventKey='1'>Dashboard</MenuItemLink>
          <MenuItem divider />
          <MenuItem onClick={this.logout.bind(this)}>Sign out</MenuItem>
        </DropdownButton>
      )
    }

    return (
      <div className="App fh">
        <Notifications
          alerts={this.state.alerts.notifications}
          onDismiss={this.dismissNotification.bind(this)}
        />
        <Navbar brand={<Link to="/">Hands@Work</Link>}>
          <Nav right>
            {authLinks}
          </Nav>
        </Navbar>
        <RouteHandler/>
      </div>
    );
  }

  logout(e) {
    e.preventDefault();
    LoginActions.logoutUser();
    let {router} = this.context;
    router.transitionTo('/');
  }

  dismissNotification(notification) {
    NotificationActions.dismissNotification(notification);
  }

  _loginChanged() {
    this.setState({login: LoginStore.getState()});
  }

  _notificationsChanged() {
    this.setState({alerts: NotificationStore.getState()});
  }
}

App.contextTypes = {
  router: React.PropTypes.func.isRequired
}