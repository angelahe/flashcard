import React from 'react';
import decksBtn from '../img/buttons/decks_FFFFFF.png';
import decksOffBtn from '../img/buttons/decksOff_FFFFFF.png';
import listBtn from '../img/buttons/list_FFFFFF.png';
import listOffBtn from '../img/buttons/listOff_FFFFFF.png';
import chartBtn from '../img/buttons/chart_FFFFFF.png';
import chartOffBtn from '../img/buttons/chartOff_FFFFFF.png';
import settingsBtn from '../img/buttons/settings_FFFFFF.png';
import settingsOffBtn from '../img/buttons/settingsOff_FFFFFF.png';
import infoBtn from '../img/buttons/info_FFFFFF.png';
import infoOffBtn from '../img/buttons/infoOff_FFFFFF.png';
import '../styles/flashcard.css';

class NavBarComp extends React.Component {
  constructor() {
    super();
    this.state = {
      currentFocus: 'decks',
    };
  }

  handleDecksClicked = () => {
    this.setState({ currentFocus: 'decks' });
  };

  handleListClicked = () => {
    this.setState({ currentFocus: 'list' });
  };

  handleChartClicked = () => {
    this.setState({ currentFocus: 'chart' });
  };

  handleSettingsClicked = () => {
    this.setState({ currentFocus: 'settings' });
  };

  handleInfoClicked = () => {
    this.setState({ currentFocus: 'info' });
  };

  render() {
    const {
      currentFocus,
    } = this.state;

    return (
      <div className="NavBar">
        { currentFocus === 'decks'
          ? (
            <button type="button" className="NavBtn">
              <img className="NavImg" src={decksBtn} alt="Add" />
            </button>
          )
          : (
            <button type="button" className="NavBtn" onClick={this.handleDecksClicked}>
              <img className="NavImg" src={decksOffBtn} alt="Add" />
            </button>
          )
        }
        { currentFocus === 'list'
          ? (
            <button type="button" className="NavBtn">
              <img className="NavImg" src={listBtn} alt="Add" />
            </button>
          )
          : (
            <button type="button" className="NavBtn" onClick={this.handleListClicked}>
              <img className="NavImg" src={listOffBtn} alt="Add" />
            </button>
          )
        }
        { currentFocus === 'chart'
          ? (
            <button type="button" className="NavBtn">
              <img className="NavImg" src={chartBtn} alt="Add" />
            </button>
          )
          : (
            <button type="button" className="NavBtn" onClick={this.handleChartClicked}>
              <img className="NavImg" src={chartOffBtn} alt="Add" />
            </button>
          )
        }
        { currentFocus === 'settings'
          ? (
            <button type="button" className="NavBtn">
              <img className="NavImg" src={settingsBtn} alt="Add" />
            </button>
          )
          : (
            <button type="button" className="NavBtn" onClick={this.handleSettingsClicked}>
              <img className="NavImg" src={settingsOffBtn} alt="Add" />
            </button>
          )
        }
        { currentFocus === 'info'
          ? (
            <button type="button" className="NavBtn">
              <img className="NavImg" src={infoBtn} alt="Add" />
            </button>
          )
          : (
            <button type="button" className="NavBtn" onClick={this.handleInfoClicked}>
              <img className="NavImg" src={infoOffBtn} alt="Add" />
            </button>
          )
        }
      </div>
    );
  }
}
export default NavBarComp;
