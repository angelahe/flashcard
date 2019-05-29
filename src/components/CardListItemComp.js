import React from 'react';
import PropTypes from 'prop-types';
import '../styles/flashcard.css';
import editbtn from '../img/buttons/edit_FFFFFF.png';
import deletebtn from '../img/buttons/delete_FFFFFF.png';

const CardListItemComp = (props) => {
  const {
    card,
    onCardSelect,
    onCardEdit,
    onCardDelete,
  } = props;

  function handleItemClick() {
    onCardSelect(card);
  }

  function handleEditClick() {
    onCardEdit(card);
  }

  function handleDeleteClick() {
    onCardDelete(card.card_id);
  }

  return (
    <div
      className="ItemBox AppListItem CardListItemComp"
      role="button"
      tabIndex="0"
    >
      <span
        className="CardListItemText DetailText"
        role="button"
        tabIndex="0"
        onClick={handleItemClick}
        onKeyPress={handleItemClick}
      >{card.L1_word}
      </span>
      <button className="CardListItemEdit AppBtn" type="button" onClick={handleEditClick}>
        <img className="btnImg" src={editbtn} alt="Add" />
      </button>
      <button className="CardListItemDelete AppBtn Delete" type="button" onClick={handleDeleteClick}>
        <img className="btnImg" src={deletebtn} alt="Delete" />
      </button>
      <hr />
    </div>
  );
};

CardListItemComp.defaultProps = {
  onCardSelect: () => { },
  onCardEdit: () => { },
  onCardDelete: () => { },
};

CardListItemComp.propTypes = {
  card: PropTypes.shape({
    card_id: PropTypes.string.isRequired,
  }).isRequired,
  onCardSelect: () => { },
  onCardEdit: () => { },
  onCardDelete: () => { },
};
export default CardListItemComp;
