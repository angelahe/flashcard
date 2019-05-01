import React from 'react';
import AddDeckComp from './AddDeckComp';

class ManageDecksComp extends React.Component {
  constructor() {
    super();
    this.state = {
      currentDeck: '-1',
    };
  }

  onDeckAdded = (deckId) => {
    this.setState({ currentDeck: deckId });
  }

  render() {
    const { currentDeck } = this.state;
    return (
      <div>
        <h1>Manage Decks</h1>
        <AddDeckComp addDeck={this.onDeckAdded} />
        {currentDeck !== '-1'
          ? <p>current deck is{ currentDeck }</p>
          : null
        }
      </div>
    );
  }
}
export default ManageDecksComp;
