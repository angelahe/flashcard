import React from 'react';
import Client from './Client';

class AddDeckandCardComp extends React.Component {
  constructor() {
    super();
    this.state = {
      currentDeck: '',
      currentCard: '',
      currentL1: '',
      currentL2: '',
    };
  }

  handleL1Change = (event) => {
    console.log(this.state.currentL1);
    this.setState({ currentL1: event.target.value });
  }

  handleL2Change = (event) => {
    console.log(this.state.currentL2);
    this.setState({ currentL2: event.target.value });
  }

  handleAddCardClick = () => {
    // const l1Word = document.getElementById('ENword').value;
    // const l2Word = document.getElementById('ESword').value;
    // do error checking for null words
    //const { items } = this.state;
    
    // console.log("items is ", items); - says is undefined

    // console.log('current deck in handleAddCardClick using items is', items.currentDeck);
    console.log('current deck in handleAddCardclick using this.state is', this.state.currentDeck);

    if (this.state.currentDeck) {
      Client.createCard(this.state.currentDeck, this.state.currentL1, this.state.currentL2)
        .then(cardId => this.setState({ currentCard: cardId }));
    }
    //     l1Word, l2Word).then(id => this.setState({ currentCard: id }));
  }

  handleAddDeckClick = () => {
    Client.createDeck().then(id => this.setState({ currentDeck: id }));
    console.log('current deck is ', this.state.currentDeck);
  }

  render() {
    // const { items } = this.state;
    return (
      <div>
        <div>
          <p>Add a Deck</p>
          <button type="button" onClick={this.handleAddDeckClick}>Add Deck</button>
          {(this.state.currentDeck !== '')
            ? <p>current deck: {this.state.currentDeck}</p>
            : null
          }
        </div>
        <div>
          <h2>Add a Card to the Deck</h2>
          <span>L1 word:</span>
          <input value={this.state.currentL1} onChange={this.handleL1Change} id="l1word" /><br />
          <span>L2 word:</span>
          <input value={this.state.currentL2} onChange={this.handleL2Change} id="l2word" /> <br /><br />
          <button type="button" onClick={this.handleAddCardClick}>Add Card</button>
          {this.state.currentCard ? <p>current card: {this.state.currentCard}</p> : null}
        </div>
      </div>
    );
  }
}
export default AddDeckandCardComp;
