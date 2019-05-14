import React from 'react';
import PropTypes from 'prop-types';
import Client from './Client';
import '../styles/flashcard.css';
import CardListItemComp from './CardListItemComp';

class CardListComp extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      currentCard: '',
      cardList: [],
    };
  }

  componentDidMount = () => {
    this.loadCards();
    this._isMounted = true;
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  }

  loadCards = () => {
    const { deck } = this.props;
    Client.getCardsInDeck(deck)
      .then((cards) => {
        if (this._isMounted) {
          this.setState({ cardList: cards });
        }
      })
      .catch(err => console.error(err.message));
  }

  handleCardSelect = (card) => {
    console.log('in handle card select', card);
  }

  handleCardEdit = (card) => {
    console.log('in handle card edit', card);
  }

  handleCardDelete = (card) => {
    console.log('in handle card delete', card);
  }

  render() {
    const {
      cardList,
    } = this.state;

    const cardListItems = cardList.map(card => (
      <CardListItemComp
        key={card.card_id}
        card={card}
        onCardSelect={this.handleCardSelect}
        onCardEdit={this.handleCardEdit}
        onCardDelete={this.handleCardDelete}
      />
    ));

    return (
      <div className="AppList">
        {cardListItems}
      </div>
    );
  }
}

CardListComp.propTypes = {
  deck: PropTypes.shape({
    deck_id: PropTypes.string.isRequired,
  }).isRequired,
};
export default CardListComp;
