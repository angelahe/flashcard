// interract with db back end

function createDeck() {
    return fetch("/api/deck", {
        method: "POST"
    } )
    .then(response => response.json())
    .then(json => json.id);
}

const Client = {createDeck};
export default Client;