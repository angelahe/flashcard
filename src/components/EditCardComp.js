import React from 'react';
import PropTypes from 'prop-types';
import AddImageComp from './AddImageComp';
import '../styles/flashcard.css';
import Client from './Client';
import done from '../img/buttons/done_FFFFFF.png';
import english from '../img/buttons/english_FFFFFF.png';
import spanish from '../img/buttons/spanish_FFFFFF.png';

class EditCardComp extends React.Component {
  constructor() {
    super();
    this.state = {
      currentCard: '',
      currentL1: '',
      currentL2: '',
      currentImageUrl: 'https://d30y9cdsu7xlg0.cloudfront.net/png/77680-200.png',
      currentImageId: 77680,
      addImage: false,
      styleImage: 'cardDefault',
    };
  }

  handleL1Change = (event) => {
    this.setState({ currentL1: event.target.value });
  };

  handleL2Change = (event) => {
    this.setState({ currentL2: event.target.value });
  };
  
  handleEditCardClick = () => {
    const { card, onCardEdit } = this.props;
    const {
      currentL1,
      currentL2,
      currentImageUrl,
      currentImageId,
    } = this.state;

  /*    Client.createCard(deck, currentL1, currentL2, currentImageUrl, currentImageId)
      .then((id) => {
        this.setState({ currentCard: id });
        onCardAdded(id);
      });
  */
  };

  handleImageAdded = (imageUrl, imageId) => {
    console.log(`image url: ${imageUrl} image id: ${imageId}`);
    this.setState({
      currentImageUrl: imageUrl,
      currentImageId: imageId,
      addImage: false,
      styleImage: 'cardContainer',
    });
  }

  handleImageClick = () => {
    this.setState({ addImage: true });
  }

  render() {
    const {
      currentCard,
      currentL1,
      currentL2,
      currentImageId,
      currentImageUrl,
      addImage,
      styleImage,
    } = this.state;
    const { deck } = this.props;
    return (
      <div>
        { (addImage !== true)
          ? (
            <div>
              <button
                className={styleImage}
                type="button"
                onClick={this.handleImageClick}
                onKeyPress={this.handleItemClick}
              >
                <img
                  className="cardImg"
                  src={currentImageUrl}
                  alt={currentImageId}
                />
              </button>
              <br />
              <div>
                <div className="LineContainer">
                  <img className="btnImg" src={english} alt="English" />
                  <input className="DetailText" value={currentL1} onChange={this.handleL1Change} />
                  <br />
                </div>
                <div className="LineContainer">
                  <img className="btnImg" src={spanish} alt="Spanish" />
                  <input className="DetailText" value={currentL2} onChange={this.handleL2Change} />
                </div>
                <button className="AppBtn" type="button" onClick={this.handleEditCardClick}>
                  <img className="btnImg" src={done} alt="Done" />
                </button>
              </div>
              <br />
              <span className="DetailText">Image:</span>
              <p>Url:{currentImageUrl}  id:{currentImageId}</p>
              <img className="btnImg" src={currentImageUrl} alt={currentImageId} />
            </div>
          )
          : <AddImageComp onImageAdded={this.handleImageAdded} />
        }

        {(currentCard) ? <p>current card: {currentCard}</p> : null}
        {(deck) ? <p>C current deck is: {deck}</p> : null}
      </div>
    );
  }
}

EditCardComp.defaultProps = {
  onCardEdit: () => { },
};

EditCardComp.propTypes = {
  card: PropTypes.shape({
    card_id: PropTypes.string.isRequired,
    deck_id: PropTypes.string.isRequired,
  }).isRequired,
  onCardEdit: PropTypes.func,
};

export default EditCardComp;
