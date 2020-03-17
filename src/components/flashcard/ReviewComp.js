import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/flashcard.css';
import prev from '../../img/buttons/back_FFFFFF.png';
import next from '../../img/buttons/forward2_FFFFFF.png';

class ReviewComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCard: '',
      deckList: [],
      currentImageUrl: 'https://d30y9cdsu7xlg0.cloudfront.net/png/77680-200.png',
      currentImageId: 77680,
      currentL1: 'the word',
      currentL2: 'la palabra',
      showL1: true,
    };
  }

  handleDeckDone = () => {
    const { onDeckDone } = this.props;
    onDeckDone();
  }

  render() {
    const { deck } = this.props;
    const {
      showL1,
      currentImageId,
      currentImageUrl,
      currentL1,
      currentL2,
    } = this.state;
    return (
      <div className="ReviewComp">
        <div className="LineContainer">
          <img className="btnImg" src={prev} alt="previous" />
          <div className="cardContainer">
            <img
              className="cardImg"
              src={currentImageUrl}
              alt={currentImageId}
            />
          </div>
          <img className="btnImg" src={next} alt="previous" />
        </div>
        <br />
        <div className="LineContainer">
          { showL1
            ? <p>{currentL1}</p>
            : <p>{currentL2}</p>
          }
        </div>
        <p>Review Comp</p>
        <p>{deck.deck_name}</p>
      </div>
    );
  }
}

ReviewComp.defaultProps = {
  onDeckDone: () => { },
  deck: {
    deck_key: '',
    deck_order: 0,
  },
};

ReviewComp.propTypes = {
  deck: PropTypes.shape({
    deck_id: PropTypes.string.isRequired,
    deck_name: PropTypes.string.isRequired,
    deck_key: PropTypes.string,
    deck_order: PropTypes.number,
  }),
  onDeckDone: PropTypes.func,
};

export default ReviewComp;
