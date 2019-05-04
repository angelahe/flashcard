import React from 'react';
import AddDeckComp from './AddDeckComp';
import ImagePickComp from './ImagePickComp';
import DeckListItem from './DeckListItem';
import Client from './Client';
import '../styles/flashcard.css';
import addbtn from '../img/buttons/add_FFFFFF.png';

class ManageDecksComp extends React.Component {
  constructor() {
    super();
    this.state = {
      currentDeck: '',
      addDeckShow: false,
      deckList: [],
    };
  }

  componentDidMount = () => {
    this.loadDecks();
  }

  onBtnAddClick = () => {
    console.log('add button clicked');
    this.setState({ addDeckShow: true });
  };

  handleDeckAdded = (deckId) => {
    this.setState({ currentDeck: deckId });
  };

  handleDeckSelect = () => {
    console.log('in handleItemClicked');
  };

  handleDeckEdit = () => {
    console.log('in handle deck edit');
  };

  handleDeckDelete = () => {
    console.log('in handle deck delete');
  };

  loadDecks = () => {
    Client.getDecks()
      .then(decks => this.setState({ deckList: decks }));
  }

  render() {
    const { currentDeck, addDeckShow, deckList } = this.state;
    const deckListItems = deckList.map(deck => (
      <DeckListItem
        key={deck.deck_id}
        deck={deck}
        onDeckSelect={this.handleDeckSelect}
        onDeckEdit={this.handleDeckEdit}
        onDeckDelete={this.handleDeckDelete}
      />
    ));

    return (
      <div>
        <h1>Manage Decks</h1>
        <div className="AppContainer">
          <div className="AppPanel">
            <div className="ItemBox AppHeader">
              <span className="AddItem">Add Deck</span>
              <button type="button" className="AppBtn" onClick={this.onBtnAddClick}>
                <img className="btnImg" src={addbtn} alt="Add" />
              </button>
            </div>
            <div className="AppList">
              <p>list of decks will go here</p>
              {deckListItems}
            </div>
            <ImagePickComp />
          </div>
          <div className="AppPanel">
            {(addDeckShow)
              ? <AddDeckComp onDeckAdded={this.handleDeckAdded} />
              : null
            }
            {currentDeck ? <p>M current deck: {currentDeck}</p> : null}
          </div>
        </div>
      </div>
    );
  }
}
export default ManageDecksComp;
