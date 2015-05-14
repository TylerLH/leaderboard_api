var alt = require('../alt');

class LoginActions {
  loginUser(credentials) {
    this.dispatch(credentials);
  }

  logoutUser() {
    this.dispatch();
  }
}

module.exports = alt.createActions(LoginActions);