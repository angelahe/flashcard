import React from 'react';
import '../styles/flashcard.css';
import ActionBarComp from './ActionBarComp';

class FlashcardInfoComp extends React.Component {
  constructor() {
    super();
    this.state = {
      headerText: 'Info',
    };
  }

  render() {
    const { headerText } = this.state;
    return (
      <div className="FlashcardInfoComp">
        <ActionBarComp
          showAdd={false}
          showBack={false}
          headerText={headerText}
        />
        <p>FlashcardInfo coming soon</p>
      </div>
    );
  }
}
export default FlashcardInfoComp;
