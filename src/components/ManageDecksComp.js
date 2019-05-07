import React from 'react';
import AddDeckComp from './AddDeckComp';
import ImagePickComp from './ImagePickComp';
import DeckListItemComp from './DeckListItemComp';
import Client from './Client';
import '../styles/flashcard.css';
import addbtn from '../img/buttons/add_FFFFFF.png';

class ManageDecksComp extends React.Component {
  constructor() {
    super();
    this.state = {
      currentDeck: '',
      deckListShow: true,
      addDeckShow: true,
      deckList: [],
    };
  }

  componentDidMount = () => {
    this.loadDecks();
  }

  onBtnAddClick = () => {
    console.log('add button clicked');
    this.setState({ addDeckShow: true, deckListShow: false });
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
    const {
      addDeckShow, deckList, deckListShow,
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
        <h2>Manage Decks</h2>
        { (deckListShow)
          ? (
            <div>
              <div className="ItemBox AppHeader">
                <span className="AddItem">Add Deck</span>
                <button type="button" className="AppBtn" onClick={this.onBtnAddClick}>
                  <img className="btnImg" src={addbtn} alt="Add" />
                </button>
              </div>
              <div className="AppList">
                {deckListItems}
              </div>
            </div>
          )
          : null
        }
        { (addDeckShow)
          ? (
            <AddDeckComp onDeckAdded={this.handleDeckAdded} />
          )
          : null
        }
      </div>
    );
  }
}
export default ManageDecksComp;
