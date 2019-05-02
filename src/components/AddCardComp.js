import React from 'react';
import PropTypes from 'prop-types';
import Client from './Client';

class AddCardComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCard: '',
      currentL1: '',
      currentL2: '',
    };
  }

  handleL1Change = (event) => {
    this.setState({ currentL1: event.target.value });
  };

  handleL2Change = (event) => {
    this.setState({ currentL2: event.target.value });
  };

  handleAddCardClick = () => {
    const { deck, onCardAdded } = this.props;
    const { currentL1, currentL2 } = this.state;

    Client.createCard(deck, currentL1, currentL2)
      .then((id) => {
        this.setState({ currentCard: id });
        onCardAdded(id);
      });
  };

  render() {
    const { currentCard, currentL1, currentL2 } = this.state;
    const { deck } = this.props;
    return (
      <div>
        <h1>Add a Card to the Deck</h1>
        <span>L1 word:</span>
        <input value={currentL1} onChange={this.handleL1Change} id="l1word" />
        <br />
        <span>L2 word:</span>
        <input value={currentL2} onChange={this.handleL2Change} id="l2word" />
        <br />
        <button type="button" onClick={this.handleAddCardClick}>
          Add Card
        </button>
        {(currentCard) ? <p>current card: {currentCard}</p> : null}
        {(deck) ? <p>C current deck is: {deck}</p> : null}
      </div>
    );
  }
}

AddCardComp.defaultProps = {
  onCardAdded: () => { },
};

AddCardComp.propTypes = {
  deck: PropTypes.string.isRequired,
  onCardAdded: PropTypes.func,
};

export default AddCardComp;
