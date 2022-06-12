import React from 'react';
import { TableSkeletonCol3, TalentCardSkeleton } from 'components/SkeletonLoader';

export const ProgressComponent = () => (
  <div className="w-100 flex-column d-flex">
    <TableSkeletonCol3 cardCount={5} />
  </div>
);

export const CardProgressComponent = () => (
  <div className="w-100 flex-column d-flex">
    <TalentCardSkeleton cardCount={1} />
  </div>
);
