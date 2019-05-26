import React from 'react';
import PropTypes from 'prop-types';
import Client from '../Client';
import '../../styles/flashcard.css';
import ActionBarComp from '../ActionBarComp';
import DeckComp from './DeckComp';

class FlashcardDecksComp extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      headerText: 'Flashcards',
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

  handleAddClick = () => {
    const { onAdd } = this.props;
    onAdd();
  }

  handleDeckSelect = (deck) => {
    console.log('select deck, need to render game select screen');
  }

  render() {
    const { headerText, deckList } = this.state;

    const deckListItems = deckList.map(deck => (
      <DeckComp
        key={deck.deck_id}
        deck={deck}
        onDeckSelect={this.handleDeckSelect}
      />
    ));

    return (
      <div className="FlashcardDecksComp">
        <ActionBarComp
          showAdd
          showBack={false}
          headerText={headerText}
          onAdd={this.handleAddClick}
        />
        <div className="DeckContainer">
          {deckListItems}
        </div>
      </div>
    );
  }
}
FlashcardDecksComp.defaultProps = {
  onAdd: () => { },
};
FlashcardDecksComp.propTypes = {
  onAdd: PropTypes.func,
};
export default FlashcardDecksComp;
