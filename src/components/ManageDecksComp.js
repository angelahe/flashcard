import React from 'react';
import ActionBarComp from './ActionBarComp';
import '../styles/flashcard.css';
import DeckListComp from './DeckListComp';
import AddDeckComp from './AddDeckComp';
import AddCardComp from './AddCardComp';
import DeleteDeckComp from './DeleteDeckComp';
import EditDeckComp from './EditDeckComp';
import CardListComp from './CardListComp';

class ManageDecksComp extends React.Component {
  constructor() {
    super();
    this.state = {
      currentDeck: '',
      currentCard: '',
      headerText: 'Decks',
      currentView: 'DeckList',
    };
  }

  setView = (newView = 'DeckList') => {
    let showAdd = false;
    let headerText = '';
    let viewName = newView;

    switch (newView) {
      case 'DeckList':
        headerText = 'Decks';
        showAdd = true;
        break;
      case 'AddDeck':
        headerText = 'Add Deck';
        break;
      case 'AddCard':
        headerText = 'Add Card';
        break;
      case 'DeleteDeck':
        headerText = 'Delete Deck';
        break;
      case 'EditDeck':
        headerText = 'Edit Deck';
        break;
      case 'CardList':
        headerText = 'Deck Name';
        break;
      default:
        viewName = 'DeckList';
        headerText = 'Decks';
        showAdd = true;
    }

    this.setState({
      currentView: viewName,
      showAdd,
      headerText,
    });
  }

  handleAddClick = () => {
    const { currentView } = this.state;
    console.log('add button clicked');
    switch (currentView) {
      case 'DeckList': {
        this.setView('AddDeck');
        break;
      }
      case 'CardList': {
        this.setView('AddCard');
        break;
      }
      default:
        this.setView('DeckList');
    }
  };

  handleBackClick = () => {
    const { currentView } = this.state;
    console.log('in handleBackClick');
    switch (currentView) {
      case ('DeckList', 'AddDeck', 'DeleteDeck', 'EditDeck', 'CardList'): {
        this.setView('DeckList');
        break;
      }
      case 'AddCard': {
        this.setView('CardList');
        break;
      }
      default:
        this.setView('DeckList');
    }
  }

  handleDeckAdded = (deckId) => {
    this.setView('AddCard');
    this.setState({ currentDeck: deckId });
  };

  handleDeckEdit = (deckId) => {
    console.log('in deck edit');
    this.setView('EditDeck');
    this.setState({ currentDeck: deckId });
  }

  handleDeckDelete = () => {
    console.log('handle deck delete');
    this.setView('DeckList');
  }

  handleCardAdded = (cardId) => {
    this.setState({ currentCard: cardId });
  }

  render() {
    const {
      currentView, currentDeck, currentCard, showAdd, headerText,
    } = this.state;

    return (
      <div>
        <ActionBarComp
          showAdd={showAdd}
          headerText={headerText}
          onAdd={this.handleAddClick}
          onBack={this.handleBackClick}
        />
        { (currentView === 'DeckList')
          ? (
            <DeckListComp />
          )
          : null
        }
        { (currentView === 'AddDeck')
          ? (
            <div>
              <AddDeckComp onDeckAdded={this.handleDeckAdded} />
            </div>
          )
          : null
        }
        { (currentView === 'AddCard')
          ? (
            <div>
              <AddCardComp
                deck={currentDeck}
                onCardAdded={this.handleCardAdded}
              />
            </div>
          )
          : null
        }
        { (currentView === 'DeleteDeck')
          ? (
            <div>
              <DeleteDeckComp />
            </div>
          )
          : null
        }
        { (currentView === 'EditDeck')
          ? (
            <div>
              <EditDeckComp />
            </div>
          )
          : null
        }
        { (currentView === 'CardList')
          ? (
            <div>
              <CardListComp />
            </div>
          )
          : null
        }
        { currentDeck
          ? <p>current deck: {currentDeck}</p>
          : null
        }
        { currentCard
          ? <p>current card: {currentCard}</p>
          : null
          }
      </div>
    );
  }
}
export default ManageDecksComp;
