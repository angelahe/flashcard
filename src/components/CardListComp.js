import React from 'react';
import '../styles/flashcard.css';
import addbtn from '../img/buttons/add_FFFFFF.png';
import DeckListItemComp from './DeckListItemComp';

class CardListComp extends React.Component {
  constructor() {
    super();
    this.state = {
      currentDeck: '',
      deckList: [],
    };
  }

  render() {
    return (
      <div>
        <p>DeckListComp</p>
      </div>
    );
  }
}
export default CardListComp;
