import React from 'react';
import PropTypes from 'prop-types';
import AddImageComp from './AddImageComp';
import '../styles/flashcard.css';
import Client from './Client';
import done from '../img/buttons/done_FFFFFF.png';
import english from '../img/buttons/english_FFFFFF.png';
import spanish from '../img/buttons/spanish_FFFFFF.png';
import order from '../img/buttons/order_FFFFFF.png';

class AddCardComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCard: '',
      currentL1: '',
      currentL2: '',
      currentOrder: 0,
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

  handleOrderChange = (event) => {
    this.setState({ currentOrder: event.target.value });
  };

  handleAddCardClick = () => {
    const { deck, onCardAdded } = this.props;
    const {
      currentL1,
      currentL2,
      currentOrder,
      currentImageUrl,
      currentImageId,
    } = this.state;

    Client.createCard(deck, currentL1, currentL2, currentOrder, currentImageUrl, currentImageId)
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
      currentOrder,
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
              <div className="LineContainer">
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
              </div>
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
                <div className="LineContainer">
                  <img className="btnImg" src={order} alt="Order" />
                  <input className="Order DetailText" type="Number" value={currentOrder} onChange={this.handleOrderChange} />
                </div>
                <div className="LineContainer">
                  <button className="DoneBtn AppBtn" type="button" onClick={this.handleAddCardClick}>
                    <img className="btnImg" src={done} alt="Done" />
                  </button>
                </div>
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
