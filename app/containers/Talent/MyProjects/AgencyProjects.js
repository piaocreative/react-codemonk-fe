/** AgencyProjects
 * This is the AgencyProjects page
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import DataTable from 'react-data-table-component';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import get from 'lodash/get';
import Content from 'components/Content';
import SVG from 'react-inlinesvg';
import { customStyles, filesIcon } from 'containers/App/constants';
import Selects from 'components/Selects';
import { H4, Card, H3 } from 'components';
import { paginationComponent } from 'containers/App/utils';
import { defaultProps, propTypes } from 'containers/proptypes';
import { ComingSoonBlock } from 'components/ComingSoon/styles';
import { projectStatusArray, DEFAULT_PAGE_SIZE } from 'containers/constants';
import containerMessage from 'containers/messages';
import { ProgressComponent } from './utils';
import messages from './messages';
import 'rc-pagination/assets/index.css';

export const AgencyProjects = props => {
  const { tableColumns, projectStatus, projectList, paginationData, isListLoading, loadProjects, handleChangeFilter } = props;
  const totalDocs = get(paginationData, 'totalDocs', 0);

  return (
    <React.Fragment>
      <Helmet>
        <title>{messages.AgencyProjectsTitle.defaultMessage}</title>
        <meta name="description" content={messages.AgencyProjectsMetaTitle.defaultMessage} />
      </Helmet>

      <Content>
        <Card className="d-flex align-items-center justify-content-between table-header">
          <H4 className="text-start my-0">
            <FormattedMessage {...messages.AgencyProjectsHeadingProject} />
          </H4>
          <div className="input-sm">
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
          </div>
        </Card>
        <hr className="m-0" />
        {isListLoading || totalDocs > 0 || get(projectStatus, 'value') !== -1 ? (
          <React.Fragment>
            <Card className="p-0">
              <DataTable
                noHeader
                columns={tableColumns}
                customStyles={customStyles}
                data={projectList}
                totalRows={0}
                direction="ltr"
                progressPending={isListLoading}
                progressComponent={<ProgressComponent />}
                paginationComponentOptions={{ noRowsPerPage: true }}
                noDataComponent={
                  <p className="p-4 m-0 text-muted">
                    <small>{containerMessage.noRecord.defaultMessage}</small>
                  </p>
                }
              />
            </Card>
            {paginationComponent(paginationData, DEFAULT_PAGE_SIZE, loadProjects)}
          </React.Fragment>
        ) : (
          <ComingSoonBlock>
            <div className="inner-content">
              <SVG src={filesIcon} />
              <H3 className="mt-0">{messages.emptyStateHeader.defaultMessage}</H3>
              <p className="sm mb-0">{messages.emptyStateContent.defaultMessage}</p>
            </div>
          </ComingSoonBlock>
        )}
      </Content>
    </React.Fragment>
  );
};

AgencyProjects.defaultProps = defaultProps;
AgencyProjects.propTypes = propTypes;

export default compose(
  reduxForm({
    form: 'AgencyProjectsForm',
    touchOnChange: true,
  }),
)(AgencyProjects);
