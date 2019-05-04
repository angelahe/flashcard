import React from 'react';
import PropTypes from 'prop-types';
import searchbtn from '../img/buttons/search_FFFFFF.png';

class AddImageComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      key: '',
      secret: '',
      currentImageUrl: '',
      currentImageId: 0,
    };
  }

  handleTermChange = (event) => {
    this.setState({ term: event.target.value });
  }

  handleKeyChange = (event) => {
    this.setState({ key: event.target.value });
  }

  handleSecretChange = (event) => {
    this.setState({ secret: event.target.value });
  }

  handleSearchClick = () => {
    const { term } = this.state;

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
      key,
      secret,
      currentImageId,
      currentImageUrl,
    } = this.state;

    return (
      <div>
        <h1>Look up an Image on thenounproject</h1>
        <span>Search term:</span>
        <input value={term} onChange={this.handleTermChange} />
        <button type="button" onClick={this.handleSearchClick}>
          <img className="btnImg" src={searchbtn} alt="Add" />
        </button>
        <br />
        <span>Key:</span>
        <input value={key} onChange={this.handleKeyChange} />
        <br />
        <span>Secret:</span>
        <input value={secret} onChange={this.handleSecretChange} />
        <br />
        <p>put list of images under here</p>
        <p>Image Selected Values</p>
        <input value={currentImageUrl} onChange={this.handleTermChange} />
        <input value={currentImageId} onChange={this.handleTermChange} />
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
