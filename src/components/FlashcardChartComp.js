import React from 'react';
import '../styles/flashcard.css';
import ActionBarComp from './ActionBarComp';

class FlashcardChartComp extends React.Component {
  constructor() {
    super();
    this.state = {
      headerText: 'Chart',
    };
  }

  render() {
    const { headerText } = this.state;
    return (
      <div className="FlashcardChartComp">
        <ActionBarComp
          showAdd={false}
          showBack={false}
          headerText={headerText}
        />
        <p>FlashcardChartComp coming soon</p>
      </div>
    );
  }
}
export default FlashcardChartComp;
