import React from 'react';
import PropTypes from 'prop-types';
import Client from './Client';
import '../styles/flashcard.css';
import DeckListItemComp from './DeckListItemComp';

class DeckListComp extends React.Component {
  _isMounted = false;

  constructor() {
    super();
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

  handleDeckSelect = (deckId) => {
    const { onDeckSelect } = this.props;
    onDeckSelect(deckId);
  }

  handleDeckEdit = (deck) => {
    const { onDeckEdit } = this.props;
    onDeckEdit(deck);
  }

  handleDeckDelete = (deckId) => {
    const { onDeckDelete } = this.props;
    onDeckDelete(deckId);
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
        { deckList
          ? (
            <div className="DeckListComp AppList">
              {deckListItems}
            </div>
          )
          : null
        }
      </div>
    );
  }
}
DeckListComp.defaultProps = {
  onDeckSelect: () => { },
  onDeckEdit: () => { },
  onDeckDelete: () => { },
};

DeckListComp.propTypes = {
  onDeckSelect: PropTypes.func,
  onDeckEdit: PropTypes.func,
  onDeckDelete: PropTypes.func,
};
export default DeckListComp;
