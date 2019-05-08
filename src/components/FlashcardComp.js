import React from 'react';
import NavBarComp from './NavBarComp';
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
        <div className="WorkArea">
          <ManageDecksComp />
        </div>
        <NavBarComp />
      </div>
    );
  }
}
export default FlashcardComp;
