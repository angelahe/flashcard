import React from 'react';
import NavBarComp from './NavBarComp';
import ActionBarComp from './ActionBarComp';

class FlashcardComp extends React.Component {
  constructor() {
    super();
    this.state = {
      deckList: [],
      
    };
  }

  render() {
    return (
      <div>
        <ActionBarComp />
        <div className="WorkArea">
          <h2>workspace here</h2>
        </div>
        <NavBarComp />
      </div>
    );
  }
}
export default FlashcardComp;
