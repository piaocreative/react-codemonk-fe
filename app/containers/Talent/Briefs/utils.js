export const getFiltersURL = data => (data.length > 0 ? data.map(selected => `${selected}`) : '');

export const getFiltersValueURL = data => (data.length > 0 ? data.map(selected => `${selected.value}`) : '');
