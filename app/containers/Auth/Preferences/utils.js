export const getFilteredArrayObject = (responseData, arrayList) => {
  let output = [];
  output = responseData.map(val => arrayList.find(v => v.value === val)).map(p => ({ label: p.label, value: p.value }));

  return output;
};

export const getFilterValue = responseData => {
  let output = [];
  output = (responseData || []).map(item => item.value);

  return output;
};
