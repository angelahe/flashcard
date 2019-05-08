import React from 'react';
import '../styles/flashcard.css';

class DeleteDeckComp extends React.Component {
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
        <p>DeleteDeckComp</p>
      </div>
    );
  }
}
export default DeleteDeckComp;
