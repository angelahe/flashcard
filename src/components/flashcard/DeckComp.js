import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/flashcard.css';
import newdeck from '../../img/decks/Card1New.jpg';

const DeckComp = (props) => {
  const {
    deck,
    onDeckSelect,
  } = props;

  function handleDeckSelect() {
    onDeckSelect(deck.deck_id);
  }

  return (
    <div className="DeckComp">
      <button className="DeckImage" type="button" onClick={handleDeckSelect}>
        <img className="DeckImg" src={newdeck} alt="deck" />
      </button>
    </div>
  );
};

DeckComp.defaultProps = {
  onDeckSelect: () => { },
};

DeckComp.propTypes = {
  deck: PropTypes.shape({
    deck_id: PropTypes.string.isRequired,
    deck_name: PropTypes.string.isRequired,
  }).isRequired,
  onDeckSelect: PropTypes.func,
};
export default DeckComp;
