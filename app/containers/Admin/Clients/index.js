/* eslint-disable react/destructuring-assignment */
/** Clients Page
 * This is the Clients page for admin, at the '/admin/clients' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { reduxForm, Field } from 'redux-form/immutable';
import { compose } from 'redux';
import { FormGroup, Row, Col } from 'reactstrap';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import DataTable from 'react-data-table-component';
import StorageService from 'utils/StorageService';
import Pagination from 'rc-pagination';
import { toast } from 'react-toastify';
import Selects from 'components/Selects';
import SVG from 'react-inlinesvg';
import Content from 'components/Content';
import { A } from 'components/A';
import { ToastifyMessage, Card, H4 } from 'components';
import { RadioButton } from 'utils/Fields';
import { TableSkeletonCol6 } from 'components/SkeletonLoader';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import { API_URL, LIST, CLIENT, customStyles, filterIcon } from 'containers/App/constants';
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
import { key, columns, DEFAULT_PAGE_NO, FILTER_KEYS, clientActionStatusArray } from './constants';
import messages from './messages';
import 'rc-pagination/assets/index.css';

export class Clients extends React.Component {
  constructor(props) {
    super(props);
    const search = StorageService.get('adminClientSearch') || '';
    this.state = {
      status: -1,
      clientList: [],
      paginationData: [],
      isListLoading: false,
      pageNum: DEFAULT_PAGE_NO,
      search,
    };
  }

  /**
   * call on open handleFiltersOpenModal popup
   * @author Innovify
   */
  handleFiltersOpenModal = () => {
    this.setState({ showFiltersModal: true });
  };

  /** call on close button click
   * @author Innovify
   */
  handleFiltersCloseModal = () => {
    this.setState({ showFiltersModal: false });
  };

  filterChanged = type => {
    const { filters } = this.state;

    if (type === 'update') {
      this.loadClientDetails(DEFAULT_PAGE_NO);
      this.setState({ showFiltersModal: false });
      StorageService.set('clientsFilterObject', JSON.stringify(filters));
    } else if (type === 'clear') {
      const emptyFilter = {
        status: -1,
      };
      this.setState({ showFiltersModal: false, status: -1 }, () => this.loadClientDetails(1));
      StorageService.set('clientsFilterObject', JSON.stringify(emptyFilter));
    }
  };

  componentDidMount() {
    const getPageNumber = StorageService.get('clientsPageNumber');
    const filterObjectGet = StorageService.get('clientsFilterObject');
    const updatedPageNumber = JSON.parse(getPageNumber) || 1;
    if (filterObjectGet) {
      this.setReservedFilter(updatedPageNumber);
    } else {
      this.loadClientDetails(updatedPageNumber);
    }
  }

  componentDidUpdate(prevProps) {
    const { popUpSaga } = this.props;
    if (prevProps.popUpSaga === true && popUpSaga === false) {
      this.loadClientDetails(DEFAULT_PAGE_NO);
    }
  }

  setReservedFilter = pageNumber => {
    const filterObjectGet = StorageService.get('clientsFilterObject');
    if (filterObjectGet) {
      const filterObject = JSON.parse(filterObjectGet) || {};
      const status = get(filterObject, 'status', 'all');
      this.setState({ status }, () => {
        this.loadClientDetails(pageNumber);
      });
    }
  };

  handleFilterChange = event => {
    const eventKey = event.target.name;
    const eventValue = parseInt(event.target.value, 10);
    const filterObj = { [eventKey]: eventValue };
    this.setState({ filters: filterObj, status: eventValue });
  };

  loadClientDetails = pageNum => {
    StorageService.set('clientsPageNumber', JSON.stringify(pageNum));
    this.setState({ isListLoading: true });
    const { search } = this.state;
    const data = { method: 'GET' };
    let requestURL = `${API_URL}${CLIENT}${LIST}?page=${pageNum}&q=${search}`;
    [FILTER_KEYS].forEach(filterKey => {
      const { [filterKey]: filterKeyName } = this.state;
      if (filterKeyName !== -1) {
        requestURL += `&${filterKey}=${encodeURIComponent(filterKeyName)}`;
      }
    });
    request(requestURL, data)
      .then(this.setClientDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setClientDetails = response => {
    if (get(response, 'status')) {
      const data = Object.assign({}, response.data);
      const array = [];
      const temp = response.data.page * response.data.limit - (response.data.limit - 1);
      data.docs.forEach((listData, index) => {
        const statusVal = clientActionStatusArray.find(obj => obj.label === listData.status).value;
        array.push({
          // eslint-disable-next-line no-underscore-dangle
          id: listData._id,
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
                  options={clientActionStatusArray
                    .filter(item => item.value !== -1 && item.value !== 0)
                    .map(item => ({
                      label: `${item.label}`,
                      value: item.value,
                    }))}
                  onChange={e => this.handleChangeStatus(listData.clientUserId, e)}
                />
              </SelectBox>
              <A
                // eslint-disable-next-line no-underscore-dangle
                href={`/admin/client-detail/${listData._id}`}
              >
                {containerMessage.btnView.defaultMessage}
              </A>
            </div>
          ),
        });
      });
      this.setState({ clientList: array, paginationData: response.data, isListLoading: false });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  handleChangeStatus = (clientID, selectedVal) => {
    const { onChangeStatus } = this.props;
    const data = { clientId: clientID, status: selectedVal.value };
    onChangeStatus(data);
  };

  debounceFn = debounce(value => this.handleSearchChange(value), 500);

  handleSearchChange = value => {
    StorageService.set('adminClientSearch', value);
    const { pageNum } = this.state;
    this.setState({ search: value });
    this.loadClientDetails(pageNum);
  };

  render() {
    const LinearIndeterminate = () => (
      <div className="w-100 flex-column d-flex">
        <TableSkeletonCol6 cardCount={5} />
      </div>
    );
    const { handleSubmit, loading, responseSuccess, responseError, invalid } = this.props;
    const { search, showFiltersModal, clientList, paginationData, isListLoading, status } = this.state;

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
          onDiscard={this.handleFiltersCloseModal}
          responseError={responseError}
          title={containerMessage.textFilter.defaultMessage}
          onHandleSubmit={handleSubmit(() => {
            this.filterChanged('update');
          })}
          onHandleClearFilter={() => {
            this.filterChanged('clear');
          }}
          otherActions
        >
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
        </PopupWrapper>
        <Content>
          <Card className="d-flex align-items-center justify-content-between table-header">
            <div className="d-flex align-items-center me-3">
              <H4 className="text-start my-0">
                <FormattedMessage {...messages.headerManageClient} />
              </H4>
            </div>
            <div className="d-flex align-items-center">
              <SearchComponent
                handleSearchChange={this.debounceFn}
                placeholder={containerMessage.searchPlaceholder.defaultMessage}
                initialValue={search}
              />
              <FilterButton type="button" onClick={this.handleFiltersOpenModal}>
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
              customStyles={customStyles}
              data={clientList}
              totalRows={0}
              direction="ltr"
              progressPending={isListLoading}
              progressComponent={<LinearIndeterminate />}
              paginationComponentOptions={{ noRowsPerPage: true }}
              overflowY
              overflowYOffset="70px"
              noDataComponent={<p className="p-4 m-0 text-muted">{containerMessage.noRecord.defaultMessage}</p>}
            />
          </Card>
          {paginationData.totalDocs > 20 ? (
            <Pagination
              total={paginationData.totalDocs}
              className="ant-pagination"
              current={paginationData.page}
              defaultPageSize={paginationData.limit}
              onChange={this.loadClientDetails}
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

Clients.propTypes = propTypes;
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
)(Clients);
