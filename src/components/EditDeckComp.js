import React from 'react';
import '../styles/flashcard.css';

class EditDeckComp extends React.Component {
  constructor() {
    super();
    this.state = {
      currentDeck: '',
      deckList: [],
    };
  }

  render() {
    return (
      <div className="EditDeckComp">
        <p>EditDeckComp</p>
      </div>
    );
  }
}
export default EditDeckComp;
