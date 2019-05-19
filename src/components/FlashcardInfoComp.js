import React from 'react';
import '../styles/flashcard.css';

class FlashcardInfoComp extends React.Component {
  constructor() {
    super();
    this.state = {
      show: true,
    };
  }

  render() {
    return (
      <div className="FlashcardInfoComp">
        <p>FlashcardInfo coming soon</p>
      </div>
    );
  }
}
export default FlashcardInfoComp;
