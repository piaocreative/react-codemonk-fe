// This is a rating component which we are using the ratings in personal and professional details page for the tags
import React from 'react';
import PropTypes from 'prop-types';

import RatingComponent from './RatingComponent';
const Ratings = props => {
  const { itemList, onChangeRating, children, setError, forceValidate } = props;
  if (!itemList.length) {
    return null;
  }
  return (
    <div>
      {children}
      {itemList.map((ratingItem, index) => (
        <RatingComponent
          forceValidate={forceValidate}
          setError={setError}
          itemList={itemList}
          ratingItem={ratingItem}
          index={index}
          key={ratingItem.value}
          onChangeRating={onChangeRating}
        />
      ))}
    </div>
  );
};
Ratings.propTypes = {
  itemList: PropTypes.array,
  onChangeRating: PropTypes.func,
  children: PropTypes.element,
  setError: PropTypes.func,
  forceValidate: PropTypes.bool,
};
Ratings.defaultProps = {
  itemList: [],
  onChangeRating: () => {},
  children: null,
};
export default Ratings;
