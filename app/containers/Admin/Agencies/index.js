/** Agencies Page
 * This is the Agencies page for admin, at the '/admin/agencies' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { reduxForm, Field } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { FormGroup, Row, Col } from 'reactstrap';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import DataTable from 'react-data-table-component';
import Pagination from 'rc-pagination';
import { toast } from 'react-toastify';
import SVG from 'react-inlinesvg';
import StorageService from 'utils/StorageService';
import Selects from 'components/Selects';
import Content from 'components/Content';
import { A } from 'components/A';
import { ToastifyMessage, Card, H4 } from 'components';
import { RadioButton } from 'utils/Fields';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import { API_URL, LIST, AGENCY, customStyles, filterIcon } from 'containers/App/constants';
import { textItemRender } from 'containers/TalentListingPage/utils';
import SearchComponent from 'components/SearchComponent';
import { localeInfo } from 'containers/TalentListingPage/constants';
import { SelectBox } from 'containers/Admin/Projects/styles';
import { clientStatusArray } from 'containers/constants';
import { propTypes } from 'containers/proptypes';
import containerMessage from 'containers/messages';
import { FilterButton } from 'containers/Talent/Briefs/styles';
import PopupWrapper from 'containers/MyProfilePage/PopupWrapper';
import * as actions from './actions';
import saga from './saga';
import { key, columns, DEFAULT_PAGE_NO, FILTER_KEYS, agencyActionStatusArray, LinearIndeterminate } from './constants';
import messages from './messages';
import 'rc-pagination/assets/index.css';

export class Agencies extends React.Component {
  constructor(props) {
    super(props);
    const search = StorageService.get('adminAgencySearch') || '';
    this.state = {
      status: -1,
      agencyList: [],
      paginationData: [],
      isListLoading: false,
      pageNum: DEFAULT_PAGE_NO,
      search,
    };
  }

  agencyFiltersOpenModal = () => {
    this.setState({ showFiltersModal: true });
  };

  agencyFiltersCloseModal = () => {
    this.setState({ showFiltersModal: false });
  };

  agencyFilterChanged = type => {
    const { filters } = this.state;

    if (type === 'update') {
      this.loadAgencyDetails(DEFAULT_PAGE_NO);
      this.setState({ showFiltersModal: false });
      StorageService.set('adminAgencyFilterObject', JSON.stringify(filters));
    } else if (type === 'clear') {
      const emptyFilter = {
        status: -1,
      };
      this.setState({ showFiltersModal: false, status: -1 }, () => this.loadAgencyDetails(1));
      StorageService.set('adminAgencyFilterObject', JSON.stringify(emptyFilter));
    }
  };

  componentDidMount() {
    const getPageNumber = StorageService.get('adminAgencyPageNumber');
    const filterObjectGet = StorageService.get('adminAgencyFilterObject');
    const updatedPageNumber = JSON.parse(getPageNumber) || 1;
    if (filterObjectGet) {
      this.setReservedFilter(updatedPageNumber);
    } else {
      this.loadAgencyDetails(updatedPageNumber);
    }
  }

  setReservedFilter = pageNumber => {
    const filterObjectGet = StorageService.get('adminAgencyFilterObject');
    if (filterObjectGet) {
      const filterObject = JSON.parse(filterObjectGet) || {};
      const status = get(filterObject, 'status', 'all');
      this.setState({ status }, () => {
        this.loadAgencyDetails(pageNumber);
      });
    }
  };

  handleFilterChange = event => {
    const eventKey = event.target.name;
    const eventValue = parseInt(event.target.value, 10);
    const filterObj = { [eventKey]: eventValue };
    this.setState({ filters: filterObj, status: eventValue });
  };

  loadAgencyDetails = pageNum => {
    StorageService.set('adminAgencyPageNumber', JSON.stringify(pageNum));
    this.setState({ isListLoading: true });
    const { search } = this.state;
    const data = { method: 'GET' };
    let requestURL = `${API_URL}${AGENCY}${LIST}?page=${pageNum}&q=${search}`;
    [FILTER_KEYS].forEach(filterKey => {
      const { [filterKey]: filterKeyName } = this.state;
      if (filterKeyName !== -1) {
        requestURL += `&${filterKey}=${encodeURIComponent(filterKeyName)}`;
      }
    });
    request(requestURL, data)
      .then(this.setAdminAgencyListingDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setAdminAgencyListingDetails = response => {
    if (get(response, 'status')) {
      const data = Object.assign({}, response.data);
      const array = [];
      const temp = response.data.page * response.data.limit - (response.data.limit - 1);
      data.docs.forEach((listData, index) => {
        const statusVal = agencyActionStatusArray.find(obj => obj.label === listData.status).value;
        const agencyId = get(listData, '_id');
        const agencyUserId = get(listData, 'agencyUserId');
        array.push({
          id: agencyId,
          number: temp + index,
          name: listData.name,
          compnayName: listData.companyName,
          email: listData.email,
          status: listData.status,
          action: (
            <div className="d-flex align-items-center">
              <SelectBox className="input-sm small-arrow me-3">
                <Field
                  name="status"
                  type="text"
                  component={Selects}
                  defaultValue={{
                    label: listData.status === 'Unregistered' ? 'Active' : listData.status,
                    value: statusVal === 0 ? 1 : statusVal,
                  }}
                  searchable={false}
                  options={agencyActionStatusArray
                    .filter(item => item.value !== -1 && item.value !== 0)
                    .map(item => ({
                      label: `${item.label}`,
                      value: item.value,
                    }))}
                  onChange={e => this.handleAgencyStatusChange(agencyUserId, e)}
                />
              </SelectBox>
              <A href={`/admin/agency-detail/${agencyId}`}>{containerMessage.btnView.defaultMessage}</A>
            </div>
          ),
        });
      });
      this.setState({ agencyList: array, paginationData: response.data, isListLoading: false });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  handleAgencyStatusChange = (agencyID, selectedVal) => {
    const { onChangeAgencyStatus } = this.props;
    const { pageNum } = this.state;
    const data = { agencyId: agencyID, status: selectedVal.value };
    onChangeAgencyStatus(data, () => this.loadAgencyDetails(pageNum));
  };

  debounceFn = debounce(value => this.handleSearchChange(value), 500);

  handleSearchChange = value => {
    StorageService.set('adminAgencySearch', value);
    const { pageNum } = this.state;
    this.setState({ search: value });
    this.loadAgencyDetails(pageNum);
  };

  agencyFilterPopupRow = status => (
    <Row>
      <Col md="6">
        <H4 className="input-sm mt-0">{containerMessage.filterStatus.defaultMessage}</H4>
        <FormGroup className="input-sm">
          {clientStatusArray.map(item => (
            <Field
              name="status"
              defaultValue={item.value}
              value={item.value}
              component={RadioButton}
              label={item.label}
              className="radio-sm"
              checked={Number(status) === item.value}
              onChangeRadio={e => this.handleFilterChange(e)}
            />
          ))}
        </FormGroup>
      </Col>
    </Row>
  );

  render() {
    const { handleSubmit, loading, responseSuccess, responseError, invalid } = this.props;
    const { search, showFiltersModal, agencyList, paginationData, isListLoading, status } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <PopupWrapper
          responseSuccess={responseSuccess}
          modalId="showFiltersModal"
          loading={loading}
          isOpen={showFiltersModal}
          disabled={invalid}
          modalType="filter"
          onDiscard={this.agencyFiltersCloseModal}
          responseError={responseError}
          title={containerMessage.textFilter.defaultMessage}
          onHandleSubmit={handleSubmit(() => {
            this.agencyFilterChanged('update');
          })}
          onHandleClearFilter={() => {
            this.agencyFilterChanged('clear');
          }}
          otherActions
        >
          {this.agencyFilterPopupRow(status)}
        </PopupWrapper>
        <Content>
          <Card className="d-flex align-items-center justify-content-between table-header">
            <div className="d-flex align-items-center me-3">
              <H4 className="text-start my-0">
                <FormattedMessage {...messages.headerAgency} />
              </H4>
            </div>
            <div className="d-flex align-items-center">
              <SearchComponent
                handleSearchChange={this.debounceFn}
                placeholder={containerMessage.searchPlaceholder.defaultMessage}
                initialValue={search}
              />
              <FilterButton type="button" onClick={this.agencyFiltersOpenModal}>
                <SVG src={filterIcon} />
                {containerMessage.textFilter.defaultMessage}
                <span className="count">{status === -1 ? '0' : '1'}</span>
              </FilterButton>
            </div>
          </Card>
          <hr className="m-0" />
          <Card className="p-0">
            <DataTable
              noHeader
              columns={columns}
              data={agencyList}
              totalRows={0}
              customStyles={customStyles}
              direction="ltr"
              progressPending={isListLoading}
              progressComponent={<LinearIndeterminate />}
              paginationComponentOptions={{ noRowsPerPage: true }}
              noDataComponent={<p className="p-4 m-0 text-muted">{containerMessage.noRecord.defaultMessage}</p>}
              overflowY
              overflowYOffset="70px"
            />
          </Card>
          {paginationData.totalDocs > 20 ? (
            <Pagination
              total={paginationData.totalDocs}
              className="ant-pagination"
              current={paginationData.page}
              defaultPageSize={paginationData.limit}
              onChange={this.loadAgencyDetails}
              itemRender={textItemRender}
              locale={localeInfo}
            />
          ) : (
            ''
          )}
        </Content>
      </React.Fragment>
    );
  }
}

Agencies.propTypes = propTypes;
export function mapDispatchToProps(dispatch) {
  return {
    onChangeAgencyStatus: (data, onSuccess) => dispatch(actions.changeAgencyStatus(data, onSuccess)),
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
)(Agencies);
