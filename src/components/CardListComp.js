import React from 'react';
import '../styles/flashcard.css';

class CardListComp extends React.Component {
  constructor() {
    super();
    this.state = {
      currentCard: '',
      CardList: [],
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
