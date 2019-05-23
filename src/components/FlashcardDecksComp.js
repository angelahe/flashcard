import React from 'react';
import PropTypes from 'prop-types';
import '../styles/flashcard.css';
import ActionBarComp from './ActionBarComp';

class FlashcardDecksComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerText: 'Flashcards',
    };
  }

  handleAddClick = () => {
    const { onAdd } = this.props;
    onAdd();
  }

  render() {
    const { headerText } = this.state;
    return (
      <div className="FlashcardDecksComp">
        <ActionBarComp
          showAdd
          showBack={false}
          headerText={headerText}
          onAdd={this.handleAddClick}
        />
        <p>FlashcardDecksComp coming soon</p>
      </div>
    );
  }
}
FlashcardDecksComp.defaultProps = {
  onAdd: () => { },
};
FlashcardDecksComp.propTypes = {
  onAdd: PropTypes.func,
};
export default FlashcardDecksComp;
