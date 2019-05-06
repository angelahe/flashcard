import React from 'react';
import FlashcardComp from './components/FlashcardComp';
import ManageDecksComp from './components/ManageDecksComp';
import './App.css';

function App() {
  return (
    <div className="App">
      <FlashcardComp />
      <ManageDecksComp />
    </div>
  );
}

export default App;
