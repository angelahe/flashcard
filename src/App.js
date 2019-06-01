import React from 'react';
import PropTypes from 'prop-types';
import FlashcardComp from './components/FlashcardComp';
import LoginComp from './components/LoginComp';
import './App.css';
import Client from './components/Client';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.hello = props.hello;
    this.state = {
      user: null,
    };
  }

  componentDidMount = () => {
    this.hello.init({
      google: '429844335765-5u6hvbq01o05k3likkjf3l89frst4jvh.apps.googleusercontent.com',
    }, {
      response_type: 'code',
      redirect_uri: 'redirect.html',
      scope: 'email,openid,profile',
    });
    this.hello.on('auth.login', this.sessionStart);
    this.hello.on('auth.logout', this.sessionEnd);
  }

  sessionStart = (auth) => {
    Client.login(auth.authResponse.id_token);
    this.hello(auth.network).api('me').then((response) => {
      this.setState({
        user: { id: `${response.id}@${auth.network}`, displayName: response.displayName },
      });
    });
  }

  sessionEnd = (auth) => {
    // Keep the user logged in if their session expires
    this.hello(auth.network).login()
      .catch(() => {
        this.setState({ user: null });
      });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        { user
          ? <FlashcardComp />
          : <LoginComp />
        }
      </div>
    );
  }
}

App.propTypes = {
  hello: PropTypes.shape({
    init: PropTypes.func,
    on: PropTypes.func,
  }).isRequired,
};

export default App;
