import React from 'react';
import Client from './Client';
import '../styles/flashcard.css';
import DeckListItemComp from './DeckListItemComp';

class DeckListComp extends React.Component {
  constructor() {
    super();
    this.state = {
      currentDeck: '',
      deckList: [],
    };
  }

  componentDidMount = () => {
    this.loadDecks();
  }

  loadDecks = () => {
    Client.getDecks()
      .then(decks => this.setState({ deckList: decks }));
  }

  handleDeckSelect = () => {
    console.log('in handleItemClicked');
  };

  handleDeckEdit = () => {
    console.log('in handle deck edit');
  };

  handleDeckDelete = () => {
    console.log('in handle deck delete');
  };

  render() {
    const {
      deckList,
    } = this.state;

    const deckListItems = deckList.map(deck => (
      <DeckListItemComp
        key={deck.deck_id}
        deck={deck}
        onDeckSelect={this.handleDeckSelect}
        onDeckEdit={this.handleDeckEdit}
        onDeckDelete={this.handleDeckDelete}
      />
    ));

    return (
      <div>
        <div className="AppList">
          {deckListItems}
        </div>
      </div>
    );
  }
}
export default DeckListComp;
