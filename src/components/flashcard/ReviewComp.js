import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/flashcard.css';

class ReviewComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCard: '',
      deckList: [],
    };
  }

  handleDeckDone = () => {
    const { onDeckDone } = this.props;
    onDeckDone();
  }

  render() {
    const { deck } = this.props;
    return (
      <div className="ReviewComp">
        <p>Review Comp</p>
        <p>{deck}</p>
      </div>
    );
  }
}

ReviewComp.defaultProps = {
  onDeckDone: () => { },
};

ReviewComp.propTypes = {
  deck: PropTypes.string.isRequired,
  onDeckDone: PropTypes.func,
};

export default ReviewComp;
