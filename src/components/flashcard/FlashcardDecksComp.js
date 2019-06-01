import React from 'react';
import PropTypes from 'prop-types';
import Client from '../Client';
import '../../styles/flashcard.css';
import DeckComp from './DeckComp';

class FlashcardDecksComp extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
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
    const { onDeckSelect } = this.props;
    console.log('select deck, need to render game select screen');
    onDeckSelect(deck);
  }

  render() {
    const { deckList } = this.state;

    const deckListItems = deckList.map(deck => (
      <DeckComp
        key={deck.deck_id}
        deck={deck}
        onDeckSelect={this.handleDeckSelect}
      />
    ));

    return (
      <div className="FlashcardDecksComp">
        <div className="DeckContainer">
          {deckListItems}
        </div>
      </div>
    );
  }
}
FlashcardDecksComp.defaultProps = {
  onDeckSelect: () => { },
};
FlashcardDecksComp.propTypes = {
  onDeckSelect: PropTypes.func,
};
export default FlashcardDecksComp;
