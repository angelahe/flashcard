import React from 'react';
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
    const { deck, addCard } = this.props;
    const { currentL1, currentL2 } = this.state;
    console.log('deck in handleAddCardClick is: ', deck);

    Client.createCard(deck, currentL1, currentL2)
      .then(id => this.setState({ currentCard: id },
        // eslint-disable-next-line react/destructuring-assignment
        () => {
          addCard(this.state.currentCard)
          console.log('the card that was assigned is ', this.state.currentCard)
        }));
  };

  render() {
    const { currentCard, currentL1, currentL2 } = this.state;
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
        {(currentCard !== '') ? <p>current card is: {currentCard}</p> : null}
      </div>
    );
  }
}
export default AddCardComp;
