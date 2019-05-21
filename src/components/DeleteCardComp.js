import React from 'react';
import '../styles/flashcard.css';

class DeleteCardComp extends React.Component {
  constructor() {
    super();
    this.state = {
      currentCard: '',
    };
  }

  render() {
    return (
      <div className="DeleteCardComp">
        <p>DeleteDeckComp</p>
      </div>
    );
  }
}
export default DeleteCardComp;
