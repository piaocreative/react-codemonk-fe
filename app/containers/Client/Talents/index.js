/** Talents
 * This is the Projects page for the client, at the '/client/talents' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import get from 'lodash/get';
import moment from 'moment';
import Content from 'components/Content';
import SVG from 'react-inlinesvg';
import StorageService from 'utils/StorageService';
import { VALIDATION } from 'utils/constants';
import { API_URL, CLIENT, TALENTS, customStyles, filesIcon, plusIcon, talentStatusArray, currencyData } from 'containers/App/constants';
import request from 'utils/request';
import Selects from 'components/Selects';
import { H4, Card, H3, Button } from 'components';
import TalentNameButton from 'components/TalentNameButton';
import ToastifyMessage from 'components/ToastifyMessage';
import { ComingSoonBlock } from 'components/ComingSoon/styles';
import { SelectBox } from 'containers/Admin/Projects/styles';
import { paginationComponent, redirectTo } from 'containers/App/utils';
import injectSaga from 'utils/injectSaga';
import { getCurrencySymbol } from 'containers/MyProfilePage/components/utils';
import { defaultProps, propTypes } from 'containers/proptypes';
import { key, columns, DEFAULT_PAGE_SIZE, LinearIndeterminate } from './constants';
import * as actions from './actions';
import saga from './saga';
import messages from './messages';
import 'rc-pagination/assets/index.css';

export class Talents extends React.Component {
  constructor(props) {
    super(props);
    const getPageNumber = StorageService.get('clientTalentPageNumber');
    const updatedPageNumber = JSON.parse(getPageNumber) || 1;
    this.state = {
      talentList: [],
      paginationData: [],
      pageNum: updatedPageNumber,
    };
  }

  componentDidMount() {
    const { pageNum } = this.state;
    this.loadTalents(pageNum);
  }

  loadTalents = pageNum => {
    StorageService.set('clientTalentPageNumber', JSON.stringify(pageNum));
    this.setState({ isListLoading: true, pageNum });
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${CLIENT}${TALENTS}?page=${pageNum}`;
    request(requestURL, data)
      .then(this.setTalentDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setTalentDetails = response => {
    if (get(response, 'status')) {
      const { data } = response;
      const array = [];
      get(data, 'docs', []).forEach(listData => {
        const statuslabel = talentStatusArray.find(obj => obj.value === listData.status).label;
        const id = get(listData, '_id');
        const talentId = get(listData, 'talentId');
        const talentUserId = get(listData, 'talentUserId');

        const talentName = get(listData, 'talentShortName', '');
        const extra = {};
        const profilePicture = get(listData, 'profilePicture', '');
        const btnProps = {
          redirectTo: '/client/talent-profile/',
          talentId,
          redirectType: 'clientTalentList',
          talentName,
          extra,
          profilePicture,
        };
        const name = <TalentNameButton {...btnProps} />;

        array.push({
          name,
          role: listData.primaryRole,
          project: listData.projectName,
          rate: (
            <React.Fragment>
              {getCurrencySymbol(currencyData, 'code', listData.currency)}
              {listData.ratePerHour}
            </React.Fragment>
          ),
          allocation: moment(listData.allocationTill).format('DD/MM/YYYY'),
          status: (
            <SelectBox className="input-sm small-arrow">
              <Field
                name="status"
                type="text"
                component={Selects}
                defaultValue={{ label: statuslabel, value: listData.status }}
                searchable={false}
                options={talentStatusArray.map(item => ({
                  label: `${item.label}`,
                  value: item.value,
                }))}
                onChange={e => this.handleChangeStatus(talentUserId, id, e)}
              />
            </SelectBox>
          ),
        });
      });

      this.setState({ talentList: array, paginationData: get(response, 'data', {}), isListLoading: false });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  handleChangeStatus = (talentID, projectID, selectedVal) => {
    const { onChangeStatus } = this.props;
    const data = { projectId: projectID, talentId: talentID, status: selectedVal.value };
    onChangeStatus(data);
  };

  render() {
    const { talentList, paginationData, isListLoading } = this.state;
    const { history } = this.props;
    const totalDocs = get(paginationData, 'totalDocs', 0);

    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>

        <Content>
          <Card className="d-flex align-items-center justify-content-between table-header">
            <div className="d-flex align-items-md-center flex-column flex-md-row">
              <div className="d-flex align-items-center me-3">
                <H4 className="text-start my-0">
                  <FormattedMessage {...messages.headingTalents} />
                </H4>
              </div>
              <div className="d-flex mt-4 mt-md-0">
                <Button
                  className="btn btn-sm btn-outline btn-plus ms-md-3 top-0"
                  onClick={() => {
                    redirectTo(history, '/client/talent-listing');
                  }}
                >
                  <SVG className="me-2" src={plusIcon} />
                  <span>
                    <FormattedMessage {...messages.btnHireTalentTitle} />
                  </span>
                </Button>
              </div>
            </div>
          </Card>
          <hr className="m-0" />
          {isListLoading || totalDocs > 0 ? (
            <React.Fragment>
              <Card className="p-0">
                <DataTable
                  noHeader
                  columns={columns}
                  customStyles={customStyles}
                  data={talentList}
                  totalRows={0}
                  direction="ltr"
                  progressPending={isListLoading}
                  progressComponent={<LinearIndeterminate />}
                  paginationComponentOptions={{ noRowsPerPage: true }}
                  overflowY
                  overflowYOffset="80px"
                  noDataComponent={
                    <p className="p-4 m-0 text-muted">
                      <small>{messages.noRecord.defaultMessage}</small>
                    </p>
                  }
                />
              </Card>
              {paginationComponent(paginationData, DEFAULT_PAGE_SIZE, this.loadTalents)}
            </React.Fragment>
          ) : (
            <ComingSoonBlock>
              <div className="inner-content">
                <SVG src={filesIcon} />
                <H3 className="mt-0">{messages.emptyStateHeader.defaultMessage}</H3>
                <p className="sm">{messages.emptyStateContent.defaultMessage}</p>
                <ul>
                  <li>{messages.instruction1.defaultMessage}</li>
                  <li>{messages.instruction2.defaultMessage}</li>
                  <li>{messages.instruction3.defaultMessage}</li>
                </ul>
                <Button
                  className="btn btn-outline"
                  onClick={() => {
                    redirectTo(history, '/client/talent-listing');
                  }}
                >
                  {messages.btnHireTalent.defaultMessage}
                </Button>
              </div>
            </ComingSoonBlock>
          )}
        </Content>
      </React.Fragment>
    );
  }
}

Talents.defaultProps = defaultProps;
Talents.propTypes = propTypes;
export function mapDispatchToProps(dispatch) {
  return {
    onChangeStatus: (data, onSuccess) => dispatch(actions.changeStatus(data, onSuccess)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key, saga });

export default compose(
  withSaga,
  withConnect,
  reduxForm({
    form: key,
    touchOnChange: true,
  }),
)(Talents);
