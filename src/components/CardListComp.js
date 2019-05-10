import React from 'react';
import PropTypes from 'prop-types';
import Client from './Client';
import '../styles/flashcard.css';
import CardListItemComp from './CardListItemComp';

class CardListComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCard: '',
      cardList: [],
    };
  }

  componentDidMount = () => {
    this.loadCards();
  }

  loadCards = () => {
    const { deck } = this.props;
    console.log('need to load cards');
    Client.getCards(deck)
      .then(cards => this.setState({ cardList: cards }));
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
  deck: PropTypes.string.isRequired,
};
export default CardListComp;
