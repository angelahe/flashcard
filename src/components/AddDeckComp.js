import React from 'react';
import PropTypes from 'prop-types';
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
    const { onDeckAdded } = this.props;

    Client.createDeck()
      .then(id => this.setState({ currentDeck: id },
        // eslint-disable-next-line react/destructuring-assignment
        () => onDeckAdded(this.state.currentDeck)));
  }

  handleCardAdded = (cardId) => {
    this.setState({ currentCard: cardId });
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
            ? <p>A current deck: {currentDeck}</p>
            : null
          }
          {currentDeck !== ''
            ? (
              <AddCardComp
                deck={currentDeck}
                onCardAdded={this.handleCardAdded}
              />
            )
            : null
          }
          {currentCard !== ''
            ? <p>current card: {currentCard} </p>
            : null
          }
        </div>
      </div>
    );
  }
}

AddDeckComp.propTypes = {
  onDeckAdded: PropTypes.func.isRequired,
};
export default AddDeckComp;
