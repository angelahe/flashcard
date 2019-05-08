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
      headerText: 'Decks',
      currentView: 'DeckList',
    };
  }

  handleAddClick = () => {
    const { currentView } = this.state;
    console.log('add button clicked');
    // add logic - if currentView = DeckList...
    switch (currentView) {
      case 'DeckList': {
        this.setState({ currentView: 'AddDeck', showAdd: false });
        break;
      }
      case 'CardList': {
        this.setState({ currentView: 'AddCard', showAdd: false });
        break;
      }
      default:
        this.setState({ currentView: 'DeckList', showAdd: true });
    }
  };

  handleBackClick = () => {
    const { currentView } = this.state;
    console.log('in handleBackClick');
    switch (currentView) {
      case 'DeckList': {
        this.setState({ currentView: 'DeckList', showAdd: true });
        break;
      }
      case 'AddDeck': {
        this.setState({ currentView: 'DeckList', showAdd: true });
        break;
      }
      case 'AddCard': {
        this.setState({ currentView: 'CardList' });
        break;
      }
      case 'DeleteDeck': {
        this.setState({ currentView: 'DeckList', showAdd: true });
        break;
      }
      case 'EditDeck': {
        this.setState({ currentView: 'DeckList', showAdd: true });
        break;
      }
      case 'CardList': {
        this.setState({ currentView: 'DeckList', showAdd: true });
        break;
      }
      default:
        this.setState({ currentView: 'DeckList', showAdd: true });
    }
  }

  handleDeckAdded = (deckId) => {
    this.setState({ currentView: 'AddCard', currentDeck: deckId });
  };

  handleDeckEdit = (deckId) => {
    console.log('in deck edit');
    this.setState({ currentView: 'EditDeck', currentDeck: deckId });
  }

  handleDeckDelete = () => {
    this.setState({ currentView: 'DeckList', showAdd: true });
  }

  render() {
    const {
      currentView, currentDeck, showAdd, headerText,
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
              <AddCardComp />
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
      </div>
    );
  }
}
export default ManageDecksComp;
