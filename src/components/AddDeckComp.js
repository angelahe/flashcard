import React from 'react';
import Client from './Client';

class AddDeckComp extends React.Component {
  constructor() {
    super();
    this.state = {
      currentDeck: '',
      currentCard: '',
    };
  }

  handleAddDeckClick = () => {
    Client.createDeck().then(id => this.setState({ currentDeck: id }));
  };

  render() {
    const { currentDeck } = this.state;
    return (
      <div>
        <div>
          <p>Add a Deck</p>
          <button type="button" onClick={this.handleAddDeckClick}>
            Add Deck
          </button>
          {currentDeck !== '' ? <p>current deck: {currentDeck}</p> : null}
        </div>
      </div>
    );
  }
}
export default AddDeckComp;
