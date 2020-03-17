import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/flashcard.css';
import write from '../../img/buttons/write_FFFFFF.png';
import eye from '../../img/buttons/eye_FFFFFF.png';
import read from '../../img/buttons/read_FFFFFF.png';

const SelectLevelComp = (props) => {
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
      <br /><br /><br />
      <div className="LineContainer">
        <button className="ReviewBtn" type="button" onClick={handleReview}>
          <img className="LevelImg" src={eye} alt="review" />
        </button>
      </div>
      <div className="LineContainer">
        <button className="RecognizeBtn" type="button" onClick={handleRecognize}>
          <img className="LevelImg" src={read} alt="recognize" />
        </button>
      </div>
      <div className="LineContainer">
        <button className="ProduceBtn" type="button" onClick={handleProduce}>
          <img className="LevelImg" src={write} alt="produce" />
        </button>
      </div>
    </div>
  );
};

SelectLevelComp.defaultProps = {
  onLevelSelect: () => { },
};

SelectLevelComp.propTypes = {
  onLevelSelect: PropTypes.func,
};

export default SelectLevelComp;
