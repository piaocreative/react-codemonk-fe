import React from 'react';
import { CardSkeleton } from 'components/SkeletonLoader';

export const sortUrl = sort => {
  let url = '';
  let val = '';
  switch (sort) {
    case 'aToZ':
      val = { name: 1 };
      url = `&sort=${encodeURIComponent(JSON.stringify(val))}`;
      break;
    case 'zToA':
      val = { name: -1 };
      url = `&sort=${encodeURIComponent(JSON.stringify(val))}`;
      break;
    case 'lowToHigh':
      val = { experienceOrder: 1 };
      url = `&sort=${encodeURIComponent(JSON.stringify(val))}`;
      break;
    case 'highToLow':
      val = { experienceOrder: -1 };
      url = `&sort=${encodeURIComponent(JSON.stringify(val))}`;
      break;
    /*
      Talent Project Listing page Sort
    */
    case 'talentHighToLow':
      val = { 'talents._id': 1 };
      url = `&sort=${encodeURIComponent(JSON.stringify(val))}`;
      break;
    case 'talentAToZ':
      val = { name: 1 };
      url = `&sort=${encodeURIComponent(JSON.stringify(val))}`;
      break;
    case 'talentZToA':
      val = { name: -1 };
      url = `&sort=${encodeURIComponent(JSON.stringify(val))}`;
      break;
    default:
  }
  return url;
};

export const defaultSortUrl = sort => {
  let url = '';
  let val = '';
  switch (sort) {
    case 'aToZ_Name':
      val = 'name';
      url = `&sort=${encodeURIComponent(val)}`;
      break;
    case 'zToA_Name':
      val = '-name';
      url = `&sort=${encodeURIComponent(val)}`;
      break;
    case 'lowToHigh':
      val = '_id';
      url = `&sort=${encodeURIComponent(val)}`;
      break;
    case 'highToLow':
      val = '-_id';
      url = `&sort=${encodeURIComponent(val)}`;
      break;
    case 'lowToHigh_Exp':
      val = 'experienceOrder';
      url = `&sort=${encodeURIComponent(val)}`;
      break;
    case 'highToLow_Exp':
      val = '-experienceOrder';
      url = `&sort=${encodeURIComponent(val)}`;
      break;
    default:
  }
  return url;
};

export const columnSortUrl = sort => {
  const { column, sortDirection } = sort;
  let url = '';
  const sortValue = sortDirection === 'desc' ? '-' : '';
  url = `&sort=${sortValue}${column}`;
  if (column === 'referral' || column === 'referrer') {
    url = `&sort=${sortValue}${column}.firstName,${column}.lastName`;
  }
  return url;
};

export const skillsUrl = skillsArray => {
  let skills = '';
  skills += skillsArray.length > 0 ? skillsArray.map(selected => `${selected.value}`) : '';
  return skills ? `&skills=${encodeURIComponent(skills)}` : '';
};

export const searchUrl = search => (search ? `&q=${search}` : '');

export const textItemRender = (current, type, element) => {
  if (type === 'prev') {
    return 'Previous';
  }
  if (type === 'next') {
    return 'Next';
  }
  return element;
};

export const loadingListing = () => (
  <React.Fragment>
    <CardSkeleton cardCount={4} />
    <CardSkeleton cardCount={4} />
    <CardSkeleton cardCount={4} />
  </React.Fragment>
);
