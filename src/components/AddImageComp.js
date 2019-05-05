import React from 'react';
import PropTypes from 'prop-types';
import searchbtn from '../img/buttons/search_FFFFFF.png';
import searchresults from './testsearchresults';
import Thumbnail from './Thumbnail';

class AddImageComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      currentImageUrl: 'https://d30y9cdsu7xlg0.cloudfront.net/png/75112-200.png',
      currentImageId: 75112,
      imagesList: [],
    };
  }

  handleTermChange = (event) => {
    this.setState({ term: event.target.value });
  }

  handleSearchClick = () => {
    const { term } = this.state;

    const results = searchresults.searchresults;

    console.log('results is', results);
    this.setState({ imagesList: results });

    // call the nounproject api with the search term
    console.log(`going to search for ${term} on nounproject`);
  }

  handleImageSend = () => {
    const { currentImageUrl, currentImageId } = this.state;
    const { onImageAdded } = this.props;
    console.log('in handleImageSend');
    onImageAdded(currentImageUrl, currentImageId);
  }

  // temp able to enter the id and url by user
  handleImageUrlChange = (event) => {
    this.setState({ currentImageUrl: event.target.value });
  }

  handleImageIdChange = (event) => {
    this.setState({ currentImageId: event.target.value });
  }

  handleImageSelect = (imageUrl, imageId) => {
    console.log(`passed in image ${imageUrl} and ${imageId}`);
    this.setState({ currentImageUrl: imageUrl, currentImageId: imageId });
  }

  render() {
    const {
      term,
      currentImageId,
      currentImageUrl,
      imagesList,
    } = this.state;

    const imagesListItems = imagesList.map(image => (
      <Thumbnail
        key={image.id}
        imageUrl={image.href}
        imageId={image.id}
        onImageSelect={this.handleImageSelect}
      />
    ));
    return (
      <div>
        <span>Image Search:</span>
        <input value={term} onChange={this.handleTermChange} />
        <button type="button" onClick={this.handleSearchClick}>
          <img className="btnImg" src={searchbtn} alt="Add" />
        </button>
        <br />
        <div className="cardContainer">
          <img className="cardImg" src={currentImageUrl} alt="nounprojectimg" />
        </div>
        <div className="imagesContainer">
          {imagesListItems}
        </div>
        <p>Image Selected Values</p>
        <span>Url: {currentImageUrl} ID: {currentImageId}</span>
        <button type="button" onClick={this.handleImageSend}>
          OK
        </button>
      </div>
    );
  }
}

AddImageComp.defaultProps = {
  onImageAdded: () => { },
};

AddImageComp.propTypes = {
  onImageAdded: PropTypes.func,
};

export default AddImageComp;
