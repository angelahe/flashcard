import React from 'react';
import Client from './Client';
import '../styles/flashcard.css';
import DeckListItemComp from './DeckListItemComp';

class DeckListComp extends React.Component {
  _isMounted = false;

  constructor() {
    super();
    this.state = {
      currentDeck: '',
      deckList: [],
    };
  }

  componentDidMount = () => {
    this.loadDecks();
    this._isMounted = true;
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  }

  loadDecks = () => {
    Client.getDecks()
      .then((decks) => {
        if (this._isMounted) {
          this.setState({ deckList: decks });
        }
      })
      .catch(err => console.error('There was a problem with getting decks', err.message));
  }

  handleDeckSelect = (deck) => {
    console.log('in handleItemClicked', deck);
  }

  handleDeckEdit = (deck) => {
    console.log('in handle deck edit', deck);
  }

  handleDeckDelete = (deck) => {
    console.log('in handle deck delete', deck);
  }

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
