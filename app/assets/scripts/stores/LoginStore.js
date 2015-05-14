var alt = require('../alt');
var LoginActions = require('../actions/LoginActions');

class LoginStore {
  constructor() {
    this._credentials = null
    this._user = null

    this.bindListeners({
      handleLogin: LoginActions.LOGIN_USER
    });
  }

  handleLogin(payload) {
    this._user = payload.user;
    this._credentials = payload.credentials;
  }

  get user() {
    return this._user;
  }

  get credentials() {
    return this._credentials;
  }

  static isLoggedIn() {
    return !!this._user;
  }
}

module.exports = alt.createStore(LoginStore, 'LoginStore');

