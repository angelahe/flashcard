import React from 'react';
import PropTypes from 'prop-types';
import '../styles/flashcard.css';
import editbtn from '../img/buttons/edit_FFFFFF.png';
import deletebtn from '../img/buttons/delete_FFFFFF.png';

const CardListItemComp = (props) => {
  const {
    card,
    onCardDelete,
    onCardSelect,
    onCardEdit,
  } = props;

  function handleItemClick() {
    onCardSelect(card);
  }

  function handleEditClick() {
    onCardEdit(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div
      className="ItemBox AppListItem CardListItemComp"
      role="button"
      tabIndex="0"
      onClick={handleItemClick}
      onKeyPress={handleItemClick}
    >
      <span
        className="CardListItemText DetailText"
        role="button"
        tabIndex="0"
        onClick={handleItemClick}
        onKeyPress={handleItemClick}
      >{card.card_id}
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
  onCardDelete: () => { },
  onCardSelect: () => { },
  onCardEdit: () => { },
};

CardListItemComp.propTypes = {
  card: PropTypes.shape({
    card_id: PropTypes.string.isRequired,
  }).isRequired,
  onCardDelete: () => { },
  onCardSelect: () => { },
  onCardEdit: () => { },
};
export default CardListItemComp;
