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

  handleDeckSelect = (deck) => {
    const { onDeckSelect } = this.props;
    onDeckSelect(deck);
  }

  handleDeckEdit = (deck) => {
    const { onDeckEdit } = this.props;
    onDeckEdit(deck);
  }

  handleDeckDelete = (deck) => {
    const { onDeckDelete } = this.props;
    onDeckDelete(deck);
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
        <div className="DeckListComp AppList">
          {deckListItems}
        </div>
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
