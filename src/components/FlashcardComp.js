import React from 'react';
import NavBarComp from './NavBarComp';
import ActionBarComp from './ActionBarComp';
import ManageDecksComp from './ManageDecksComp';

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
          <ManageDecksComp />
        </div>
        <NavBarComp />
      </div>
    );
  }
}
export default FlashcardComp;
