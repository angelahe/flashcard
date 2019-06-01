import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/flashcard.css';
import write from '../../img/buttons/write_FFFFFF.png';
import eye from '../../img/buttons/eye_FFFFFF.png';
import read from '../../img/buttons/read_FFFFFF.png';

const ChooseLevelComp = (props) => {
  const {
    onLevelSelect,
  } = props;

  function handleReview() {
    onLevelSelect('Review');
  }

  function handleRecognize() {
    onLevelSelect('Recognize');
  }

  function handleProduce() {
    onLevelSelect('Produce');
  }

  return (
    <div className="ChooseLevelComp">
      <div className="LineContainer">
        <button className="LevelImage ReviewBtn" type="button" onClick={handleReview}>
          <img className="DeckImg" src={eye} alt="review" />
        </button>
      </div>
      <div className="LineContainer">
        <button className="LevelImage RecognizeBtn" type="button" onClick={handleRecognize}>
          <img className="DeckImg" src={read} alt="recognize" />
        </button>
      </div>
      <div className="LineContainer">
        <button className="LevelImage ProduceBtn" type="button" onClick={handleProduce}>
          <img className="DeckImg" src={write} alt="produce" />
        </button>
      </div>
    </div>
  );
};

ChooseLevelComp.defaultProps = {
  onLevelSelect: () => { },
};

ChooseLevelComp.propTypes = {
  onLevelSelect: PropTypes.func,
};

export default ChooseLevelComp;
