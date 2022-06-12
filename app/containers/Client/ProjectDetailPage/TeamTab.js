/** Team Tab Page
 */
import React from 'react';
import { Field } from 'redux-form/immutable';
import get from 'lodash/get';
import DataTable from 'react-data-table-component';
import SVG from 'react-inlinesvg';
import Selects from 'components/Selects';
import { Col, Row } from 'reactstrap';
import moment from 'moment';
import {
  currencyData,
  newCustomStylesForGrid,
  talentStatusArray,
  filesIcon,
  calendarIcon,
  countryTimeXZone,
  userProfileIcon,
} from 'containers/App/constants';
import { getPageData, paginationComponent, redirectTo, talentProfileRedirect } from 'containers/App/utils';
import { H3, Button, Card, H5, P } from 'components';
import DatePicker from 'react-datepicker';
import TalentNameButton from 'components/TalentNameButton';
import { getCurrencySymbol, getTimzoneOffest } from 'containers/MyProfilePage/components/utils';
import { DatePickerContainer } from 'components/DatePickers/style';
import { TableSkeletonCol6 } from 'components/SkeletonLoader';
import { ComingSoonBlock } from 'components/ComingSoon/styles';
import { SelectBox } from 'containers/Admin/Projects/styles';
import talentMessages from 'containers/Client/Talents/messages';
import { defaultProps, propTypes } from 'containers/proptypes';
import { getMaxStartDate } from 'containers/Admin/Projects/utils';
import containerMessage from 'containers/messages';
import { CardTalentDetails } from 'containers/Talent/MyProjectDetail/styles';
import { talentListingColumns, admintalentListingColumns, DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from './constants';
import 'rc-pagination/assets/index.css';
import { TalentDateRange } from './styles';

export class TeamTab extends React.Component {
  constructor(props) {
    super(props);
    const totalDocs = get(props, 'data.talentsDetails', []);
    this.state = {
      talentList: [],
      paginationData: { totalDocs: totalDocs.length, page: DEFAULT_PAGE_NO, limit: DEFAULT_PAGE_SIZE },
      isListLoading: false,
      pageNum: DEFAULT_PAGE_NO,
      sStartDate: '',
      sEndDate: '',
    };
  }

  componentDidMount() {
    const { pageNum } = this.state;
    this.setTalentDetails(pageNum);
  }

  componentDidUpdate(prevProps) {
    const { talentsDetails } = this.props;
    if (prevProps.talentsDetails !== talentsDetails) {
      const { pageNum } = this.state;
      this.setTalentDetails(pageNum);
    }
  }

  setTalentDetails = pageNum => {
    this.setState({ pageNum });
    const { isAdmin, projectID, projectData } = this.props;
    const paginationData = {
      totalDocs: get(this.props, 'talentsDetails', []).length,
      page: DEFAULT_PAGE_NO,
      limit: DEFAULT_PAGE_SIZE,
    };
    const extra = { projectId: projectID, tab: '2' };
    const pageData = getPageData(get(this.props, 'talentsDetails', []), pageNum, DEFAULT_PAGE_SIZE);
    const array = [];
    const adminArray = [];
    const projectStartDate = get(projectData, 'startDate', moment());
    const projectEndDate = get(projectData, 'endDate', '');
    pageData.forEach(listData => {
      const id = get(listData, 'talentId');
      let talentName = '';
      let redirectToPage = '';
      let userType = '';

      if (isAdmin) {
        talentName = get(listData, 'name');
        redirectToPage = '/admin/talent-profile/';
        userType = 'admin';
      } else {
        talentName = get(listData, 'shortName');
        redirectToPage = '/client/talent-profile/';
        userType = 'client';
      }
      const profilePicture = get(listData, 'profilePicture', '');
      const btnProps = {
        redirectTo: redirectToPage,
        talentId: id,
        redirectType: `${userType}ProjectDetails`,
        talentName,
        extra,
        profilePicture,
      };
      const name = <TalentNameButton {...btnProps} />;

      const talentUserId = get(listData, 'talentUserId');
      const currencySymbol = getCurrencySymbol(currencyData, 'code', get(listData, 'currency'));
      const rate = `${currencySymbol || ''}${get(listData, 'ratePerHour')}`;
      const statusVal = talentStatusArray.find(obj => obj.label === get(listData, 'status')).value;

      const { sStartDate, sEndDate } = this.state;

      const maxStartDate = getMaxStartDate(sEndDate, projectEndDate);
      const minEndDate = sStartDate ? get(this.state, 'sStartDate') : projectStartDate;
      const allocationTill = moment(listData.allocationTill).format('DD/MM/YYYY') || '';

      const talentListObj1 = {
        id,
        name,
        role: listData.primaryRole,
        rate,
        allocationTill,
      };
      const talentListObj2 = {
        startDate: (
          <DatePickerContainer className="sm-picker">
            <DatePicker
              placeholderText={containerMessage.placeholderDate.defaultMessage}
              className="box-shadow-datepicker form-control"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={5}
              popperPlacement="bottom-start"
              minDate={moment(projectStartDate).toDate()}
              maxDate={moment(maxStartDate).toDate()}
              selected={moment(listData.startDate).toDate()}
              onChange={date => this.handleStartDateChange(date, listData.endDate, statusVal, talentUserId)}
            />
            <img src={calendarIcon} alt="calendar" />
          </DatePickerContainer>
        ),
        endDate: (
          <DatePickerContainer className="sm-picker">
            <DatePicker
              placeholderText={containerMessage.placeholderDate.defaultMessage}
              className="box-shadow-datepicker form-control"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={5}
              popperPlacement="bottom-start"
              minDate={moment(minEndDate).toDate()}
              maxDate={moment(projectEndDate).toDate()}
              selected={moment(listData.endDate).toDate()}
              onChange={date => this.handleEndDateChange(date, listData.startDate, statusVal, talentUserId)}
            />
            <img src={calendarIcon} alt="calendar" />
          </DatePickerContainer>
        ),
      };
      const talentListObj3 = {
        status: (
          <SelectBox className="input-sm small-arrow">
            <Field
              name="status"
              type="text"
              component={Selects}
              defaultValue={{ label: get(listData, 'status'), value: statusVal }}
              searchable={false}
              options={talentStatusArray.map(item => ({
                label: `${item.label}`,
                value: item.value,
              }))}
              onChange={e => this.handleChangeStatus(talentUserId, listData.startDate, listData.endDate, e)}
            />
          </SelectBox>
        ),
      };
      adminArray.push({ ...talentListObj1, ...talentListObj2, ...talentListObj3 });
      array.push({ ...talentListObj1, ...talentListObj3 });
    });
    this.setState({ paginationData, talentList: isAdmin ? adminArray : array, isListLoading: false });
  };

  handleStartDateChange = (date, endDate, statusVal, talentUserId) => {
    const { projectID, onChangeStatus, loadProjectDetails } = this.props;
    const data = {
      projectId: projectID,
      talentId: talentUserId,
      status: statusVal,
      startDate: moment(date).format('DD/MM/YYYY') || '',
      endDate: moment(endDate).format('DD/MM/YYYY') || '',
    };

    onChangeStatus(data, () => {
      loadProjectDetails();
    });
  };

  handleEndDateChange = (date, startDate, statusVal, talentUserId) => {
    const { projectID, onChangeStatus, loadProjectDetails } = this.props;
    const data = {
      projectId: projectID,
      talentId: talentUserId,
      status: statusVal,
      startDate: moment(startDate).format('DD/MM/YYYY') || '',
      endDate: moment(date).format('DD/MM/YYYY') || '',
    };

    onChangeStatus(data, () => {
      loadProjectDetails();
    });
  };

  handleChangeStatus = (talentId, startDate, endDate, selectedVal) => {
    const { onChangeStatus, projectID: projectId, loadProjectDetails } = this.props;
    const data = {
      projectId,
      talentId,
      status: selectedVal.value,
      startDate: moment(startDate).format('DD/MM/YYYY') || '',
      endDate: moment(endDate).format('DD/MM/YYYY') || '',
    };
    onChangeStatus(data, () => {
      loadProjectDetails();
    });
  };

  talentRedirect = talentRedirectProps => {
    const { history } = this.props;
    // eslint-disable-next-line no-shadow
    const { redirectTo, talentId, redirectType, extra } = talentRedirectProps;
    talentProfileRedirect(history, redirectTo, talentId, redirectType, extra);
  };

  renderCard = talent => {
    const { isAdmin } = this.props;
    return (
      <Card key={talent} className="mb-20 talent-card">
        <CardTalentDetails>
          <Row className="w-100 m-0">
            <Col md={6} sm={12} className="d-flex px-0">
              <Button
                type="button"
                className="btn-link large-text"
                onClick={() =>
                  // eslint-disable-next-line no-undef
                  this.talentRedirect(talent.redirectProps)
                }
              >
                <img
                  className="talent-pic"
                  src={talent.profilePicture}
                  alt=""
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = userProfileIcon;
                  }}
                />
              </Button>
              <div className="d-flex flex-column py-2">
                <H5 className="mb-1">
                  <Button
                    type="button"
                    className="btn-link large-text"
                    onClick={() =>
                      // eslint-disable-next-line no-undef
                      this.talentRedirect(talent.redirectProps)
                    }
                  >
                    {get(talent, 'name')}
                  </Button>
                </H5>
                {talent.city && talent.country && (
                  <P className="talent-location p16 mb-1">
                    {`${talent.city}, ${talent.country}`}
                    <span>({getTimzoneOffest(countryTimeXZone, 'name', talent.timeZone)})</span>
                  </P>
                )}
                {talent.primaryRole && <P className="p16">Distinguished - {talent.primaryRole}</P>}
              </div>
            </Col>
            <Col md={6} sm={12} className={`d-flex px-0 ${isAdmin ? 'justify-content-between' : 'justify-content-end'}`}>
              {isAdmin && (
                <div className="d-flex mr-2 flex-column">
                  <P className="p16 mb-2">Date</P>
                  <TalentDateRange className="d-grid">
                    {talent.startDate}
                    {talent.endDate}
                  </TalentDateRange>
                </div>
              )}
              <div className="mx-2">
                <P className="p16 mb-2">Status</P>
                {talent.status}
              </div>
            </Col>
          </Row>
        </CardTalentDetails>
      </Card>
    );
  };

  render() {
    const { talentList, paginationData, pageNum, isListLoading } = this.state;
    const { history, isAdmin } = this.props;

    const LinearIndeterminate = () => (
      <div className="w-100 flex-column d-flex">
        <TableSkeletonCol6 cardCount={5} />
      </div>
    );

    return (
      <React.Fragment>
        {talentList.length > 0 ? (
          <React.Fragment>
            <DataTable
              noHeader
              columns={isAdmin ? admintalentListingColumns : talentListingColumns}
              customStyles={newCustomStylesForGrid}
              data={talentList}
              totalRows={0}
              direction="ltr"
              progressPending={isListLoading}
              progressComponent={<LinearIndeterminate />}
              paginationComponentOptions={{ noRowsPerPage: true }}
              overflowY
              overflowYOffset="280px"
              noDataComponent={<p className="p-4 m-0">{containerMessage.noTalent.defaultMessage}</p>}
            />
            {paginationComponent(paginationData, DEFAULT_PAGE_SIZE, this.setTalentDetails, pageNum)}
          </React.Fragment>
        ) : (
          <ComingSoonBlock className="border-0">
            <div className="inner-content">
              <SVG src={filesIcon} />
              <H3 className="mt-0">{talentMessages.emptyStateHeader.defaultMessage}</H3>
              <p className="sm">{talentMessages.emptyStateContent.defaultMessage}</p>
              <ul>
                <li>{talentMessages.instruction1.defaultMessage}</li>
                <li>{talentMessages.instruction2.defaultMessage}</li>
                <li>{talentMessages.instruction3.defaultMessage}</li>
              </ul>
              <Button
                className="btn btn-outline"
                onClick={() => {
                  redirectTo(history, '/client/talent-listing');
                }}
              >
                {talentMessages.btnHireTalent.defaultMessage}
              </Button>
            </div>
          </ComingSoonBlock>
        )}
      </React.Fragment>
    );
  }
}

TeamTab.defaultProps = defaultProps;
TeamTab.propTypes = propTypes;

export default TeamTab;
