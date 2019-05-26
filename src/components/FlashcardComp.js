import React from 'react';
import NavBarComp from './NavBarComp';
import ManageDecksComp from './ManageDecksComp';
import FlashcardDecksComp from './flashcard/FlashcardDecksComp';
import FlashcardChartComp from './FlashcardChartComp';
import FlashcardSettingsComp from './FlashcardSettingsComp';
import FlashcardInfoComp from './FlashcardInfoComp';

class FlashcardComp extends React.Component {
  constructor() {
    super();
    this.state = {
      currentView: 'ManageDecks',
    };
  }

  setView = (newView = 'ManageDecks') => {
    switch (newView) {
      case 'ManageDecks':
      case 'FlashcardChart':
      case 'FlashcardSettings':
      case 'FlashcardInfo':
      case 'FlashcardDecks':
        this.setState({ currentView: newView });
        break;
      default:
        this.setState({ currentView: 'ManageDecks' });
    }
  }

  handleNavClick = (navClick) => {
    this.setView(navClick);
  }

  handleAddClick = () => {
    const { currentView } = this.state;
    switch (currentView) {
      case 'FlashcardDecks': {
        this.setView('ManageDecks');
        break;
      }
      default:
        this.setView('ManageDecks');
    }
  };

  render() {
    const { currentView } = this.state;
    return (
      <div className="FlashcardComp">
        <div className="WorkArea">
          { (currentView === 'ManageDecks')
            ? <ManageDecksComp />
            : null
          }
          { (currentView === 'FlashcardDecks')
            ? <FlashcardDecksComp onAdd={this.handleAddClick} />
            : null
          }
          { (currentView === 'FlashcardChart')
            ? <FlashcardChartComp />
            : null
          }
          { (currentView === 'FlashcardSettings')
            ? <FlashcardSettingsComp />
            : null
          }
          { (currentView === 'FlashcardInfo')
            ? <FlashcardInfoComp />
            : null
          }
        </div>
        <NavBarComp onNavClick={this.handleNavClick} />
      </div>
    );
  }
}
export default FlashcardComp;
