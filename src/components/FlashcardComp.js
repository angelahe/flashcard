import React from 'react';
import NavBarComp from './NavBarComp';
import ActionBarComp from './ActionBarComp';

class DashboardComp extends React.Component {
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
        <div>
          workspace here
        </div>
        <NavBarComp />
      </div>
    );
  }
}
export default DashboardComp;
