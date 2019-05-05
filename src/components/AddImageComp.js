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
    console.log('1st result is', results[0]);
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

  handleImageSelect = () => {
    // use a hardcoded image to test
    const { currentImageUrl, currentImageId } = this.state;
    const imageUrl = currentImageUrl;
    const imageId = currentImageId;
    console.log(`image selected ${imageUrl} and id is ${imageId}`);
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
        <h5>Look up an Image on thenounproject</h5>
        <span>Search term:</span>
        <input value={term} onChange={this.handleTermChange} />
        <button type="button" onClick={this.handleSearchClick}>
          <img className="btnImg" src={searchbtn} alt="Add" />
        </button>
        <br />
        <p>put list of images under here</p>
        <div className="imagesContainer">
          {imagesListItems}
        </div>
        <p>Image Selected Values</p>
        <input value={currentImageUrl} onChange={this.handleTermChange} /> <br />
        <input value={currentImageId} onChange={this.handleTermChange} />
        <button type="button" onClick={this.handleImageSend}>
          OK
        </button>
        <div className="cardContainer">
          <img className="cardImg" src={currentImageUrl} alt="nounprojectimg" />
        </div>
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
