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
    const { onCardSelect } = this.props;
    console.log('in handle card select', card);
    onCardSelect(card);
  }

  handleCardEdit = (card) => {
    const { onCardEdit } = this.props;
    console.log('in handle card edit', card);
    onCardEdit(card);
  }

  handleCardDelete = (card) => {
    const { onCardDelete } = this.props;
    console.log('in handle card delete', card);
    onCardDelete(card);
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
      <div className="AppList CardListComp">
        {cardListItems}
      </div>
    );
  }
}
CardListComp.defaultProps = {
  onCardSelect: () => { },
  onCardEdit: () => { },
  onCardDelete: () => { },
};

CardListComp.propTypes = {
  deck: PropTypes.shape({
    deck_id: PropTypes.string.isRequired,
  }).isRequired,
  onCardSelect: PropTypes.func,
  onCardEdit: PropTypes.func,
  onCardDelete: PropTypes.func,
};
export default CardListComp;
