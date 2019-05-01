import React from 'react';
// import propTypes from 'prop-types';
import AddCardComp from './AddCardComp';
import Client from './Client';

class AddDeckComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDeck: '',
      currentCard: '',
    };
  }

  handleAddDeckClick = () => {
    const { addDeck } = this.props;

    Client.createDeck()
      .then(id => this.setState({ currentDeck: id },
        // eslint-disable-next-line react/destructuring-assignment
        () => addDeck(this.state.currentDeck)));
  }

  onCardAdded = (cardId) => {
    this.setState({ currentCard: cardId});
  }

  render() {
    const { currentDeck, currentCard } = this.state;
    return (
      <div>
        <div>
          <p>Add a Deck</p>
          <button type="button" onClick={this.handleAddDeckClick}>
            Add Deck
          </button>
          {currentDeck !== ''
            ? <p>current deck in addDeckComp: {currentDeck}</p>
            : null
          }
          {currentDeck !== ''
            ? (
              <AddCardComp
                deck={currentDeck}
                addCard={this.onCardAdded}
              />
            )
            : null
          }
          {currentCard !== ''
            ? <p>current card in AddDeckComp is: {currentCard} </p>
            : null
          }
        </div>
      </div>
    );
  }
}
// AddDeckComp.propTypes = {
//  addDeck: propTypes.func
// };
export default AddDeckComp;
