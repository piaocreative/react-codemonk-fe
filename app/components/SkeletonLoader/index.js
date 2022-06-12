import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import Skeleton from 'react-loading-skeleton';
import { Card } from 'components';
import { Paragrpah, GridCard, TalentCard } from './styles';

export const LoaderLines = prop => <Skeleton count={prop.count} width={prop.width} height={prop.height} {...prop} />;
export const LoaderCircle = prop => <Skeleton circle width={prop.width} height={prop.height} {...prop} />;
export const LoaderIcon = prop => <Skeleton width={prop.width} height={prop.height} {...prop} />;

const LoaderLinesForCard = (
  <div className="mt-5">
    <LoaderLines className="my-3 w-25" count={1} height={6} />
    <LoaderLines className="my-3 w-50" count={1} height={6} />
  </div>
);
const ContentLoaderForCard = (
  <div className="d-flex mt-3">
    <LoaderCircle width={8} height={8} circle />
    <div className="d-flex justify-content-between w-100 ms-3 flex-column">
      <div>
        <LoaderLines className="w-50" count={1} height={5} />
      </div>
    </div>
  </div>
);
export const CardSkeleton = props => {
  const { cardCount } = props;

  return [...Array(cardCount)].map(i => (
    <Col md={3}>
      <GridCard key={i}>
        <LoaderIcon width={40} height={40} square />
        {LoaderLinesForCard}
        {LoaderLinesForCard}
        <div className="mt-5">
          <div className="d-flex mt-3">
            <LoaderCircle width={8} height={8} circle />
            <div className="d-flex justify-content-between w-100 ms-3 flex-column">
              <div>
                <LoaderLines className="w-75" count={1} height={5} />
              </div>
            </div>
          </div>
          {ContentLoaderForCard}
          <div className="d-flex mt-3">
            <LoaderCircle width={8} height={8} circle />
            <div className="d-flex justify-content-between w-100 ms-3 flex-column">
              <div>
                <LoaderLines className="w-75" count={1} height={5} />
              </div>
            </div>
          </div>
          {ContentLoaderForCard}
        </div>
        {LoaderLinesForCard}
      </GridCard>
    </Col>
  ));
};

export const TalentCardSkeleton = props => {
  const { cardCount } = props;

  return [...Array(cardCount)].map(i => (
    <Col md={4}>
      <TalentCard key={i}>
        <div className="d-flex">
          <LoaderIcon width={80} height={80} className="project-image-loader" />
        </div>
        <div className="mt-5">
          <div className="d-flex mt-3">
            <div className="d-flex justify-content-between w-100 ms-0 flex-column">
              <div>
                <LoaderLines className="w-75" count={1} height={5} />
              </div>
            </div>
          </div>
        </div>
        {LoaderLinesForCard}
      </TalentCard>
    </Col>
  ));
};

export const BriefCardSkeleton = props => {
  const { cardCount } = props;

  return [...Array(cardCount)].map(() => (
    <Card key={uuidv4()}>
      <Paragrpah className="d-flex flex-column mt-4">
        <LoaderLines className="my-2 w-25" count={1} height={8} />
      </Paragrpah>
      <Paragrpah className="d-flex flex-column mt-4">
        <LoaderLines className="my-2 w-100" count={1} height={8} />
        <LoaderLines className="my-2 w-100" count={1} height={8} />
        <LoaderLines className="my-2 w-50" count={1} height={8} />
      </Paragrpah>
    </Card>
  ));
};

export const NotificationCardSkeleton = props => {
  const { cardCount } = props;

  return [...Array(cardCount)].map(() => (
    <Card key={uuidv4()} className="p-2">
      <Paragrpah className="d-flex flex-column mt-2">
        <LoaderLines className="my-2 w-100" count={1} height={8} />
        <LoaderLines className="my-2 w-100" count={1} height={8} />
        <LoaderLines className="my-2 w-25" count={1} height={8} />
      </Paragrpah>
      <LoaderLines className="my-3 w-100" count={1} height={1} />
    </Card>
  ));
};

