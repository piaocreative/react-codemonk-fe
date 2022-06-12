import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import get from 'lodash/get';
import parse from 'html-react-parser';
import StorageService from 'utils/StorageService';
import { getPageData, paginationComponent } from 'containers/App/utils';
import { ComingSoonBlock } from 'components/ComingSoon/styles';
import { Card, H5 } from 'components';
import { filesIcon } from 'containers/App/constants';
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from 'containers/constants';
import ShowMoreText from 'components/ShowMore/ShowMoreText';
import containerMessage from 'containers/messages';

const TalentLookingFor = props => {
  const { projectDetails } = props;
  const briefs = get(projectDetails, 'briefs', []);
  const getBriefListPageNo = StorageService.get('talentProjectDetailsBriefPageNumber');
  const briefListPageNo = JSON.parse(getBriefListPageNo) || DEFAULT_PAGE_NO;
  const [pageNum, setPageNum] = useState(briefListPageNo);
  const [paginationData, setPaginationData] = useState({
    totalDocs: briefs.length,
    page: briefListPageNo,
    limit: DEFAULT_PAGE_SIZE,
  });
  const [briefsList, setBriefsList] = useState(briefs);

  const setBriefDetails = pNo => {
    StorageService.set('talentProjectDetailsBriefPageNumber', JSON.stringify(pNo));
    const pageData = getPageData(get(projectDetails, 'briefs', []), pNo, DEFAULT_PAGE_SIZE);
    setBriefsList(pageData);
    setPageNum(pNo);
    setPaginationData({ totalDocs: get(projectDetails, 'briefs', []).length, page: pNo, limit: DEFAULT_PAGE_SIZE });
  };

  const briefCard = data => {
    const plainText = get(data, 'description', '').replace(/<[^>]*>?/gm, '');
    const key = get(data, '_id');
    const skills = [];
    get(data, 'skills', []).forEach(skill => skills.push({ label: skill, value: skill }));

    return (
      <Card className="talent-card mb-20" key={key}>
        <div>
          <H5 className="mb-2">{get(data, 'name')}</H5>
          <div className="read-more-less-content mb-0">
            <ShowMoreText lines={5} more="more" less="" anchorClass="links" expanded={false} plainText={plainText}>
              {parse(get(data, 'description'))}
            </ShowMoreText>
          </div>
        </div>
      </Card>
    );
  };

  useEffect(() => {
    setBriefDetails(pageNum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      {briefsList.length > 0 ? (
        <React.Fragment>
          {briefsList.map(brief => briefCard(brief))}
          {paginationComponent(paginationData, DEFAULT_PAGE_SIZE, setBriefDetails, pageNum)}
        </React.Fragment>
      ) : (
        <ComingSoonBlock className="mt-3 border-0 mb-0">
          <div className="inner-content">
            <SVG src={filesIcon} />
            <p className="sm my-0">{containerMessage.noOpenRoles.defaultMessage}</p>
          </div>
        </ComingSoonBlock>
      )}
    </React.Fragment>
  );
};

TalentLookingFor.defaultProps = {
  projectDetails: {},
};

TalentLookingFor.propTypes = {
  projectDetails: PropTypes.object,
};

export default TalentLookingFor;
