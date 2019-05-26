import React from 'react';
import PropTypes from 'prop-types';
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
  constructor(props) {
    super(props);
    this.state = {
      currentFocus: 'list',
    };
  }

  handleDecksClicked = () => {
    const { onNavClick } = this.props;
    this.setState({ currentFocus: 'decks' });
    onNavClick('FlashcardDecks');
  };

  handleListClicked = () => {
    const { onNavClick } = this.props;
    this.setState({ currentFocus: 'list' });
    onNavClick('ManageDecks');
  };

  handleChartClicked = () => {
    const { onNavClick } = this.props;
    this.setState({ currentFocus: 'chart' });
    onNavClick('FlashcardChart');
  };

  handleSettingsClicked = () => {
    const { onNavClick } = this.props;
    this.setState({ currentFocus: 'settings' });
    onNavClick('FlashcardSettings');
  };

  handleInfoClicked = () => {
    const { onNavClick } = this.props;
    this.setState({ currentFocus: 'info' });
    onNavClick('FlashcardInfo');
  };

  render() {
    const {
      currentFocus,
    } = this.state;

    return (
      <div className="NavBarComp NavBar">
        <div className="LineContainer">
          { currentFocus === 'decks'
            ? (
              <button type="button" className="NavBarDecksOn NavBtn">
                <img className="NavImg" src={decksBtn} alt="Decks" />
              </button>
            )
            : (
              <button type="button" className="NavBarDecksOff NavBarNavBtn" onClick={this.handleDecksClicked}>
                <img className="NavImg" src={decksOffBtn} alt="Decks" />
              </button>
            )
          }
          { currentFocus === 'list'
            ? (
              <button type="button" className="NavBarListOn NavBtn">
                <img className="NavImg" src={listBtn} alt="List" />
              </button>
            )
            : (
              <button type="button" className="NavBarListOff NavBtn" onClick={this.handleListClicked}>
                <img className="NavImg" src={listOffBtn} alt="List" />
              </button>
            )
          }
          { currentFocus === 'chart'
            ? (
              <button type="button" className="NavBarChartOn NavBtn">
                <img className="NavImg" src={chartBtn} alt="Chart" />
              </button>
            )
            : (
              <button type="button" className="NavBarChartOff NavBtn" onClick={this.handleChartClicked}>
                <img className="NavImg" src={chartOffBtn} alt="Chart" />
              </button>
            )
          }
          { currentFocus === 'settings'
            ? (
              <button type="button" className="NavBarSettingsOn NavBtn">
                <img className="NavImg" src={settingsBtn} alt="Settings" />
              </button>
            )
            : (
              <button type="button" className="NavBarSettingsOff NavBtn" onClick={this.handleSettingsClicked}>
                <img className="NavImg" src={settingsOffBtn} alt="Settings" />
              </button>
            )
          }
          { currentFocus === 'info'
            ? (
              <button type="button" className="NavBarInfoOn NavBtn">
                <img className="NavImg" src={infoBtn} alt="Info" />
              </button>
            )
            : (
              <button type="button" className="NavBarInfoOff NavBtn" onClick={this.handleInfoClicked}>
                <img className="NavImg" src={infoOffBtn} alt="Info" />
              </button>
            )
          }
        </div>
      </div>
    );
  }
}

NavBarComp.defaultProps = {
  onNavClick: () => { },
};

NavBarComp.propTypes = {
  onNavClick: PropTypes.func,
};

export default NavBarComp;
