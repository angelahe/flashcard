import React from 'react';
import AddDeckComp from './AddDeckComp';
import '../styles/flashcard.css';
import addbtn from '../img/buttons/add_FFFFFF.png';

class ManageDecksComp extends React.Component {
  constructor() {
    super();
    this.state = {
      currentDeck: '',
      addDeckShow: false,
    };
  }

  onBtnAddClick = () => {
    console.log("add button clicked");
    this.setState({ addDeckShow: true });
  }

  onDeckAdded = (deckId) => {
    this.setState({ currentDeck: deckId });
  };

  render () {
    const {currentDeck, addDeckShow} = this.state;
    return (
      <div>
        <h1>Manage Decks</h1>
        <div className="AppContainer">
          <div className="AppPanel">
            <div className="ItemBox AppHeader">
              <span className="AddItem">Add Deck</span>
              <button className="AppBtn" onClick={this.onBtnAddClick}>
                <img className="btnImg" src={addbtn} alt="Add" />
              </button>
            </div>
            <div className="AppList">
              <p>list of decks will go here</p>
            </div>
          </div>
          <div className="AppPanel">
            {(addDeckShow)
              ? <AddDeckComp addDeck={this.onDeckAdded} />
              : null
            }
          </div>
        </div>
        <AddDeckComp addDeck={this.onDeckAdded} />
        {currentDeck ? <p>current deck is{currentDeck}</p> : null}
      </div>
    );
  }
}
export default ManageDecksComp;
