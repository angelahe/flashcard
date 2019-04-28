import React from "react";
import Client from './Client';

class AddDeckComp extends React.Component {
    constructor() {
        super()
        this.state = {
            currentDeck : null
        }
    }

    handleAddClick = () => {
        Client.createDeck().then(id => this.setState({currentDeck : id}));
    } 

    render() {
        return (
            <div>
                <p>Welcome to Flashcards</p>
                <button onClick={this.handleAddClick}>Add Deck</button>
                {this.state.currentDeck ? <p>current deck: {this.state.currentDeck}</p> : null}
            </div>
        )
    }
}
export default AddDeckComp
