import React from "react";
import LoginStore from "../stores/LoginStore";

export default (ComposedComponent) => {
  return class AuthenticatedComponent extends React.Component {

    static willTransitionTo(transition) {
      // This method is called before transitioning to this component. If the user is not logged in, we’ll send him or her to the Login page.
      if (!LoginStore.isLoggedIn()) {
        transition.redirect('/login');
      }
    }

    constructor(props) {
      super(props)
      this.state = this._getLoginState();
      this.onChange = this._onChange.bind(this);
    }

    _getLoginState() {
      return {
        userLoggedIn: LoginStore.isLoggedIn(),
        user: LoginStore.user
      };
    }

    // Here, we’re subscribing to changes in the LoginStore we created before. Remember that the LoginStore is an EventEmmiter.
    componentDidMount() {
      LoginStore.listen(this.onChange);
    }

    // After any change, we update the component’s state so that it’s rendered again.
    _onChange() {
      this.setState(this._getLoginState());
    }

    componentWillUnmount() {
        LoginStore.unlisten(this.onChange);
    }

    render() {
      return (
      <ComposedComponent
        {...this.props}
        user={this.state.user}
        userLoggedIn={this.state.userLoggedIn} />
      );
    }
  }
};