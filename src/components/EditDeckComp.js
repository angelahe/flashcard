import React from 'react';
import '../styles/flashcard.css';
import addbtn from '../img/buttons/add_FFFFFF.png';

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
      <div>
        <p>EditDeckComp</p>
      </div>
    );
  }
}
export default EditDeckComp;
