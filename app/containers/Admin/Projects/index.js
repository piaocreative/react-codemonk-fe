/* eslint-disable import/named */
/* eslint-disable react/destructuring-assignment */
/** Projects Page
 * This is the Projects page for admin, at the '/admin/projects' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { reduxForm, Field } from 'redux-form/immutable';
import { compose } from 'redux';
import { FormGroup, Row, Col, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import SVG from 'react-inlinesvg';
import get from 'lodash/get';
import DataTable from 'react-data-table-component';
import StorageService from 'utils/StorageService';
import Pagination from 'rc-pagination';
import { toast } from 'react-toastify';
import Selects from 'components/Selects';
import Content from 'components/Content';
import { A } from 'components/A';
import { ToastifyMessage, H4, Card } from 'components';
import { renderCheckBox } from 'utils/Fields';
import debounce from 'lodash/debounce';
import containerMessage from 'containers/messages';
import { TableSkeletonCol6 } from 'components/SkeletonLoader';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import { sortingIcon, API_URL, LIST, PROJECT_API, customStyles, filterIcon } from 'containers/App/constants';
import { textItemRender } from 'containers/TalentListingPage/utils';
import { localeInfo } from 'containers/TalentListingPage/constants';
import { makeSelectLoading, makeSelectSuccess, makeSelectError, makeSelectPopUpSaga } from 'containers/App/selectors';
import { FilterButton } from 'containers/Talent/Briefs/styles';
import { projectStatusArray } from 'containers/constants';
import SearchComponent from 'components/SearchComponent';
import PopupWrapper from 'containers/MyProfilePage/PopupWrapper';
import { propTypes } from 'containers/proptypes';
import * as actions from './actions';
import saga from './saga';
import { key, adminProjectsColumns, DEFAULT_PAGE_NO, FILTER_KEYS } from './constants';
import AddProject from './AddProject';
import { SelectBox, SortDropdown } from './styles';
import messages from './messages';
import 'rc-pagination/assets/index.css';

export class Projects extends React.Component {
  constructor(props) {
    super(props);
    const search = StorageService.get('adminProjectSearch') || '';
    this.state = {
      status: [-1],
      projectList: [],
      paginationData: [],
      isListLoading: false,
      showFiltersModal: false,
      dropdownOpen: false,
      search,
      pageNum: DEFAULT_PAGE_NO,
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

  /**
   * call toggle on tab change
   * @author Innovify
   */
  dropdownToggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  filterChanged = type => {
    const { filters } = this.state;

    if (type === 'update') {
      this.loadProjectDetails(DEFAULT_PAGE_NO);
      this.setState({ showFiltersModal: false });
      StorageService.set('projectFilterObject', JSON.stringify(filters));
    } else if (type === 'clear') {
      const emptyFilter = {
        status: [-1],
      };
      this.setState({ showFiltersModal: false, status: [-1] }, () => this.loadProjectDetails(1));
      StorageService.set('projectFilterObject', JSON.stringify(emptyFilter));
    }
  };

  componentDidMount() {
    const getPageNumber = StorageService.get('projectPageNumber');
    const filterObjectGet = StorageService.get('projectFilterObject');
    const updatedPageNumber = JSON.parse(getPageNumber) || 1;
    if (filterObjectGet) {
      this.setReservedFilter(updatedPageNumber);
    } else {
      this.loadProjectDetails(updatedPageNumber);
    }
  }

  componentDidUpdate(prevProps) {
    const { popUpSaga } = this.props;
    if (prevProps.popUpSaga === true && popUpSaga === false) {
      this.loadProjectDetails(DEFAULT_PAGE_NO);
    }
  }

  handleStatusChange = (event, eventKey) => {
    const { status } = this.state;
    const isChecked = event.target.checked;
    const item = Number(event.target.name);
    let updatedStatus = Array.from(status);
    if (updatedStatus.includes(item) && !isChecked) {
      updatedStatus = updatedStatus.filter(e => e !== item);
    } else {
      updatedStatus.push(item);
      if (item === -1) {
        updatedStatus = [-1];
      } else {
        updatedStatus = updatedStatus.filter(value => value !== -1);
      }
    }
    const filterObj = { [eventKey]: updatedStatus };
    this.setState({ filters: filterObj, status: updatedStatus });
  };

  setReservedFilter = pageNumber => {
    const filterObjectGet = StorageService.get('projectFilterObject');
    if (filterObjectGet) {
      const filterObject = JSON.parse(filterObjectGet) || {};
      const status = get(filterObject, 'status', 'all');
      this.setState({ status }, () => {
        this.loadProjectDetails(pageNumber);
      });
    }
  };

  loadProjectDetails = pageNum => {
    StorageService.set('projectPageNumber', JSON.stringify(pageNum));
    this.setState({
      isListLoading: true,
    });
    const { search } = this.state;
    const data = { method: 'GET' };
    let requestURL = `${API_URL}${PROJECT_API}${LIST}?page=${pageNum}&q=${search}`;
    [FILTER_KEYS].forEach(filterKey => {
      const { [filterKey]: filterKeyName } = this.state;
      if (filterKeyName !== -1) {
        requestURL += `&${filterKey}=${encodeURIComponent(filterKeyName)}`;
      }
    });
    request(requestURL, data)
      .then(this.setProjectDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setProjectDetails = response => {
    if (get(response, 'status')) {
      const data = Object.assign({}, response.data);
      const array = [];
      const temp = response.data.page * response.data.limit - (response.data.limit - 1);

      data.docs.forEach((listData, index) => {
        const id = get(listData, '_id');
        const statusVal = projectStatusArray.find(obj => obj.label === listData.status).value;
        const clientName = (
          <A href={`/admin/client-detail/${get(listData, 'clientId')}`} target="_blank">
            {get(listData, 'clientName')}
          </A>
        );

        array.push({
          id,
          number: temp + index,
          name: listData.name,
          clientName,
          companyName: listData.companyName,
          startDate: listData.startDate && moment(listData.startDate).format('DD/MM/YYYY'),
          endDate: listData.endDate && moment(listData.endDate).format('DD/MM/YYYY'),
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
          action: <A href={`/admin/project-detail/${id}`}>{messages.btnView.defaultMessage}</A>,
        });
      });
      this.setState({ projectList: array, paginationData: response.data, isListLoading: false });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  handleChangeStatus = (projectID, selectedVal) => {
    const { onChangeStatus } = this.props;
    const data = { projectId: projectID, status: selectedVal.value };
    onChangeStatus(data);
  };

  handleSearchChange = value => {
    StorageService.set('adminProjectSearch', value);
    const { pageNum } = this.state;
    this.setState({ search: value });
    this.loadProjectDetails(pageNum);
  };

  debounceFn = debounce(value => this.handleSearchChange(value), 500);

  render() {
    const { handleSubmit, loading, responseSuccess, responseError, invalid } = this.props;
    const { dropdownOpen, projectList, paginationData, isListLoading, status, showFiltersModal, search } = this.state;

    const LinearIndeterminate = () => (
      <div className="w-100 flex-column d-flex">
        <TableSkeletonCol6 cardCount={7} />
      </div>
    );

    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <Content className="mb-5">
          <Card className="d-flex align-items-center justify-content-between table-header">
            <div className="d-flex align-items-center me-3">
              <H4 className="text-start my-0">
                <FormattedMessage {...messages.headerManageProject} />
              </H4>
              <AddProject
                btnTitle={containerMessage.addNew.defaultMessage}
                btnClassName="btn-outline btn-plus ms-md-3 top-0 btn btn-sm"
                withAddIcon
                {...this.props}
                loadProjectDetails={this.loadProjectDetails}
              />
            </div>
            <div className="d-flex align-items-center">
              <SortDropdown className="d-none" isOpen={dropdownOpen} toggle={this.dropdownToggle}>
                <DropdownToggle>
                  <SVG src={sortingIcon} />
                  Sort
                </DropdownToggle>
                <DropdownMenu left>
                  <DropdownItem className="active">None</DropdownItem>
                  <DropdownItem>Due Date</DropdownItem>
                  <DropdownItem>This month</DropdownItem>
                </DropdownMenu>
              </SortDropdown>
              <SearchComponent
                handleSearchChange={this.debounceFn}
                placeholder={containerMessage.searchPlaceholder.defaultMessage}
                initialValue={search}
              />
              <FilterButton type="button" onClick={this.handleFiltersOpenModal}>
                <SVG src={filterIcon} />
                {containerMessage.textFilter.defaultMessage}
                <span className="count">{status.includes(-1) ? '0' : '1'}</span>
              </FilterButton>
            </div>
          </Card>
          <hr className="m-0" />
          <Card className="p-0">
            <DataTable
              noHeader
              columns={adminProjectsColumns}
              customStyles={customStyles}
              data={projectList}
              totalRows={0}
              direction="ltr"
              progressPending={isListLoading}
              progressComponent={<LinearIndeterminate />}
              paginationComponentOptions={{ noRowsPerPage: true }}
              overflowY
              overflowYOffset="270px"
              noDataComponent={<p className="p-4 m-0 text-muted">{messages.noRecord.defaultMessage}</p>}
            />
          </Card>
          {paginationData.totalDocs > 20 ? (
            <Pagination
              total={paginationData.totalDocs}
              className="ant-pagination"
              current={paginationData.page}
              defaultPageSize={paginationData.limit}
              onChange={this.loadProjectDetails}
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
                    type="checkbox"
                    name={item.value}
                    component={renderCheckBox}
                    label={item.label}
                    checked={status.includes(item.value)}
                    onChange={e => this.handleStatusChange(e, 'status')}
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

Projects.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
  popUpSaga: makeSelectPopUpSaga(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeStatus: (data, onSuccess) => dispatch(actions.changeStatus(data, onSuccess)),
  };
}

const withConnect = connect(
  mapStateToProps,
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
)(Projects);
