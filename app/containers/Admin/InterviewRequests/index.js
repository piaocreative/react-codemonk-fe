/** Interview Requests Page
 * This is the Interview Requests page for admin, at the '/admin/interviews' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { FormGroup, Row, Col } from 'reactstrap';
import moment from 'moment';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import SVG from 'react-inlinesvg';
import DataTable from 'react-data-table-component';
import StorageService from 'utils/StorageService';
import Pagination from 'rc-pagination';
import { toast } from 'react-toastify';
import Selects from 'components/Selects';
import Content from 'components/Content';
import { H4, ToastifyMessage, Card, A } from 'components';
import { RadioButton } from 'utils/Fields';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import { API_URL, ADMIN, INTERVIEWS, filterIcon, customStyles } from 'containers/App/constants';
import { textItemRender } from 'containers/TalentListingPage/utils';
import containerMessage from 'containers/messages';
import { localeInfo } from 'containers/TalentListingPage/constants';
import { SelectBox } from 'containers/Admin/Projects/styles';
import PopupWrapper from 'containers/MyProfilePage/PopupWrapper';
import { FilterButton } from 'containers/Talent/Briefs/styles';
import SearchComponent from 'components/SearchComponent';
import * as actions from './actions';
import saga from './saga';
import { key, projectStatusArray, columns, DEFAULT_PAGE_NO, FILTER_KEYS, LinearIndeterminate } from './constants';
import { propTypes } from './proptypes';
import messages from './messages';
import 'rc-pagination/assets/index.css';

export class InterviewRequests extends React.Component {
  constructor(props) {
    super(props);

    const search = StorageService.get('adminInterviewSearch') || '';
    this.state = {
      status: 0,
      projectList: [],
      paginationData: [],
      isListLoading: false,
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
      this.loadInterviewDetails(DEFAULT_PAGE_NO);
      this.setState({ showFiltersModal: false });
      StorageService.set('interviewFilterObject', JSON.stringify(filters));
    } else if (type === 'clear') {
      const emptyFilter = {
        status: -1,
      };
      this.setState({ showFiltersModal: false, status: -1 }, () => this.loadInterviewDetails(1));
      StorageService.set('interviewFilterObject', JSON.stringify(emptyFilter));
    }
  };

  componentDidMount() {
    const getPageNumber = StorageService.get('interviewPageNumber');
    const filterObjectGet = StorageService.get('interviewFilterObject');
    const updatedPageNumber = JSON.parse(getPageNumber) || 1;
    if (filterObjectGet) {
      this.setReservedFilter(updatedPageNumber);
    } else {
      this.loadInterviewDetails(updatedPageNumber);
    }
  }

  handleFilterChange = event => {
    const eventKey = event.target.name;
    const eventValue = parseInt(event.target.value, 10);
    const filterObj = { [eventKey]: eventValue };
    this.setState({ filters: filterObj, status: eventValue });
  };

  setReservedFilter = pageNumber => {
    const filterObjectGet = StorageService.get('interviewFilterObject');
    if (filterObjectGet) {
      const filterObject = JSON.parse(filterObjectGet) || {};
      const status = get(filterObject, 'status', 'all');
      this.setState({ status }, () => {
        this.loadInterviewDetails(pageNumber);
      });
    }
  };

  loadInterviewDetails = pageNum => {
    StorageService.set('interviewPageNumber', JSON.stringify(pageNum));
    this.setState({ isListLoading: true });
    const data = { method: 'GET' };
    const { search } = this.state;
    let requestURL = `${API_URL}${ADMIN}${INTERVIEWS}?page=${pageNum}`;
    requestURL += search ? `&q=${search}` : '';
    [FILTER_KEYS].forEach(filterKey => {
      const { [filterKey]: filterKeyName } = this.state;
      if (filterKeyName !== -1) {
        requestURL += `&${filterKey}=${encodeURIComponent(filterKeyName)}`;
      }
    });
    request(requestURL, data)
      .then(this.setInterviewDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setInterviewDetails = response => {
    if (get(response, 'status')) {
      const data = Object.assign({}, response.data);
      const array = [];
      const temp = response.data.page * response.data.limit - (response.data.limit - 1);
      data.docs.forEach((listData, index) => {
        const id = get(listData, '_id');
        const talentName = (
          <A href={`/admin/talent-profile/${get(listData, 'talentId')}`} target="_blank">
            {get(listData, 'talentName')}
          </A>
        );
        const clientName = (
          <A href={`/admin/client-detail/${get(listData, 'clientId')}`} target="_blank">
            {get(listData, 'clientName')}
          </A>
        );
        const name = (
          <A href={`/admin/project-detail/${get(listData, 'projectId')}`} target="_blank">
            {get(listData, 'name')}
          </A>
        );
        const statusVal = projectStatusArray.find(obj => obj.label === listData.status).value;
        array.push({
          id,
          number: temp + index,
          dateRequested: listData.dateRequested && moment(listData.dateRequested).format('DD/MM/YYYY'),
          clientName,
          companyName: listData.companyName,
          name,
          talentName,
          status: (
            <SelectBox className="input-sm small-arrow">
              <Field
                name="status"
                type="text"
                component={Selects}
                defaultValue={{ label: listData.status, value: statusVal }}
                searchable={false}
                options={projectStatusArray
                  .filter(item => item.value !== -1)
                  .map(item => ({
                    label: `${item.label}`,
                    value: item.value,
                  }))}
                onChange={e => this.handleChangeStatus(id, e)}
              />
            </SelectBox>
          ),
          action: <A href={`/admin/interview-detail/${id}`}>{messages.btnView.defaultMessage}</A>,
        });
      });
      this.setState({ projectList: array, paginationData: response.data, isListLoading: false });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  handleChangeStatus = (interviewId, selectedVal) => {
    const { onChangeStatus } = this.props;
    const data = { interviewId, status: selectedVal.value };
    onChangeStatus(data);
  };

  handleInterviewSearchChange = value => {
    StorageService.set('adminInterviewSearch', value);
    this.setState({ search: value }, () => {
      this.loadInterviewDetails(1);
    });
  };

  interviewDebounceFn = debounce(value => this.handleInterviewSearchChange(value), 500);

  render() {
    const { handleSubmit, loading, responseSuccess, responseError, invalid } = this.props;
    const { projectList, paginationData, isListLoading, status, showFiltersModal, search } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <Content>
          <Card className="d-flex align-items-center justify-content-between table-header">
            <div className="d-flex align-items-center me-3">
              <H4 className="text-start my-0">
                <FormattedMessage {...messages.headerManageInterviewRequest} />
              </H4>
            </div>
            <div className="d-flex align-items-center">
              <SearchComponent
                handleSearchChange={this.interviewDebounceFn}
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
              data={projectList}
              totalRows={0}
              direction="ltr"
              progressPending={isListLoading}
              progressComponent={<LinearIndeterminate />}
              paginationComponentOptions={{ noRowsPerPage: true }}
              overflowY
              overflowYOffset="100px"
              noDataComponent={<p className="p-4 m-0">{messages.noRecord.defaultMessage}</p>}
            />
          </Card>
          {paginationData.totalDocs > 20 ? (
            <Pagination
              total={paginationData.totalDocs}
              className="ant-pagination"
              current={paginationData.page}
              defaultPageSize={paginationData.limit}
              onChange={this.loadInterviewDetails}
              itemRender={textItemRender}
              locale={localeInfo}
            />
          ) : (
            ''
          )}
        </Content>
        <PopupWrapper
          modalId="showFiltersModal"
          loading={loading}
          responseSuccess={responseSuccess}
          responseError={responseError}
          disabled={invalid}
          isOpen={showFiltersModal}
          modalType="filter"
          otherActions
          onDiscard={this.handleFiltersCloseModal}
          onHandleSubmit={handleSubmit(() => {
            this.filterChanged('update');
          })}
          onHandleClearFilter={() => {
            this.filterChanged('clear');
          }}
          title={containerMessage.textFilter.defaultMessage}
        >
          <Row>
            <Col md="6">
              <H4 className="input-sm mt-0">{messages.titleStatus.defaultMessage}</H4>
              <FormGroup className="input-sm">
                {projectStatusArray.map(item => (
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
      </React.Fragment>
    );
  }
}

InterviewRequests.propTypes = propTypes;

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
)(InterviewRequests);
