import React from 'react';
import ActionBarComp from './ActionBarComp';
import '../styles/flashcard.css';
import DeckListComp from './DeckListComp';
import AddDeckComp from './AddDeckComp';
import EditDeckComp from './EditDeckComp';
import DeleteDeckComp from './DeleteDeckComp';
import CardListComp from './CardListComp';
import AddCardComp from './AddCardComp';
import EditCardComp from './EditCardComp';
import DeleteCardComp from './DeleteCardComp';

class ManageDecksComp extends React.Component {
  constructor() {
    super();
    this.state = {
      showAdd: true,
      currentDeck: '',
      currentCard: '',
      thisDeck: {},
      thisCard: {},
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
      case 'DeckAdd':
        headerText = 'Add Deck';
        break;
      case 'DeckDelete':
        headerText = 'Delete Deck';
        break;
      case 'DeckEdit':
        headerText = 'Edit Deck';
        break;
      case 'CardList':
        headerText = 'Cards';
        showAdd = true;
        break;
      case 'CardAdd':
        headerText = 'Add Card';
        break;
      case 'CardEdit':
        headerText = 'Edit Card';
        break;
      case 'CardDelete':
        headerText = 'Delete Card';
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
    switch (currentView) {
      case 'DeckList': {
        this.setView('DeckAdd');
        break;
      }
      case 'CardList': {
        this.setView('CardAdd');
        break;
      }
      default:
        this.setView('DeckList');
    }
  };

  handleBackClick = () => {
    const { currentView } = this.state;
    switch (currentView) {
      case 'DeckList': case 'DeckAdd': case 'DeckDelete': case 'DeckEdit': case 'CardList': {
        this.setView('DeckList');
        break;
      }
      case 'CardAdd': case 'CardEdit': case 'CardDelete': {
        this.setView('CardList');
        break;
      }
      default:
        this.setView('DeckList');
    }
  }

  handleDeckAdded = (deckId) => {
    this.setView('CardAdd');
    this.setState({ currentDeck: deckId });
  };

  handleDeckSelect = (deckId) => {
    this.setView('CardList');
    this.setState({ currentDeck: deckId });
  }

  handleDeckEdit = (deck) => {
    this.setView('DeckEdit');
    this.setState({ thisDeck: deck });
  }

  handleDeckDelete = (deckId) => {
    this.setView('DeckDelete');
    this.setState({ currentDeck: deckId });
  }

  handleCardAdded = (cardId) => {
    this.setState({ currentCard: cardId });
    this.setView('CardList');
  }

  handleCardSelect = (card) => {
    this.setState({ thisCard: card });
    this.setView('CardEdit');
  }

  handleCardEdit = (card) => {
    this.setState({ thisCard: card });
    this.setView('CardEdit');
  }

  handleCardDelete = (cardId) => {
    this.setState({ currentCard: cardId });
    this.setView('CardDelete');
  }

  handleDeckEdited = (deckId) => {
    this.setState({ currentDeck: deckId });
    this.setView('DeckList');
  };

  handleDeckDeleted = () => {
    this.setState({ currentDeck: '' });
    this.setView('DeckList');
  };

  handleCardEdited = (cardId) => {
    this.setState({ currentCard: cardId });
    this.setView('CardList');
  };

  handleCardDeleted = () => {
    this.setState({ currentCard: '' });
    this.setView('CardList');
  }


  render() {
    const {
      currentView, currentDeck, currentCard, showAdd, headerText, thisCard, thisDeck,
    } = this.state;

    return (
      <div className="ManageDecksComp">
        <ActionBarComp
          showAdd={showAdd}
          showBack
          headerText={headerText}
          onAdd={this.handleAddClick}
          onBack={this.handleBackClick}
        />
        { (currentView === 'DeckList')
          ? (
            <DeckListComp
              onDeckSelect={this.handleDeckSelect}
              onDeckEdit={this.handleDeckEdit}
              onDeckDelete={this.handleDeckDelete}
            />
          )
          : null
        }
        { (currentView === 'DeckAdd')
          ? (
            <div>
              <AddDeckComp onDeckAdded={this.handleDeckAdded} />
            </div>
          )
          : null
        }
        { (currentView === 'DeckEdit')
          ? (
            <div>
              <EditDeckComp deck={thisDeck} onDeckEdited={this.handleDeckEdited} />
            </div>
          )
          : null
        }
        { (currentView === 'DeckDelete')
          ? (
            <div>
              <DeleteDeckComp
                deck={currentDeck}
                onDeckDeleted={this.handleCardDeleted}
              />
            </div>
          )
          : null
        }
        { (currentView === 'CardList')
          ? (
            <div>
              <CardListComp
                deck={currentDeck}
                onCardSelect={this.handleCardSelect}
                onCardEdit={this.handleCardEdit}
                onCardDelete={this.handleCardDelete}
              />
            </div>
          )
          : null
        }
        { (currentView === 'CardAdd')
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
        { (currentView === 'CardEdit')
          ? (
            <div>
              <EditCardComp
                card={thisCard}
                onCardEdited={this.handleCardEdited}
              />
            </div>
          )
          : null
        }
        { (currentView === 'CardDelete')
          ? (
            <div>
              <DeleteCardComp
                card={currentCard}
                onCardDeleted={this.handleCardDeleted}
              />
            </div>
          )
          : null
        }
      </div>
    );
  }
}
export default ManageDecksComp;
