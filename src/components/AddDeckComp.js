import React from 'react';
import PropTypes from 'prop-types';
import Client from './Client';
import done from '../img/buttons/done_FFFFFF.png';

class AddDeckComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDeck: '',
      nameValue: '',
      keyValue: '',
      orderValue: 0,
    };
  }

  handleNameChange = (event) => {
    this.setState({ nameValue: event.target.value });
  };

  handleKeyChange = (event) => {
    this.setState({ keyValue: event.target.value });
  };

  handleOrderChange = (event) => {
    this.setState({ orderValue: event.target.value });
  };

  handleAddDeckClick = () => {
    const { onDeckAdded } = this.props;

    Client.createDeck()
      .then(id => this.setState({ currentDeck: id },
        // eslint-disable-next-line react/destructuring-assignment
        () => onDeckAdded(this.state.currentDeck)));
  }

  render() {
    const {
      currentDeck,
      nameValue,
      keyValue,
      orderValue,
    } = this.state;
    return (
      <div className="AddDeckComp">
        <div>
          {currentDeck !== ''
            ? <p>current deck: {currentDeck}</p>
            : null
          }
        </div>

        <div>
          <br /> <br />
          <div className="LineContainer">
            <span className="DetailText">Name:</span>
            <input className="DeckName DetailText" value={nameValue} onChange={this.handleNameChange} />
            <br />
          </div>
          <br />
          <div className="LineContainer">
            <span className="DetailText">Key:</span>
            <input className="KeyValue DetailText" value={keyValue} onChange={this.handleKeyChange} />
          </div>
          <br />
          <div className="LineContainer">
            <span className="DetailText">Order:</span>
            <input className="DeckOrder DetailText" type="Number" value={orderValue} onChange={this.handleOrderChange} />
          </div>
          <br />
          <button className="AppBtn AddDeckButton" type="button" onClick={this.handleAddDeckClick}>
            <img className="btnImg" src={done} alt="Done" />
          </button>
        </div>
      </div>
    );
  }
}

AddDeckComp.propTypes = {
  onDeckAdded: PropTypes.func.isRequired,
};
export default AddDeckComp;