const LoaderLinesForTable = <LoaderLines className="mt-3" count={1} height={9} />;
export const TableSkeletonCol6 = props => {
  const { cardCount } = props;

  return [...Array(cardCount)].map(i => (
    <div key={i}>
      <Card className="border-0 px-3 py-0 mb-0">
        <Row>
          <Col sm={1}>{LoaderLinesForTable}</Col>
          <Col sm={3}>
            <LoaderLines className="mt-3 w-50" count={1} height={9} />
          </Col>
          <Col sm={3}>{LoaderLinesForTable}</Col>
          <Col sm={2}>{LoaderLinesForTable}</Col>
          <Col sm={2}>
            <LoaderLines className="mt-3" count={1} height={9} />
          </Col>
          <Col sm={1}>{LoaderLinesForTable}</Col>
        </Row>
      </Card>
      <Card className="border-0 px-3 py-0 mb-0">
        <Row>
          <Col sm={1}>
            <LoaderLines className="mt-3" count={1} height={9} />
          </Col>
          <Col sm={3}>
            <LoaderLines className="mt-3 w-75" count={1} height={9} />
          </Col>
          <Col sm={3}>
            <LoaderLines className="mt-3 w-50" count={1} height={9} />
          </Col>
          <Col sm={2}>{LoaderLinesForTable}</Col>
          <Col sm={2}>{LoaderLinesForTable}</Col>
          <Col sm={1}>
            <LoaderLines className="mt-3" count={1} height={9} />
          </Col>
        </Row>
      </Card>
      <Card className="border-0 px-3 py-0 mb-0">
        <Row>
          <Col sm={1}>{LoaderLinesForTable}</Col>
          <Col sm={3}>
            <LoaderLines className="mt-3 w-25" count={1} height={9} />
          </Col>
          <Col sm={3}>
            <LoaderLines className="mt-3 w-75" count={1} height={9} />
          </Col>
          <Col sm={2}>
            <LoaderLines className="mt-3" count={1} height={9} />
          </Col>
          <Col sm={2}>{LoaderLinesForTable}</Col>
          <Col sm={1}>{LoaderLinesForTable}</Col>
        </Row>
      </Card>
    </div>
  ));
};

export const TableSkeletonCol4 = props => {
  const { cardCount } = props;

  return [...Array(cardCount)].map(i => (
    <div key={i}>
      <Card className="border-0 px-3 py-0 mb-0">
        <Row>
          <Col sm={2}>
            <LoaderLines className="mt-3 w-50" count={1} height={9} />
          </Col>
          <Col sm={4}>
            <LoaderLines className="mt-3 w-50" count={1} height={9} />
          </Col>
          <Col sm={4}>{LoaderLinesForTable}</Col>
          <Col sm={2}>{LoaderLinesForTable}</Col>
        </Row>
      </Card>
      <Card className="border-0 px-3 py-0 mb-0">
        <Row>
          <Col sm={2}>
            <LoaderLines className="mt-3 " count={1} height={9} />
          </Col>
          <Col sm={4}>
            <LoaderLines className="mt-3 w-75" count={1} height={9} />
          </Col>
          <Col sm={4}>
            <LoaderLines className="mt-3 w-50" count={1} height={9} />
          </Col>
          <Col sm={2}>
            <LoaderLines className="mt-3 w-50" count={1} height={9} />
          </Col>
        </Row>
      </Card>
      <Card className="border-0 px-3 py-0 mb-0">
        <Row>
          <Col sm={2}>{LoaderLinesForTable}</Col>
          <Col sm={4}>
            <LoaderLines className="mt-3 w-25" count={1} height={9} />
          </Col>
          <Col sm={4}>
            <LoaderLines className="mt-3 w-75" count={1} height={9} />
          </Col>
          <Col sm={2}>{LoaderLinesForTable}</Col>
        </Row>
      </Card>
    </div>
  ));
};

export const TableSkeletonCol3 = props => {
  const { cardCount } = props;
  return [...Array(cardCount)].map(i => (
    <div key={i}>
      <Card className="border-0 px-3 py-0 mb-0">
        <Row>
          <Col sm={4}>
            <LoaderLines className="mt-3 w-50" count={1} height={9} />
          </Col>
          <Col sm={4}>
            <LoaderLines className="mt-3 w-50" count={1} height={9} />
          </Col>
          <Col sm={4}>{LoaderLinesForTable}</Col>
        </Row>
      </Card>
      <Card className="border-0 px-3 py-0 mb-0">
        <Row>
          <Col sm={4}>
            <LoaderLines className="mt-3 " count={1} height={9} />
          </Col>
          <Col sm={4}>
            <LoaderLines className="mt-3 w-75" count={1} height={9} />
          </Col>
          <Col sm={4}>
            <LoaderLines className="mt-3 w-50" count={1} height={9} />
          </Col>
        </Row>
      </Card>
      <Card className="border-0 px-3 py-0 mb-0">
        <Row>
          <Col sm={4}>{LoaderLinesForTable}</Col>
          <Col sm={4}>
            <LoaderLines className="mt-3 w-25" count={1} height={9} />
          </Col>
          <Col sm={4}>
            <LoaderLines className="mt-3 w-75" count={1} height={9} />
          </Col>
        </Row>
      </Card>
    </div>
  ));
};
CardSkeleton.defaultProps = {
  cardCount: '',
};
CardSkeleton.propTypes = {
  cardCount: PropTypes.number,
};
