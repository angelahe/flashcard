import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/flashcard.css';
import FlashcardDecksComp from './FlashcardDecksComp';
import ChooseLevelComp from './ChooseLevelComp';
import ActionBarComp from '../ActionBarComp';

class FlashcardPlayComp extends React.Component {
  constructor() {
    super();
    this.state = {
      showAdd: true,
      showBack: false,
      headerText: 'Play Decks',
      currentDeck: '',
      currentView: 'FlashcardDecks',
    };
  }

  handleAddClick = () => {
    const { onAdd } = this.props;
    onAdd();
  }

  setView = (newView = 'FlashcardDecks') => {
    let showAdd = false;
    let headerText = '';
    let viewName = newView;

    switch (newView) {
      case 'FlashcardDecks':
        headerText = 'Play Decks';
        showAdd = true;
        break;
      case 'Review':
        headerText = 'Review';
        break;
      case 'Recognize':
        headerText = 'Recognize';
        break;
      case 'Produce':
        headerText = 'Produce';
        break;
      case 'Phrase':
        headerText = 'Phrase';
        break;
      default:
        viewName = 'FlashcardDecks';
        headerText = 'Play Decks';
        showAdd = true;
    }

    this.setState({
      currentView: viewName,
      showAdd,
      headerText,
    });
  }

  handleDeckSelect = (deck) => {
    this.setState({ currentDeck: deck });
  }

  handleLevelSelect = (level) => {
    console.log('level selected: ', level);
  }

  render() {
    const {
      currentView,
      showAdd,
      showBack,
      headerText,
      handleDeckSelect,
      handleLevelSelect,
    } = this.state;

    return (
      <div className="FlashcardPlayComp">
        <ActionBarComp
          showAdd={showAdd}
          showBack={showBack}
          headerText={headerText}
          onAdd={this.handleAddClick}
        />
        { (currentView === 'FlashcardDecks')
          ? <FlashcardDecksComp onDeckSelect={handleDeckSelect} />
          : null
        }
        { (currentView === 'ChooseLevel')
          ? <ChooseLevelComp onLevelSelect={handleLevelSelect} />
          : null
        }
      </div>
    );
  }
}
FlashcardPlayComp.defaultProps = {
  onAdd: () => { },
};
FlashcardDecksComp.propTypes = {
  onAdd: PropTypes.func,
};
export default FlashcardPlayComp;
