import moment from 'moment';

export const getMaxStartDate = (endDate, maxEndDate) => {
  let output = '';
  if (endDate && moment(endDate).isSameOrBefore(moment(maxEndDate))) {
    output = moment(endDate).toDate();
  } else {
    output = maxEndDate ? moment(maxEndDate).toDate() : '';
  }
  return output;
};
