import React from 'react';
import Client from '../Client';

class AddCardComp extends React.Component {
  constructor() {
    super();
    this.state = {
      currentCard: null,
      currentEN: null,
      currentES: null
    };
  }

  handleAddCardClick = () => {
    const enWord = document.getElementById('ENword').value;
    const esWord = document.getElementById('ESword').value;
    // do error checking for null words
    Client.createCard(enWord, esWord).then(id => this.setState({ currentCard: id }));
  }

  render() {
    const { currentCard } = this.state;
    return (
      <div>
        <h2>Add a Card</h2>
        <span>EN word:</span>
        <input id="ENword" /><br />
        <span>ES word:</span>
        <input id="ESword" /> <br /><br />
        <button type="button" onClick={this.handleAddCardClick}>Add Card</button>
        {currentCard ? <p>current card: {currentCard}</p> : null}
      </div>
    );
  }
}
export default AddCardComp;
