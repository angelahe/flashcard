import React from "react"

class AddDeckComp extends React.Component {
    constructor() {
        super()
        this.state = {
            currentDeck : null
        }
    }

    handleAddClick = () => {
        console.log("in handleAddClick")
        //call 
        const deckId = "FakeID"
        this.setState ({currentDeck : deckId});
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
