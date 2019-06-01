import React from 'react';
import PropTypes from 'prop-types';
import Client from './Client';
import done from '../img/buttons/done_FFFFFF.png';
import '../styles/flashcard.css';

class EditDeckComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDeck: '',
      nameValue: '',
      keyValue: '',
      orderValue: 0,
    };
  }

  componentDidMount = () => {
    const { deck } = this.props;

    this.setState({
      nameValue: deck.deck_name,
      keyValue: deck.deck_key,
      orderValue: deck.deck_order,
    });
  };

  handleNameChange = (event) => {
    this.setState({ nameValue: event.target.value });
  };

  handleKeyChange = (event) => {
    this.setState({ keyValue: event.target.value });
  };

  handleOrderChange = (event) => {
    this.setState({ orderValue: event.target.value });
  };

  handleEditDeckClick = () => {
    const { deck, onDeckEdited } = this.props;
    const {
      nameValue,
      keyValue,
      orderValue,
      currentDeck,
    } = this.state;

    Client.editDeck(deck.deck_id, nameValue, keyValue, orderValue)
      .then(id => this.setState({ currentDeck: id },
        () => onDeckEdited(currentDeck)));
  };

  render() {
    const { nameValue, keyValue, orderValue } = this.state;
    return (
      <div className="EditDeckComp">
        <br /> <br />
        <div className="LineContainer">
          <span className="DetailText">Name:</span>
          <input
            className="DeckName DetailText"
            value={nameValue}
            onChange={this.handleNameChange}
          />
          <br />
        </div>
        <br />
        <div className="LineContainer">
          <span className="DetailText">Key:</span>
          <input
            className="KeyValue DetailText"
            value={keyValue}
            onChange={this.handleKeyChange}
          />
        </div>
        <br />
        <div className="LineContainer">
          <span className="DetailText">Order:</span>
          <input
            className="DeckOrder DetailText"
            type="Number"
            value={orderValue}
            onChange={this.handleOrderChange}
          />
        </div>
        <br />
        <div className="LineContainer">
          <button
            className="AppBtn AddDeckButton"
            type="button"
            onClick={this.handleEditDeckClick}
          >
            <img className="btnImg" src={done} alt="Done" />
          </button>
        </div>
      </div>
    );
  }
}

EditDeckComp.defaultProps = {
  onDeckEdited: () => {},
  deck: {
    deck_key: '',
    deck_order: 0,
  },
};

EditDeckComp.propTypes = {
  deck: PropTypes.shape({
    deck_id: PropTypes.string.isRequired,
    deck_name: PropTypes.string.isRequired,
    deck_key: PropTypes.string,
    deck_order: PropTypes.number,
  }),
  onDeckEdited: PropTypes.func,
};

export default EditDeckComp;
