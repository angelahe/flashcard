import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/flashcard.css';
import FlashcardDecksComp from './FlashcardDecksComp';
import SelectLevelComp from './SelectLevelComp';
import ActionBarComp from '../ActionBarComp';
import ReviewComp from './ReviewComp';

class FlashcardPlayComp extends React.Component {
  constructor() {
    super();
    this.state = {
      showAdd: true,
      showBack: false,
      headerText: 'Play Decks',
      currentDeck: {},
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
      case 'SelectLevel':
        headerText = 'Choose Level';
        showAdd = false;
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
    console.log('select deck 2, need to render game select screen');
    console.log('deck is ', deck);
    this.setState({ currentDeck: deck });
    this.setView('SelectLevel');
  }

  handleLevelSelect = (level) => {
    console.log('level selected: ', level);
    this.setView(level);
  }

  handleReviewDone = () => {
    console.log('review done for this level');
    this.setView('SelectLevel');
  }

  render() {
    const {
      currentView,
      currentDeck,
      showAdd,
      showBack,
      headerText,
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
          ? <FlashcardDecksComp onDeckSelect={this.handleDeckSelect} />
          : null
        }
        { (currentView === 'SelectLevel')
          ? <SelectLevelComp onLevelSelect={this.handleLevelSelect} />
          : null
        }
        { (currentView === 'Review')
          ? <ReviewComp deck={currentDeck} onReviewDone={this.handleReviewDone} />
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
