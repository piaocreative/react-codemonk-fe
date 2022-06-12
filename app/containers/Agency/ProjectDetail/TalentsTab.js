/** Team Tab Page
 */
import React from 'react';
import get from 'lodash/get';
import DataTable from 'react-data-table-component';
import SVG from 'react-inlinesvg';
import { currencyData, customStyles, filesIcon } from 'containers/App/constants';
import { getPageData, paginationComponent } from 'containers/App/utils';
import TalentNameButton from 'components/TalentNameButton';
import { ComingSoonBlock } from 'components/ComingSoon/styles';
import { getCurrencySymbol } from 'containers/MyProfilePage/components/utils';
import { TableSkeletonCol6 } from 'components/SkeletonLoader';
import containerMessage from 'containers/messages';
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from 'containers/constants';
import { defaultProps, propTypes } from 'containers/proptypes';
import { agencyTalentListingColumns } from './constants';
import 'rc-pagination/assets/index.css';

export class TalentsTab extends React.Component {
  constructor(props) {
    super(props);
    const totalDocs = get(props, 'data', []);
    this.state = {
      talentList: [],
      paginationData: { totalDocs: totalDocs.length, page: DEFAULT_PAGE_NO, limit: DEFAULT_PAGE_SIZE },
      isListLoading: false,
      pageNum: DEFAULT_PAGE_NO,
    };
  }

  componentDidMount() {
    const { pageNum } = this.state;
    this.setAgencyTalentsDetails(pageNum);
  }

  setAgencyTalentsDetails = pageNum => {
    this.setState({ pageNum });
    const { projectID } = this.props;
    const paginationData = { totalDocs: get(this.props, 'data', []).length, page: DEFAULT_PAGE_NO, limit: DEFAULT_PAGE_SIZE };
    const extra = { projectId: projectID, tab: '2' };
    const pageData = getPageData(get(this.props, 'data', []), pageNum, DEFAULT_PAGE_SIZE);
    const array = [];
    pageData.forEach(listData => {
      const id = get(listData, 'talentId');
      const talentName = get(listData, 'name', '');
      const profilePicture = get(listData, 'profilePicture', '');
      const btnProps = {
        redirectTo: '/agency/talent-profile/',
        talentId: id,
        redirectType: 'agencyProjectDetails',
        talentName,
        extra,
        profilePicture,
      };
      const name = <TalentNameButton {...btnProps} />;
      const currencySymbol = getCurrencySymbol(currencyData, 'code', get(listData, 'currency'));
      const rate = `${currencySymbol || ''}${get(listData, 'ratePerHour')}`;
      const email = get(listData, 'email');
      array.push({
        id,
        name,
        email,
        rate,
      });
    });
    this.setState({ paginationData, talentList: array, isListLoading: false });
  };

  renderNoTalents = () => (
    <ComingSoonBlock>
      <div className="inner-content">
        <SVG src={filesIcon} />
        <p className="sm mt-0">{containerMessage.noTalent.defaultMessage}</p>
      </div>
    </ComingSoonBlock>
  );

  render() {
    const { talentList, paginationData, pageNum, isListLoading } = this.state;

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
              columns={agencyTalentListingColumns}
              customStyles={customStyles}
              data={talentList}
              totalRows={0}
              direction="ltr"
              progressPending={isListLoading}
              progressComponent={<LinearIndeterminate />}
              paginationComponentOptions={{ noRowsPerPage: true }}
              overflowY
              overflowYOffset="80px"
              noDataComponent={<p className="p-4 m-0">{containerMessage.noTalent.defaultMessage}</p>}
            />

            {paginationComponent(paginationData, DEFAULT_PAGE_SIZE, this.setAgencyTalentsDetails, pageNum)}
          </React.Fragment>
        ) : (
          this.renderNoTalents()
        )}
      </React.Fragment>
    );
  }
}

TalentsTab.defaultProps = defaultProps;
TalentsTab.propTypes = propTypes;

export default TalentsTab;
