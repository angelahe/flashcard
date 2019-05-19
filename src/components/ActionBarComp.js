import React from 'react';
import PropTypes from 'prop-types';
import addBtn from '../img/buttons/add_FFFFFF.png';
import backBtn from '../img/buttons/back_FFFFFF.png';
import logo from '../img/buttons/logo_FFFFFF.png';
import '../styles/flashcard.css';

const ActionBarComp = (props) => {
  const {
    showAdd,
    headerText,
    onAdd,
    onBack,
  } = props;

  function handleAddClicked() {
    console.log('in handleAddClicked of ActionBar');
    onAdd();
  }

  function handleBackClicked() {
    console.log('in handleBackClicked of ActionBar');
    onBack();
  }

  return (
    <div className="ActionBar ActionBarComp">
      <img className="NavImg NavBtn" src={logo} alt="logo" />
      { showAdd
        ? (
          <button type="button" className="NavBtn" onClick={handleAddClicked}>
            <img className="NavImg" src={addBtn} alt="Add" />
          </button>
        )
        : null
      }
      <span className="HeaderText">{headerText}</span>
      <button type="button" className="NavBtn" onClick={handleBackClicked}>
        <img className="NavImg" src={backBtn} alt="Back" />
      </button>
    </div>
  );
};

ActionBarComp.defaultProps = {
  showAdd: true,
  headerText: 'default',
  onAdd: () => { },
  onBack: () => { },
};

ActionBarComp.propTypes = {
  showAdd: PropTypes.bool,
  headerText: PropTypes.string,
  onAdd: PropTypes.func,
  onBack: PropTypes.func,
};
export default ActionBarComp;
