Flashcard is an app that uses the following technologies:
- React for the UI presentation layer
- python and Flask for the API layer
- sqlite3 for the database back end
- uses thenounproject.com API to fetch images a user can choose from

## Authorization
migrating from jwt authorization to google people api
see https://developers.google.com/people/api/rest/v1/people/get
and for the python quickstart:
https://developers.google.com/people/quickstart/python
https://auth0.com/docs/quickstart/backend/python/01-authorization


## Setup
- download the repository
- install the back end of the project with pip install -e
- Go to https://thenounproject.com/developers/apps
- Create a free account
- Click 'create a new app' to get an API key and SECRET key
- In the server\instance directory, create a file config.py with the following:

KEY="your_noun_project_api_key"

SECRET_KEY="your_noun_project_secret_key"

## Available Scripts

In the project directory, start up the front end:

### `npm start`

From a separate terminal, 
create a new instance of the database:

### `./dev init-db`

start up the back end:

### `./dev run`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the jest test runner in the interactive watch mode for the react front end.<br>

### `npm test -- --coverage --watchAll=false`

Launches the tests and shows test coverage

### `pytest`

Launches the back end tests

## Status and Next Actions
- what the app does so far 
  - successfully lets a user create a deck and cards
  - successfully calls thenounproject API and returns a list of images, which the user selects when creating a card, and stores the url to the image in the database for later use.
- still learning about json and fetch, so my front end has some odd warnings about unhandled fetch errors.
- there are placeholder strings in the UI for test purposes that will be refactored out
- much of the UI is stubbed out but does not have functionality yet
- since the UI is still changing and tests are expensive (in time), stubs are in place for some of the UI test components until the UI behavior is implemented fully.
- debugging a slow pytest run - takes 20.17s currently
