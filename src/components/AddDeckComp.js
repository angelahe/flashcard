import React from 'react';
import Client from './Client';

class AddDeckComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDeck: '',
    };
  }

  handleAddDeckClick = () => {
    // const { addDeck } = this.props;
    //const { currentDeck } = this.state;

    console.log('in handleAddDeckCilck props is ', this.props);
    Client.createDeck()
      .then(id => this.setState({ currentDeck: id },
        () => this.props.addDeck(this.state.currentDeck)));
  }

  render() {
    const { currentDeck } = this.state;
    return (
      <div>
        <div>
          <p>Add a Deck</p>
          <button type="button" onClick={this.handleAddDeckClick}>
            Add Deck
          </button>
          {currentDeck !== '' ? <p>current deck in addDeckComp: {currentDeck}</p> : null}
        </div>
      </div>
    );
  }
}
export default AddDeckComp;
