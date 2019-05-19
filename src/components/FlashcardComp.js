import React from 'react';
import NavBarComp from './NavBarComp';
import ManageDecksComp from './ManageDecksComp';
import FlashcardDecksComp from './FlashcardDecksComp';
import FlashcardChartComp from './FlashcardChartComp';
import FlashcardSettingsComp from './FlashcardSettingsComp';
import FlashcardInfoComp from './FlashcardInfoComp';

class FlashcardComp extends React.Component {
  constructor() {
    super();
    this.state = {
      deckList: [],
      currentView: 'ManageDecks',
    };
  }

  handleManageDecksView = () => {
    console.log('coming soon: flashcard handleManageView');
  };

  handleFlashcardDecksView = () => {
    console.log('coming soon: flashcard decks view');
  };

  handleFlashcardListView = () => {
    console.log('coming soon: flashcard list view');
  };

  handleFlashcardChartView = () => {
    console.log('coming soon: flashcard chart view');
  }

  handleFlashcardSettingsView = () => {
    console.log('coming soon: flashcard settings view');
  }

  handleFlashcardInfoView = () => {
    console.log('coming soon: flashcard info view');
  }

  handleNavClick = (navClick) => {
    this.setState({ currentView: navClick });
  }

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
            ? <FlashcardDecksComp />
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
