/** TimesheetListing
 */
import React from 'react';
import { compose } from 'redux';
import SVG from 'react-inlinesvg';
import { toast } from 'react-toastify';
import moment from 'moment';
import get from 'lodash/get';
import DataTable from 'react-data-table-component';
import request from 'utils/request';
import Emitter from 'utils/emitter';
import StorageService from 'utils/StorageService';
import { VALIDATION } from 'utils/constants';
import { ComingSoonBlock } from 'components/ComingSoon/styles';
import Selects from 'components/Selects';
import { reduxForm, Field } from 'redux-form/immutable';
import { DEFAULT_PAGE_SIZE } from 'containers/constants';
import {
  API_URL,
  VERSION2,
  TIMESHEET,
  DOWNLOAD,
  BILL,
  currencyData,
  newCustomStylesForGrid,
  filesIcon,
  paperDownloadIcon,
} from 'containers/App/constants';
import { WeekList } from 'containers/Agency/MyTeam/styles';
import containerMessage from 'containers/messages';
import { SelectBox } from 'containers/Admin/Projects/styles';
import { defaultProps, propTypes } from 'containers/proptypes';
import { getLabel, getCurrencySymbol } from 'containers/MyProfilePage/components/utils';
import { Badge, ToastifyMessage, A, P } from 'components';
import { paginationComponent, getBadgeClass } from 'containers/App/utils';
import AddTimesheet from 'containers/Timesheets/AddTimesheet';
import { weekDays } from 'containers/Timesheets/AddTimesheet/constants';
import { getDayWorkClass, sortUrl, timesheetFilter, getShortName } from 'containers/Timesheets/utils';
import { key, timesheetStatus, ProgressComponent, clientActions, adminActions, filetype } from 'containers/Timesheets/constants';

export class TimesheetListing extends React.Component {
  constructor(props) {
    super(props);

    const getPageNumber = StorageService.get('timesheetPage');
    const updatedPageNumber = JSON.parse(getPageNumber) || 1;
    const userType = StorageService.get('userType');
    const registerType = StorageService.get('registerType');
    this.state = {
      pageNum: updatedPageNumber,
      isListLoading: false,
      sortFilter: { column: '', sortDirection: '' },
      userType,
      registerType,
      gridData: {},
    };
  }

  componentDidMount() {
    const { pageNum } = this.state;
    Emitter.on('timesheetAdded', timesheetAdded => {
      if (timesheetAdded) {
        const id = get(timesheetAdded, 'id', null);
        if (id) {
          const status = get(timesheetAdded, 'status', null);
          this.updateDataGrid(id, status);
        } else {
          this.loadTimesheets(1);
        }
      }
    });
    this.loadTimesheets(pageNum);
  }

  componentWillUnmount() {
    Emitter.off('timesheetAdded');
  }

  componentDidUpdate(prevProps) {
    const { search, statusFilter, weekStart, projectId, talentId } = this.props;
    if (
      search !== prevProps.search ||
      statusFilter !== prevProps.statusFilter ||
      weekStart !== prevProps.weekStart ||
      projectId !== prevProps.projectId ||
      talentId !== prevProps.talentId
    ) {
      this.loadTimesheets(1);
    }
  }

