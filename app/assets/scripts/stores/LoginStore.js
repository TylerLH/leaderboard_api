var alt = require('../alt');
var LoginActions = require('../actions/LoginActions');

class LoginStore {
  constructor() {
    this.credentials = JSON.parse(localStorage.getItem('credentials'));
    this.user = JSON.parse(localStorage.getItem('user'));

    this.bindListeners({
      handleLogin: LoginActions.LOGIN_USER,
      handleLogout: LoginActions.LOGOUT_USER
    });
  }

  handleLogin(payload) {
    this.user = payload.user;
    this.credentials = payload.credentials;

    localStorage.setItem('user', JSON.stringify(this.user));
    localStorage.setItem('credentials', JSON.stringify(this.credentials));
  }

  handleLogout() {
    this.user = null;
    this.credentials = null;

    localStorage.removeItem('user');
    localStorage.removeItem('credentials');
  }

  static isLoggedIn() {
    let state = this.getState();
    return !!state.user;
  }
}

module.exports = alt.createStore(LoginStore, 'LoginStore');

