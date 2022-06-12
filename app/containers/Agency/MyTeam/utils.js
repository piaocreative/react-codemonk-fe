import React from 'react';
import get from 'lodash/get';
import { TableSkeletonCol6 } from 'components/SkeletonLoader';
import { daysArray } from './constants';
import { WeekList } from './styles';

export const ProgressComponent = () => (
  <div className="w-100 flex-column d-flex">
    <TableSkeletonCol6 cardCount={5} />
  </div>
);

export const getAvailability = availability => (
  <WeekList className="no-action">
    {availability.map((day, index) =>
      get(day, 'availability') ? <li className="active">{daysArray[index]}</li> : <li>{daysArray[index]}</li>,
    )}
  </WeekList>
);
