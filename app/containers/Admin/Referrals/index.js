/* eslint-disable react/no-unused-state */
/** Referrals
 * This is the Referrals page
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import SVG from 'react-inlinesvg';
import get from 'lodash/get';
import { FormGroup } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { VALIDATION } from 'utils/constants';
import { toast } from 'react-toastify';
import AsyncSelects from 'components/AsyncSelects';
import { compose } from 'redux';
import moment from 'moment';
import DataTable from 'react-data-table-component';
import request from 'utils/request';
import Content from 'components/Content';
import debounce from 'lodash/debounce';
import StorageService from 'utils/StorageService';
import { ComingSoonBlock } from 'components/ComingSoon/styles';
import { processData } from 'containers/Client/AddBrief/utils';
import { paginationComponent, getBadgeClass } from 'containers/App/utils';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_NO } from 'containers/constants';
import Selects from 'components/Selects';
import { reduxForm, Field } from 'redux-form/immutable';
import containerMessage from 'containers/messages';
import { defaultProps, propTypes } from 'containers/proptypes';
import { Card, Badge, ToastifyMessage, H3, PrivateGrid, P, FormLabel } from 'components';
import {
  TALENT,
  SEARCH_BY_NAME,
  VERSION2,
  REFERRAL,
  newCustomStylesForGrid,
  filesIcon,
  userProfileIcon,
  API_URL,
  LIST,
} from 'containers/App/constants';
import { NameWithProfileIcon } from 'components/TalentNameButton/styles';
import { columnSortUrl } from 'containers/TalentListingPage/utils';
import { key, referralTableColumns, ProgressComponent, referralFilter } from './constants';
import messages from './messages';

export class Referrals extends React.Component {
  constructor(props) {
    super(props);
    const getPageNumber = StorageService.get('referralPage');
    const updatedPageNumber = JSON.parse(getPageNumber) || 1;
    this.state = {
      talentId: '',
      activeTalent: '',
      statusFilter: { label: 'All', value: -1 },
      pageNum: updatedPageNumber,
      isListLoading: false,
      sortFilter: { column: '', sortDirection: '' },
    };
    this.debouncedTalentGetOptions = debounce(this.getTalentOptions, 500);
  }

  componentDidMount() {
    const { pageNum } = this.state;
    this.loadReferrals(pageNum);
  }

  // talent Name fetch
  fetchTalent = async value => {
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${TALENT}${SEARCH_BY_NAME}?q=${value}`;
    return request(requestURL, data);
  };

  // talent fetch
  getTalentOptions = (inputValue, cb) => {
    const talentData = this.fetchTalent(inputValue);
    talentData
      .then(response => {
        const { status, data } = response;
        if (status) {
          const talentOptions = processData(data);
          this.setState({ talentOptions, talentData: data });
          if (talentOptions && talentOptions.length > 0) {
            cb(talentOptions);
          }
        }
      })
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  loadTalentOptions = (inputValue, callback) => {
    if (inputValue.length > 1) {
      this.debouncedTalentGetOptions(inputValue, callback);
    }
  };

  loadReferrals = pageNum => {
    const { statusFilter, talentId, sortFilter } = this.state;
    StorageService.set('referralPage', JSON.stringify(pageNum));
    this.setState({ isListLoading: true, pageNum });
    const status = get(statusFilter, 'value', -1);

    const data = { method: 'GET' };
    let requestURL = '';
    requestURL = `${API_URL}${VERSION2}${REFERRAL}${LIST}?page=${pageNum}&limit=${DEFAULT_PAGE_SIZE}`;

    // statusFilter
    requestURL += status !== -1 ? `&status=${encodeURIComponent(status)}` : '';

    // talentId
    requestURL += talentId ? `&referrerUserId=${encodeURIComponent(talentId)}` : '';

    // sort
    requestURL += columnSortUrl(sortFilter);

    // apiCall;
    request(requestURL, data)
      .then(this.setReferralData)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setReferralData = response => {
    if (get(response, 'status')) {
      this.setReferralDataSuccess(response);
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  setReferralDataSuccess = response => {
    const { docs } = response.data;
    const totalDocs = get(response, 'data.totalDocs');
    const referralsData = [];
    docs.forEach(referralData => {
      const status = get(referralData, 'status', '');
      const referredOn = get(referralData, 'referredOn', '');
      const referralObj = {
        referrer: (
          <NameWithProfileIcon>
            <img
              src={`${get(referralData.referrer, 'profilePicture', '')}?_t=${new Date().getTime()}`}
              alt="user profile"
              onError={e => {
                e.target.onerror = null;
                e.target.src = userProfileIcon;
              }}
            />
            <span className="ms-1">
              {get(referralData.referrer, 'firstName')} {get(referralData.referrer, 'lastName')}
            </span>
          </NameWithProfileIcon>
        ),
        referral: (
          <>
            {get(referralData.referee, 'firstName') ? (
              <NameWithProfileIcon>
                <img
                  src={`${get(referralData.referee, 'profilePicture', '')}?_t=${new Date().getTime()}`}
                  alt="user profile"
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = userProfileIcon;
                  }}
                />
                <span className="ms-1">
                  {get(referralData.referee, 'firstName')} {get(referralData.referee, 'lastName')}
                </span>
              </NameWithProfileIcon>
            ) : (
              ''
            )}
          </>
        ),
        email: get(referralData, 'email', '-'),
        referredOn: referredOn ? moment(referredOn).format('DD/MM/YYYY') : '',
        daysOfRefereeActivated: get(referralData, 'daysOfRefereeActivated', '-'),
        daysOfRefereeVerified: get(referralData, 'daysOfRefereeVerified', '-'),
        daysOfRefereeHired: get(referralData, 'daysOfRefereeHired', '-'),
        status: <Badge className={`${getBadgeClass(status)} badge-sm`}>{status}</Badge>,
      };
      referralsData.push(referralObj);
    });
    this.setState({ totalDocs, paginationData: get(response, 'data', {}), referralsData, isListLoading: false });
  };

  handleSort = (column, sortDirection) => {
    const sortFilter = { column: column.selector, sortDirection };
    this.setState({ sortFilter }, () => {
      this.loadReferrals(1);
    });
  };

  handleStatusFilter = e => {
    this.setState({ statusFilter: e }, () => {
      this.loadReferrals(DEFAULT_PAGE_NO);
    });
  };

  handleTalentChange = talent => {
    const talentId = talent ? talent.value : '';
    const activeTalent = { ...talent, type: 'talent' };
    this.setState({ talentId, activeTalent }, () => {
      this.loadReferrals(DEFAULT_PAGE_NO);
    });
  };

  render() {
    const { referralsData, totalDocs, isListLoading, paginationData, statusFilter, talentOptions, activeTalent } = this.state;

    return (
      <>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <Content>
          <PrivateGrid>
            <div className="d-flex align-items-center mb-3">
              <H3>
                <FormattedMessage {...messages.allReferrals} />
              </H3>
              <Badge className="primary badge-sm ms-1 ">{totalDocs}</Badge>
            </div>
            <Card className="p-20">
              <Card className="input-sm d-flex table-header border-0 p-0">
                <div className="d-flex ms-auto">
                  <FormGroup className="mb-3 mb-lg-0 me-3">
                    <FormLabel className="p14 mb-0">Talent</FormLabel>
                    <Field
                      name="talentId"
                      type="text"
                      component={AsyncSelects}
                      defaultValue={activeTalent}
                      cacheOptions
                      loadOptions={this.loadTalentOptions}
                      defaultOptions={talentOptions}
                      handleChange={this.handleTalentChange}
                      placeHolder="Talent Name"
                    />
                  </FormGroup>
                  <FormGroup className="mb-3 mb-lg-0">
                    <FormLabel className="p14 mb-0">Status</FormLabel>
                    <Field
                      name="statusFilter"
                      type="text"
                      component={Selects}
                      defaultValue={statusFilter}
                      searchable={false}
                      options={referralFilter.map(item => ({
                        label: item.label,
                        value: item.value,
                      }))}
                      onChange={e => this.handleStatusFilter(e)}
                    />
                  </FormGroup>
                </div>
              </Card>
              <div>
                {isListLoading || totalDocs > 0 ? (
                  <>
                    <DataTable
                      noHeader
                      columns={referralTableColumns}
                      customStyles={newCustomStylesForGrid}
                      data={referralsData}
                      totalRows={0}
                      direction="ltr"
                      progressPending={isListLoading}
                      progressComponent={<ProgressComponent />}
                      paginationComponentOptions={{ noRowsPerPage: true }}
                      overflowY
                      overflowYOffset="160px"
                      noDataComponent={
                        <P className="p14 p-4 m-0" opacityVal="0.5">
                          {containerMessage.noRecord.defaultMessage}
                        </P>
                      }
                      sortServer
                      onSort={this.handleSort}
                    />
                    {paginationComponent(paginationData, DEFAULT_PAGE_SIZE, this.loadReferrals)}
                  </>
                ) : (
                  <ComingSoonBlock className="border-0 pb-0 mb-0">
                    <div className="inner-content">
                      <SVG src={filesIcon} />
                      <P className="p12 my-0">{containerMessage.noRecord.defaultMessage}</P>
                    </div>
                  </ComingSoonBlock>
                )}
              </div>
            </Card>
          </PrivateGrid>
        </Content>
      </>
    );
  }
}

Referrals.defaultProps = defaultProps;
Referrals.propTypes = propTypes;

export default compose(
  reduxForm({
    form: key,
    touchOnChange: true,
  }),
)(Referrals);
