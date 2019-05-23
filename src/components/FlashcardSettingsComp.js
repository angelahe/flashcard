import React from 'react';
import '../styles/flashcard.css';
import ActionBarComp from './ActionBarComp';

class FlashcardSettingsComp extends React.Component {
  constructor() {
    super();
    this.state = {
      headerText: 'Settings',
    };
  }

  render() {
    const { headerText } = this.state;
    return (
      <div className="FlashcardSettingsComp">
        <ActionBarComp
          showAdd={false}
          showBack={false}
          headerText={headerText}
        />
        <p>FlashcardSettings coming soon</p>
      </div>
    );
  }
}
export default FlashcardSettingsComp;
