import React, { useState } from 'react';
import Rating from 'react-rating';
import PropTypes from 'prop-types';
import Badge from '../Badge';
import P from '../P';
import { RatingWrapper, EmptyIcon, FullIcon } from './rating-styles';
export const RatingComponent = props => {
  const { index, ratingItem, onChangeRating, itemList, setError, forceValidate } = props;
  const { label, rating } = ratingItem;
  const [rateLabel, setRateLabel] = useState(rating === undefined ? '1-10' : rating);
  const [ratingHoverIndex, setRatingHoverIndex] = useState(0);
  const [ratingItemCurrent, setRatingItemCurrent] = useState(ratingItem);
  const onChangeHandler = (indexRating, labelRating, value) => {
    onChangeRating(indexRating, value, labelRating);
    setRatingItemCurrent({ label, rating: value });
  };

  return (
    <RatingWrapper index={index}>
      <div className="rating-item">
        <Badge className="title badge-md secondary">{label}</Badge>
        <div className="ratings">
          <div className="rating-bars">
            <Rating
              data-testid="Rating"
              quiet
              onHover={value => setRatingHoverIndex(value)}
              onChange={value => {
                if (itemList.filter(item => item.rating === value).length === 2 && forceValidate) {
                  setError('Please do not rate any more than two skills at the same level.');
                } else {
                  setError('');
                  setRateLabel(value);
                  onChangeHandler(index, label, value);
                }
              }}
              start={0}
              initialRating={ratingItemCurrent.rating}
              fullSymbol={Array(10)
                .fill(0)
                .map(() => (
                  <FullIcon />
                ))}
              emptySymbol={Array(10)
                .fill(0)
                .map((_, index1) => (
                  <EmptyIcon icon={ratingHoverIndex} index={index1} />
                ))}
              stop={10}
            />
          </div>
          <P className="p16 rating-label m-0" id={label}>
            {rateLabel}
          </P>
        </div>
      </div>
    </RatingWrapper>
  );
};
RatingComponent.propTypes = {
  index: PropTypes.number,
  ratingItem: PropTypes.object,
  onChangeRating: PropTypes.func,
  forceValidate: PropTypes.bool,
  setError: PropTypes.func,
  itemList: PropTypes.array,
};
RatingComponent.defaultProps = {
  index: 0,
  ratingItem: {},
  onChangeRating: () => {},
};
export default RatingComponent;
