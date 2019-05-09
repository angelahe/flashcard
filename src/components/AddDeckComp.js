import React from 'react';
import PropTypes from 'prop-types';
import Client from './Client';

class AddDeckComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDeck: '',
    };
  }

  handleAddDeckClick = () => {
    const { onDeckAdded } = this.props;

    Client.createDeck()
      .then(id => this.setState({ currentDeck: id },
        // eslint-disable-next-line react/destructuring-assignment
        () => onDeckAdded(this.state.currentDeck)));
  }

  render() {
    const { currentDeck } = this.state;
    return (
      <div>
        <div>
          <button type="button" onClick={this.handleAddDeckClick}>
            Add Deck
          </button>
          {currentDeck !== ''
            ? <p>current deck: {currentDeck}</p>
            : null
          }
        </div>
      </div>
    );
  }
}

AddDeckComp.propTypes = {
  onDeckAdded: PropTypes.func.isRequired,
};
export default AddDeckComp;
