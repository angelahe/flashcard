import React from 'react';
import PropTypes from 'prop-types';
import addBtn from '../img/buttons/add_FFFFFF.png';
import backBtn from '../img/buttons/back_FFFFFF.png';
import logo from '../img/buttons/logo_FFFFFF.png';
import '../styles/flashcard.css';

const ActionBarComp = (props) => {
  const {
    showAdd,
    showBack,
    headerText,
    onAdd,
    onBack,
  } = props;

  function handleAddClicked() {
    onAdd();
  }

  function handleBackClicked() {
    onBack();
  }

  return (
    <div className="ActionBarComp ActionBar">
      <div className="LineContainer">
        <button type="button" className="AppLogo NavBtn">
          <img className="NavImg" src={logo} alt="logo" />
        </button>
        { showAdd
          ? (
            <button type="button" className="AddBtn NavBtn" onClick={handleAddClicked}>
              <img className="NavImg" src={addBtn} alt="Add" />
            </button>
          )
          : null
        }
        <span className="HeaderText">{headerText}</span>
        { showBack
          ? (
            <button type="button" className="BackBtn NavBtn" onClick={handleBackClicked}>
              <img className="NavImg" src={backBtn} alt="Back" />
            </button>
          )
          : null
        }
      </div>
    </div>
  );
};

ActionBarComp.defaultProps = {
  showAdd: true,
  showBack: true,
  headerText: 'default',
  onAdd: () => { },
  onBack: () => { },
};

ActionBarComp.propTypes = {
  showAdd: PropTypes.bool,
  showBack: PropTypes.bool,
  headerText: PropTypes.string,
  onAdd: PropTypes.func,
  onBack: PropTypes.func,
};
export default ActionBarComp;
