import React from 'react';

const { hello } = window;

class LoginComp extends React.Component {
  constructor() {
    super();
    this.state = { };
  }

  handleGoogleLogin = () => {
    hello('google').login();
  }

  handleGoogleLogout = () => {
    hello('google').logout();
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.handleGoogleLogin}>Google</button>
      </div>
    );
  }
}
export default LoginComp;
