import React from 'react';
import '../styles/flashcard.css';
import PropTypes from 'prop-types';

const Thumbnail = (props) => {
  const {
    imageUrl,
    imageId,
    onImageSelect,
  } = props;

  function handleThumbnailClick() {
    onImageSelect(imageUrl, imageId);
  }
  return (
    <div onClick={() => {}} onKeyPress={handleThumbnailClick} role="button" tabIndex="0">
      <img className="thumbnailImg" src={imageUrl} alt={imageId} />
    </div>
  );
};

Thumbnail.defaultProps = {
  onImageSelect: () => { },
};
Thumbnail.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imageId: PropTypes.string.isRequired,
  onImageSelect: PropTypes.func,
};
export default Thumbnail;
