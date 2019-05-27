import React from 'react';
import PropTypes from 'prop-types';
import '../styles/flashcard.css';
import Client from './Client';
import done from '../img/buttons/done_FFFFFF.png';

class DeleteCardComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
    };
  }

  handleConfirmDelete = () => {
    const { card, onCardDeleted } = this.props;
    Client.deleteCard(card)
      .then(response => this.setState({ errorMessage: response.message },
        () => onCardDeleted(card)));
  }

  render() {
    const { errorMessage } = this.state;
    return (
      <div className="DeleteCardComp">
        <br /> <br />
        <div className="LineContainer">
          <span className="DetailText">Confirm Delete? </span>
          <br /> <br />
        </div>
        <div className="LineContainer">
          <button className="AppBtn YesDelete" type="button" onClick={this.handleConfirmDelete}>
            <img className="btnImg" src={done} alt="Done" />
          </button>
        </div>
        { errorMessage
          ? <p>{errorMessage}</p>
          : null
        }
      </div>
    );
  }
}

DeleteCardComp.defaultProps = {
  onCardDeleted: () => { },
};

DeleteCardComp.propTypes = {
  card: PropTypes.string.isRequired,
  onCardDeleted: PropTypes.func,
};

export default DeleteCardComp;
