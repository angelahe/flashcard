import React from 'react';
import '../styles/flashcard.css';

class DeleteDeckComp extends React.Component {
  constructor() {
    super();
    this.state = {
      currentDeck: '',
    };
  }

  render() {
    return (
      <div className="DeleteDeckComp">
        <p>DeleteDeckComp</p>
      </div>
    );
  }
}
export default DeleteDeckComp;
