import get from 'lodash/get';

export const processData = data => {
  const output = [];
  data.forEach(item => {
    const option = {
      label: item.name,
      value: get(item, '_id'),
    };
    output.push(option);
  });
  return output;
};

export const processDataWithCountry = data => {
  const output = [];
  data.forEach(item => {
    const option = {
      label: `${item.name}, ${get(item, 'country')}`,
      value: get(item, '_id'),
    };
    output.push(option);
  });
  return output;
};

export const getStepperClass = (currentStep, index) => {
  let output = '';
  if (currentStep === index + 1) {
    output = 'active';
  }
  if (index + 1 < currentStep) {
    output = 'completed';
  }
  return output;
};
