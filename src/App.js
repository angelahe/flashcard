import React from 'react';
import AddDeckCardComp from './components/AddDeckCardComp';
import ManageDecksComp from './components/ManageDecksComp';
import './App.css';

function App() {
  return (
    <div className="App">
      <AddDeckCardComp />
      <p>new stuff here</p>
      <ManageDecksComp />
    </div>
  );
}

export default App;
