import React from 'react';
import addBtn from '../img/buttons/add_FFFFFF.png';
import backBtn from '../img/buttons/back_FFFFFF.png';
import '../styles/flashcard.css';

class ActionBarComp extends React.Component {
  constructor() {
    super();
    this.state = {
      showAdd: true,
      showBack: true,
    };
  }

  handleDeckAddClicked = () => {
    console.log('in handleDeckAddClicked of ActionBar');
  };

  handleBackClicked = () => {
    console.log('in handleBackClicked of ActionBar');
  }

  render() {
    const {
      showAdd,
      showBack,
    } = this.state;

    return (
      <div className="ActionBar">
        { showAdd
          ? (
            <button type="button" className="NavBtn" onClick={this.handleDeckAddClicked}>
              <img className="NavImg" src={addBtn} alt="Add" />
            </button>
          )
          : null
        }
        { showBack
          ? (
            <button type="button" className="NavBtn" onClick={this.handleBackClicked}>
              <img className="NavImg" src={backBtn} alt="Back" />
            </button>
          )
          : null
        }
      </div>
    );
  }
}
export default ActionBarComp;
