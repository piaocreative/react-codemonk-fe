import get from 'lodash/get';

export const checkUserType = directorObj => {
  let output = '';
  const { isDirector, isShareHolder } = directorObj;
  if (isDirector && isShareHolder) {
    output = 'Director & Shareholder';
  } else if (isShareHolder) {
    output = 'Shareholder';
  } else if (isDirector) {
    output = 'Director';
  }
  return output;
};

export const countTotalShares = directorsArray => {
  let output = 0;
  for (let i = 0; i < directorsArray.length; i++) {
    const holdingPercent = get(directorsArray[i], 'holdingPercent', 0);
    output += holdingPercent;
  }
  return output;
};
