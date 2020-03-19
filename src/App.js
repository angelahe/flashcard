import React from 'react';
import PropTypes from 'prop-types';
import FlashcardComp from './components/FlashcardComp';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.hello = props.hello;
    this.state = { };
  }

  render() {
    return (
      <div className="App">
        <FlashcardComp />
      </div>
    );
  }
}

App.propTypes = {
  hello: PropTypes.func.isRequired,
};

export default App;
