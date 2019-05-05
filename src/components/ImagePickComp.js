import React from 'react';
import '../styles/flashcard.css';

class ImagePickComp extends React.Component {
  constructor() {
    super();
    this.state = {
      currentImgUrl: 'https://d30y9cdsu7xlg0.cloudfront.net/png/75112-200.png',
      currentImgId: 75112,
    };
  }

  render() {
    const { currentImgUrl, currentImgId } = this.state;

    return (
      <div>
        <h5>play around with image select</h5>
        <div className="AppPanel">
          <div>{currentImgUrl}</div>
          <div>{currentImgId}</div>
          <div className="cardContainer">
            <img className="cardImg" src={currentImgUrl} alt="nounprojectimg" />
          </div>
        </div>
      </div>
    );
  }
}
export default ImagePickComp;