  loadTimesheets = pageNum => {
    const { weekStart, projectId, talentId, search, statusFilter, isClientDashboard } = this.props;
    const { sortFilter } = this.state;
    StorageService.set('timesheetPage', JSON.stringify(pageNum));
    this.setState({ isListLoading: true, pageNum });

    const status = get(statusFilter, 'value', -1);

    const data = { method: 'GET' };
    let requestURL = '';

    if (isClientDashboard) {
      requestURL = `${API_URL}${VERSION2}${TIMESHEET}?limit=5`;
      requestURL += sortUrl({ column: 'weekStart', sortDirection: 'desc' });
    } else {
      requestURL = `${API_URL}${VERSION2}${TIMESHEET}?page=${pageNum}&limit=${DEFAULT_PAGE_SIZE}`;
      requestURL += sortUrl(sortFilter);
    }

    // statusFilter
    requestURL += status !== -1 ? `&status=${encodeURIComponent(status)}` : '';

    // search
    requestURL += search ? `&q=${encodeURIComponent(search)}` : '';

    // weekStart
    requestURL += weekStart ? `&weekStart=${encodeURIComponent(weekStart)}` : '';

    // projectId
    requestURL += projectId ? `&projectId=${encodeURIComponent(projectId)}` : '';

    // talentId
    requestURL += talentId ? `&talentId=${encodeURIComponent(talentId)}` : '';

    // apiCall;
    request(requestURL, data)
      .then(this.setTimesheetData)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setTimesheetData = response => {
    if (get(response, 'status')) {
      this.setState({
        gridData: response,
      });
      this.setTimesheetDataSuccess(response);
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  setTimesheetDataSuccess = response => {
    const { projectId, projectDetailsPage = false } = this.props;
    const { userType, registerType } = this.state;

    const { docs } = response.data;
    const totalDocs = get(response, 'data.totalDocs');
    const timesheetData = [];
    docs.forEach(timesheet => {
      const id = get(timesheet, '_id');
      const week = get(timesheet, 'week', []);
      const getWeekStart = get(timesheet, 'dateStart');
      const weekStart = moment(getWeekStart).format('DD/MM/YYYY');

      const getWeekDays = get(timesheet, 'week', []);
      const days = (
        <WeekList className="no-action">
          {getWeekDays.map((day, i) => (
            <li className={getDayWorkClass(day.day)}>{weekDays[i]}</li>
          ))}
        </WeekList>
      );

      const statusValue = get(timesheet, 'status');
      const status = getLabel(get(timesheet, 'status'), timesheetStatus, 'label');
      const action =
        status === 'Draft' ? (
          <AddTimesheet type="edit" id={id} dateStart={getWeekStart} week={week} loadDetails={() => this.loadTimesheets(1)} />
        ) : (
          <Badge className={`${getBadgeClass(status)} badge-sm`}>{status}</Badge>
        );

      // clientData
      const timesheetId = get(timesheet, 'id');
      const talentId = get(timesheet, 'talentId');
      const talentShortName = get(timesheet, 'talentShortName');
      const profilePicture = get(timesheet, 'profilePicture', '');
      const clientName = get(timesheet, 'clientName');

      const currencySymbol = getCurrencySymbol(currencyData, 'code', get(timesheet, 'currency'));
      const currency = currencySymbol || '';
      const commission = get(timesheet, 'commission');
      const cost = get(timesheet, 'cost');
      const talentOptions = { label: talentShortName, value: talentId };

      const userBillingDetailsObj = {
        currency: get(timesheet, 'currency', ''),
        ratePerHour: get(timesheet, 'ratePerHour', ''),
      };
      const timesheetObj = {
        id,
        weekStart,
        project: get(timesheet, 'projectName', ''),
        days,
        hours: (
          <div className="text-uppercase">
            {get(timesheet, 'times', '')
              .split(' ')
              .slice(1) /* First char is always space, removing extra space */
              .join(':')}
          </div>
        ),
        earnings: `${currency}${Number(get(timesheet, 'earning', '')).toFixed(2)}`,
        invoice: timesheet.billNumber ? (
          <div className="d-flex">
            <A
              href={get(timesheet, 'invoiceUrl')}
              className="btn-link pdf-icon cursor-pointer"
              download
              disabled={!get(timesheet, 'generatedBill', '')}
              onClick={() => {
                this.handlePdfClick(id);
              }}
            >
              <SVG src={paperDownloadIcon} />
            </A>
            <P className="p16 m-1" title={`${get(timesheet, 'billNumber', '')}.${filetype}`}>{`${get(
              timesheet,
              'billNumber',
              '',
            )}.${filetype}`}</P>
          </div>
        ) : (
          '-'
        ),
        action,
      };

      timesheetObj.talentShortName =
        userType !== '1' ? getShortName(projectDetailsPage, userType, projectId, talentId, talentShortName, profilePicture) : '';

      if (userType === '1' && registerType === 'agency') {
        delete timesheetObj.earnings;
        delete timesheetObj.invoice;
      } else if (userType === '2') {
        const clientAction =
          status === 'Submitted' ? this.renderClientAction(id) : <Badge className={`${getBadgeClass(status)} badge-sm`}>{status}</Badge>;

        timesheetObj.timesheetId = timesheetId;
        timesheetObj.action = clientAction;

        timesheetObj.cost = `${currency}${cost}`;
      } else if (userType === '4') {
        timesheetObj.timesheetId = timesheetId;
        timesheetObj.clientName = clientName;
        timesheetObj.action = this.renderAdminAction(id, statusValue, status, getWeekStart, week, talentOptions, userBillingDetailsObj);
        timesheetObj.approvedOn = timesheet.approvedOn ? moment(timesheet.approvedOn).format('DD/MM/YYYY') : '-';
        timesheetObj.commission = `${currency}${commission}`;
        timesheetObj.cost = `${currency}${cost}`;
      }

      timesheetData.push(timesheetObj);
    });
    this.setState({ totalDocs, paginationData: get(response, 'data', {}), timesheetData, isListLoading: false });
  };

  handlePdfClick = timeSheetId => {
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${VERSION2}${TIMESHEET}/${timeSheetId}${DOWNLOAD}${BILL}`;
    request(requestURL, data)
      .then(this.downloadProfilePdf)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  downloadProfilePdf = response => {
    if (get(response, 'status')) {
      const url = get(response, 'data.pdfPath');
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (newWindow) newWindow.opener = null;
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  renderClientAction = id => (
    <SelectBox className="input-sm small-arrow">
      <Field
        name="status"
        type="text"
        component={Selects}
        searchable={false}
        placeHolder={containerMessage.actionLabel.defaultMessage}
        options={clientActions.map(item => ({
          label: `${item.label}`,
          value: item.value,
        }))}
        onChange={e => this.handleChangeTimesheetStatus(e, id)}
      />
    </SelectBox>
  );

  renderAdminAction = (id, statusValue, status, getWeekStart, week, talentOptions, userBillingDetailsObj) => {
    let output = '';
    if (status === 'Draft') {
      output = <AddTimesheet type="edit" id={id} dateStart={getWeekStart} week={week} loadDetails={() => this.loadTimesheets(1)} />;
    } else if (status === 'Settled') {
      output = <Badge className={`${getBadgeClass(status)} badge-sm`}>{status}</Badge>;
    } else {
      const currentStatus = { label: status, value: statusValue };
      output = (
        <div className="d-flex">
          <SelectBox className="input-sm small-arrow">
            <Field
              name="status"
              type="text"
              component={Selects}
              searchable={false}
              placeHolder={containerMessage.actionLabel.defaultMessage}
              defaultValue={currentStatus}
              options={adminActions.map(item => ({
                label: `${item.label}`,
                value: item.value,
              }))}
              onChange={e => this.handleChangeTimesheetStatus(e, id)}
            />
          </SelectBox>
          <AddTimesheet
            type="adminEdit"
            id={id}
            talentOptions={talentOptions}
            userBillingDetailsObj={userBillingDetailsObj}
            statusValue={statusValue}
            dateStart={getWeekStart}
            week={week}
            loadDetails={() => this.loadTimesheets(1)}
          />
        </div>
      );
    }

    return output;
  };

  updateDataGrid = (id, status) => {
    const { gridData } = this.state;
    const { docs } = gridData.data;
    docs.forEach(row => {
      const rowId = get(row, '_id');
      if (rowId === id) {
        row.status = status;
      }
    });
    this.setState({
      gridData: {
        ...gridData,
        data: {
          ...gridData.data,
          docs,
        },
      },
    });
    this.setTimesheetDataSuccess(gridData);
  };

  handleChangeTimesheetStatus = (e, id) => {
    const status = get(e, 'value');
    const body = { id, status };
    const apiCallData = { method: 'PATCH', body };
    const requestURL = `${API_URL}${TIMESHEET}/${id}`;

    request(requestURL, apiCallData)
      .then(response => {
        if (get(response, 'status')) {
          this.updateDataGrid(id, status);
        } else {
          toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
        }
      })
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  handleSort = (column, sortDirection) => {
    const sortFilter = { column: column.selector, sortDirection };
    this.setState({ sortFilter }, () => {
      this.loadTimesheets(1);
    });
  };

  render() {
    const { projectDetailsPage, isClientDashboard } = this.props;
    const { timesheetData, totalDocs, isListLoading, paginationData, userType, registerType } = this.state;
    const { tableColumns } = timesheetFilter(userType, projectDetailsPage, registerType, isClientDashboard);

    return (
      <React.Fragment>
        {isListLoading || totalDocs > 0 ? (
          <React.Fragment>
            <DataTable
              noHeader
              columns={tableColumns}
              customStyles={newCustomStylesForGrid}
              data={timesheetData}
              totalRows={0}
              direction="ltr"
              progressPending={isListLoading}
              progressComponent={<ProgressComponent />}
              paginationComponentOptions={{ noRowsPerPage: true }}
              overflowY
              overflowYOffset="160px"
              noDataComponent={
                <p className="p-4 m-0 text-muted">
                  <small>{containerMessage.noRecord.defaultMessage}</small>
                </p>
              }
              sortServer
              onSort={this.handleSort}
            />
            {paginationComponent(paginationData, DEFAULT_PAGE_SIZE, this.loadTimesheets)}
          </React.Fragment>
        ) : (
          <ComingSoonBlock className="border-0 pb-0 mb-0">
            <div className="inner-content">
              <SVG src={filesIcon} />
              <p className="sm my-0">{containerMessage.noRecord.defaultMessage}</p>
            </div>
          </ComingSoonBlock>
        )}
      </React.Fragment>
    );
  }
}

TimesheetListing.defaultProps = defaultProps;
TimesheetListing.propTypes = propTypes;

export default compose(
  reduxForm({
    form: key,
    touchOnChange: true,
  }),
)(TimesheetListing);
