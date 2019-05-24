import React from 'react';
import PropTypes from 'prop-types';
import AddImageComp from './AddImageComp';
import '../styles/flashcard.css';
import Client from './Client';
import done from '../img/buttons/done_FFFFFF.png';
import english from '../img/buttons/english_FFFFFF.png';
import spanish from '../img/buttons/spanish_FFFFFF.png';

class AddCardComp extends React.Component {
  constructor(props) {
    super(props);
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
    console.log('check L2 value *', this.state.currentL2, '*');
  };

  handleAddCardClick = () => {
    const { deck, onCardAdded } = this.props;
    const {
      currentL1,
      currentL2,
      currentImageUrl,
      currentImageId,
    } = this.state;

    Client.createCard(deck, currentL1, currentL2, currentImageUrl, currentImageId)
      .then((id) => {
        this.setState({ currentCard: id });
        onCardAdded(id);
      });
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
      <div className="AddCardComp">
        { (addImage !== true)
          ? (
            <div className="AddImage">
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
                  <input className="L1Input DetailText" value={currentL1} onChange={this.handleL1Change} />
                  <br />
                </div>
                <div className="LineContainer">
                  <img className="btnImg" src={spanish} alt="Spanish" />
                  <input className="L2Input DetailText" value={currentL2} onChange={this.handleL2Change} />
                </div>
                <button className="DoneBtn AppBtn" type="button" onClick={this.handleAddCardClick}>
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

AddCardComp.defaultProps = {
  onCardAdded: () => { },
};

AddCardComp.propTypes = {
  deck: PropTypes.string.isRequired,
  onCardAdded: PropTypes.func,
};

export default AddCardComp;
