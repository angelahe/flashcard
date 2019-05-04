import React from 'react';
import PropTypes from 'prop-types';
import '../styles/flashcard.css';
import editbtn from '../img/buttons/edit_FFFFFF.png';
import deletebtn from '../img/buttons/delete_FFFFFF.png';

const DeckListItem = (props) => {
  const {
    deck,
    onDeckDelete,
    onDeckSelect,
    onDeckEdit,
  } = props;

  function handleItemClick() {
    console.log('in handleItemClick');
    // do something, then
    onDeckSelect(deck);
  }

  function handleEditClick() {
    console.log('in handle edit click');
    onDeckEdit(deck);
  }

  function handleDeleteClick() {
    console.log('in handle delete click');
    onDeckDelete(deck);
  }

  return (
    <div
      className="ItemBox AppListItem"
      role="button"
      tabIndex="0"
      onClick={handleItemClick}
      onKeyPress={handleItemClick}
    >
      <span
        className="DetailText"
        role="button"
        tabIndex="0"
        onKeyPress={handleItemClick}
        onClick={handleItemClick}
      >{deck.deck_id}
      </span>
      <button className="AppBtn" type="button" onClick={handleEditClick}>
        <img className="btnImg" src={editbtn} alt="Add" />
      </button>
      <button className="AppBtn Delete" type="button" onClick={handleDeleteClick}>
        <img className="btnImg" src={deletebtn} alt="Delete" />
      </button>
      <hr />
    </div>
  );
};

DeckListItem.defaultProps = {
  onDeckSelect: () => { },
  onDeckEdit: () => { },
  onDeckDelete: () => { },
};

DeckListItem.propTypes = {
  deck: PropTypes.shape({
    deck_id: PropTypes.string.isRequired,
  }).isRequired,
  onDeckSelect: PropTypes.func,
  onDeckEdit: PropTypes.func,
  onDeckDelete: PropTypes.func,
};
export default DeckListItem;
