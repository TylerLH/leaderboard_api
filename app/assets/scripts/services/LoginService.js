import request from "superagent";
import LoginActions from "../actions/LoginActions";

class LoginService {
  login(username, password, cb) {
    request
      .post('/api/authenticate')
      .send({username: username, password: password})
      .end( (err, res) => {
        LoginActions.loginUser({user: res.body, credentials: {username: username, password: password} });
        if (cb) {
          if (err) return cb(err);
          cb(null, res.body);
        }
      });
  }
}

export default new LoginService();