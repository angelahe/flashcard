import React from 'react';
import PropTypes from 'prop-types';
import searchbtn from '../img/buttons/search_FFFFFF.png';
// import searchresults from '../testdata/testsearchresults';
import ThumbnailComp from './ThumbnailComp';
import NounProject from './NounProject';
import done from '../img/buttons/done_FFFFFF.png';

class AddImageComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      currentImageUrl: 'https://d30y9cdsu7xlg0.cloudfront.net/png/77680-200.png',
      currentImageId: '77680',
      imagesList: [],
    };
  }

  handleTermChange = (event) => {
    this.setState({ term: event.target.value });
  }

  handleSearchClick = () => {
    const { term } = this.state;
    // placeholder for loading data from a test file
    // const results = searchresults.searchresults;
    // console.log('results is', results);
    // this.setState({ imagesList: results });

    // call the nounproject api with the search term
    //  console.log(`going to search for ${term} on nounproject`);
    NounProject.getImages(term)
      .then(images => this.setState({ imagesList: images }));
  }

  handleImageSend = () => {
    const { currentImageUrl, currentImageId } = this.state;
    const { onImageAdded } = this.props;
    // console.log('in handleImageSend');
    onImageAdded(currentImageUrl, currentImageId);
  }

  handleImageSelect = (imageUrl, imageId) => {
    // console.log(`passed in image ${imageUrl} and ${imageId}`);
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
      <ThumbnailComp
        key={image.id}
        imageUrl={image.href}
        imageId={image.id}
        onImageSelect={this.handleImageSelect}
      />
    ));
    return (
      <div className="AddImageComp">
        <div className="LineContainer">
          <input className="SearchTerm DetailText" value={term} onChange={this.handleTermChange} placeholder="Find an image" />
          <button type="button" className="SearchBtn" onClick={this.handleSearchClick}>
            <img className="btnImg" src={searchbtn} alt="Add" />
          </button>
        </div>
        <br />
        <div className="LineContainer">
          <div className="ImagePreview">
            <img className="cardImg" src={currentImageUrl} alt="nounprojectimg" />
          </div>
          <button className="DoneBtn AppBtn" type="button" onClick={this.handleImageSend}>
            <img className="btnImg" src={done} alt="Done" />
          </button>
        </div>
        <div className="Thumbnails imagesContainer">
          {imagesListItems}
        </div>
        <p>Image Selected Values</p>
        <span>Url: {currentImageUrl} ID: {currentImageId}</span>
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
