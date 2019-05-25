import React from 'react';
import PropTypes from 'prop-types';
import '../styles/flashcard.css';
import Client from './Client';
import done from '../img/buttons/done_FFFFFF.png';

class DeleteDeckComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
    };
  }

  // deck here is the deck_id string
  handleConfirmDelete = () => {
    const { deck, onDeckDeleted } = this.props;
    Client.deleteDeck(deck)
      .then(response => this.setState({ errorMessage: response.message },
        () => onDeckDeleted(deck)));
  }

  render() {
    const { deck } = this.props;
    const { errorMessage } = this.state;
    return (
      <div className="DeleteDeckComp">
        <br /> <br />
        <div className="LineContainer">
          <span className="DetailText">Confirm Delete? </span>
          <br />
        </div>
        <button className="AppBtn YesDelete" type="button" onClick={this.handleConfirmDelete}>
          <img className="btnImg" src={done} alt="Done" />
        </button>
        { errorMessage
          ? <p>{errorMessage}</p>
          : null
        }
      </div>
    );
  }
}

DeleteDeckComp.defaultProps = {
  onDeckDeleted: () => { },
};

DeleteDeckComp.propTypes = {
  deck: PropTypes.string.isRequired,
  onDeckDeleted: PropTypes.func,
};

export default DeleteDeckComp;
