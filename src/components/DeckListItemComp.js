import React from 'react';
import PropTypes from 'prop-types';
import '../styles/flashcard.css';
import editbtn from '../img/buttons/edit_FFFFFF.png';
import deletebtn from '../img/buttons/delete_FFFFFF.png';

const DeckListItemComp = (props) => {
  const {
    deck,
    onDeckDelete,
    onDeckSelect,
    onDeckEdit,
  } = props;

  function handleItemClick() {
    console.log('in handleItemClick');
    // do something, then
    onDeckSelect(deck.deck_id);
  }

  function handleEditClick() {
    console.log('in handle edit click');
    onDeckEdit(deck.deck_id);
  }

  function handleDeleteClick() {
    console.log('in handle delete click');
    onDeckDelete(deck.deck_id);
  }

  return (
    <div
      className="DeckListItemComp ItemBox AppListItem"
      role="button"
      tabIndex="0"
    >
      <span
        className="DeckListItemText DetailText"
        role="button"
        tabIndex="0"
        onClick={handleItemClick}
        onKeyPress={handleItemClick}
      >{deck.deck_id}
      </span>
      <button className="DeckListItemEdit AppBtn" type="button" onClick={handleEditClick}>
        <img className="btnImg" src={editbtn} alt="Edit" />
      </button>
      <button className="DeckListItemDelete AppBtn Delete" type="button" onClick={handleDeleteClick}>
        <img className="btnImg" src={deletebtn} alt="Delete" />
      </button>
      <hr />
    </div>
  );
};

DeckListItemComp.defaultProps = {
  onDeckSelect: () => { },
  onDeckEdit: () => { },
  onDeckDelete: () => { },
};

DeckListItemComp.propTypes = {
  deck: PropTypes.shape({
    deck_id: PropTypes.string.isRequired,
  }).isRequired,
  onDeckSelect: PropTypes.func,
  onDeckEdit: PropTypes.func,
  onDeckDelete: PropTypes.func,
};
export default DeckListItemComp;
