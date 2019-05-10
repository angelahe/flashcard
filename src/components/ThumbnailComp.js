import React from 'react';
import '../styles/flashcard.css';
import PropTypes from 'prop-types';

const ThumbnailComp = (props) => {
  const {
    imageUrl,
    imageId,
    onImageSelect,
  } = props;

  function handleThumbnailClick() {
    onImageSelect(imageUrl, imageId);
  }
  return (
    <div onClick={handleThumbnailClick} onKeyPress={handleThumbnailClick} role="button" tabIndex="0">
      <img className="thumbnailImg" src={imageUrl} alt={imageId} />
    </div>
  );
};

ThumbnailComp.defaultProps = {
  onImageSelect: () => { },
};
ThumbnailComp.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imageId: PropTypes.string.isRequired,
  onImageSelect: PropTypes.func,
};
export default ThumbnailComp;
