/** TalentProjects
 * This is the TalentProjects page
 */
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Row, Col, CardBody, CardTitle } from 'reactstrap';
import { compose } from 'redux';
import SVG from 'react-inlinesvg';
import { reduxForm, Field } from 'redux-form/immutable';
import get from 'lodash/get';
import CountUp from 'react-countup';
import Pagination from 'rc-pagination';
import ProjectCard from 'components/ProjectCard';
import Content from 'components/Content';
import { projectStatusArray } from 'containers/constants';
import { filesIcon } from 'containers/App/constants';
import { Card, Button, FormLabel, Badge, P, H3, PrivateGrid, H6 } from 'components';
import { defaultProps, propTypes } from 'containers/proptypes';
import { textItemRender } from 'containers/TalentListingPage/utils';
import Selects from 'components/Selects';
import SortComponent from 'components/SortComponent';
import containerMessage from 'containers/messages';
import { localeInfo, projectSortArray } from 'containers/TalentListingPage/constants';
import { ComingSoonBlock } from 'components/ComingSoon/styles';
import messages from './messages';
import 'rc-pagination/assets/index.css';
import { SortSection } from './styles';
import { CardProgressComponent } from './utils';
import { DBcontainer, LeftCol, RightCol } from '../Dashboard/styles';

export const TalentProjects = props => {
  const {
    projectStatus,
    projectList = [],
    paginationData = {},
    handleChangeFilter,
    loadProjects,
    pageSize,
    currentSort,
    handleSort,
    isListLoading,
    pageNum,
  } = props;
  const totalDocs = get(paginationData, 'totalDocs', 0);

  const loadProjectDetails = pgNum => {
    loadProjects(pgNum);
  };

  const handleSortChange = selectedSort => {
    handleSort(selectedSort);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>{messages.TalentProjectsTitle.defaultMessage}</title>
        <meta name="description" content={messages.TalentProjectsMetaTitle.defaultMessage} />
      </Helmet>
      <Content>
        <PrivateGrid>
          <DBcontainer>
            <LeftCol>
              <Row className="mb-3">
                <Col lg={6} md={12} className="mr-0 d-flex">
                  <H3>{messages.allProjects.defaultMessage}</H3>
                  {totalDocs !== 0 && (
                    <Badge className="ms-2 primary badge-sm">
                      <P className="p14 mb-0" lineHeight="20">
                        <CountUp duration={1} end={totalDocs} />
                      </P>
                    </Badge>
                  )}
                </Col>
                <Col lg={6} md={12}>
                  <SortSection>
                    <div className="sort-label">
                      <H6 lineHeight="21">{containerMessage.sortBy.defaultMessage}:</H6>
                    </div>
                    <SortComponent
                      sortArray={projectSortArray}
                      showSortIcon
                      currentSort={currentSort}
                      handleSortChange={handleSortChange}
                    />
                  </SortSection>
                </Col>
              </Row>
              {isListLoading || projectList.length > 0 ? (
                <Fragment>
                  {isListLoading ? <CardProgressComponent /> : <ProjectCard projectList={projectList} />}
                  {paginationData.totalDocs > pageSize && (
                    <Pagination
                      total={paginationData.totalDocs}
                      current={pageNum}
                      defaultPageSize={paginationData.limit}
                      onChange={loadProjectDetails}
                      itemRender={textItemRender}
                      locale={localeInfo}
                    />
                  )}
                </Fragment>
              ) : (
                <ComingSoonBlock className="coming-soon-block">
                  <div className="inner-content">
                    <SVG src={filesIcon} />
                    <H3 className="mt-0">{messages.emptyStateHeader.defaultMessage}</H3>
                    <P className="sm mb-0">{messages.emptyStateContent.defaultMessage}</P>
                  </div>
                </ComingSoonBlock>
              )}
            </LeftCol>
            <RightCol>
              <Card className="filter-card pt-3">
                <CardBody className="p-0">
                  <div className="filter-card-body mb-4 d-flex justify-content-between">
                    <CardTitle tag="h5" className="card-title">
                      {messages.filters.defaultMessage}
                    </CardTitle>
                    <Button type="button" className="btn btn-link" onClick={() => handleChangeFilter(null)}>
                      {messages.clearAll.defaultMessage}
                    </Button>
                  </div>
                  <FormLabel tag="h6">{messages.projectStatus.defaultMessage}</FormLabel>
                  <Field
                    name="status"
                    type="text"
                    component={Selects}
                    defaultValue={projectStatus}
                    searchable={false}
                    options={projectStatusArray.map(item => ({
                      label: `${item.label}`,
                      value: item.value,
                    }))}
                    onChange={e => handleChangeFilter(e)}
                  />
                  <Button type="button" className="btn btn-outline btn-sm w-100 d-none">
                    {messages.updateResult.defaultMessage}
                  </Button>
                </CardBody>
              </Card>
            </RightCol>
          </DBcontainer>
        </PrivateGrid>
      </Content>
    </React.Fragment>
  );
};

TalentProjects.defaultProps = defaultProps;
TalentProjects.propTypes = propTypes;

export default compose(
  reduxForm({
    form: 'TalentProjectsForm',
    touchOnChange: true,
  }),
)(TalentProjects);
