import React from 'react';
import FlashcardComp from './components/FlashcardComp';
import LoginComp from './components/LoginComp';
import './App.css';
import Client from './components/Client';

const { hello } = window;

hello.init({
  google: '429844335765-5u6hvbq01o05k3likkjf3l89frst4jvh.apps.googleusercontent.com',
}, {
  response_type: 'code',
  redirect_uri: 'redirect.html',
  scope: 'email,openid,profile',
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  componentDidMount = () => {
    hello.on('auth.login', this.sessionStart);
    hello.on('auth.logout', this.sessionEnd);
  }

  sessionStart = (auth) => {
    Client.login(auth.authResponse.id_token);
    hello(auth.network).api('me').then((response) => {
      this.setState({
        user: { id: `${response.id}@${auth.network}`, displayName: response.displayName },
      });
    });
  }

  sessionEnd = (auth) => {
    // Keep the user logged in if their session expires
    hello(auth.network).login()
      .catch(() => {
        this.setState({ user: null });
      });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        { user
          ? <FlashcardComp />
          : <LoginComp />
        }
      </div>
    );
  }
}

export default App;
