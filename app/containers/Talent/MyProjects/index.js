/** MyProjects
 * This is the MyProjects page for the talent and agency, at the '/talent/my-projects' and '/talent/agency-projects' route
 */
import React from 'react';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import range from 'lodash/range';
import StorageService from 'utils/StorageService';
import { VALIDATION } from 'utils/constants';
import request from 'utils/request';
import { getUserRegisterType } from 'utils/Helper';
import { API_URL, AGENCY, TALENT, PROJECT_API, LIST } from 'containers/App/constants';
import { A } from 'components';
import ToastifyMessage from 'components/ToastifyMessage';
import { sortUrl } from 'containers/TalentListingPage/utils';
import { defaultProps, propTypes } from 'containers/proptypes';
import { listProjectsColumns, listAgencyProjectsColumns } from 'containers/constants';
import { projectSortArray } from 'containers/TalentListingPage/constants';
import { UserImg } from 'components/Header/header-style';
import containerMessage from 'containers/messages';
import AgencyProjects from './AgencyProjects';
import TalentProjects from './TalentProjects';
import { DEFAULT_PAGE_SIZE } from './constants';
import { UserImgList } from './styles';
import 'rc-pagination/assets/index.css';

export class MyProjects extends React.Component {
  constructor(props) {
    super(props);
    const getPageNumber = StorageService.get('talentProjectPageNumber');
    const updatedPageNumber = JSON.parse(getPageNumber) || 1;
    const projectStatus = StorageService.get('talentProjectFilter');
    const projectSort = StorageService.get('talentProjectSort');
    const updatedProjectStatus = JSON.parse(projectStatus) || { label: 'All', value: -1 };
    const roleType = getUserRegisterType();

    this.state = {
      projectList: [],
      paginationData: [],
      pageNum: updatedPageNumber,
      projectStatus: updatedProjectStatus,
      roleType,
      currentSort: projectSort ? projectSortArray.find(item => projectSort.indexOf(item.value) > -1) : projectSortArray[0],
      pageSize: DEFAULT_PAGE_SIZE,
    };
  }

  componentDidMount() {
    const { pageNum } = this.state;
    this.loadTalentProjects(pageNum);
  }

  loadTalentProjects = pageNum => {
    StorageService.set('talentProjectPageNumber', JSON.stringify(pageNum));
    this.setState({ isListLoading: true, pageNum });
    const { roleType, projectStatus, pageSize, currentSort } = this.state;
    const data = { method: 'GET' };

    const requestURL =
      roleType === 'agency'
        ? `${API_URL}${AGENCY}${PROJECT_API}${LIST}?page=${pageNum}&status=${projectStatus.value}`
        : `${API_URL}${TALENT}${PROJECT_API}${LIST}?limit=${pageSize}&page=${pageNum}&status=${projectStatus.value}${sortUrl(
            currentSort.value,
          )}`;
    request(requestURL, data)
      .then(this.setTalentProject)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setTalentProject = response => {
    if (get(response, 'status')) {
      const { roleType } = this.state;
      const { data } = response;

      const projectDetailURL = roleType === 'agency' ? '/agency/agency-project-detail/' : '/talent/project-detail/';
      const array = [];
      get(data, 'docs', []).forEach(listData => {
        const projectId = get(listData, '_id');
        const obj = {
          ...listData,
        };
        if (roleType === 'agency') {
          const talentUsers = get(listData, 'talentsUserDetails', []);
          const totalImages = talentUsers.length > 4 ? 4 : talentUsers.length;
          const totalImagesArray = range(totalImages);

          let talentImages = '';
          talentImages = (
            <UserImgList>
              {totalImagesArray.map(index => {
                const profilePicture = get(talentUsers[index], 'profilePicture');
                return (
                  <li>
                    <div>
                      <UserImg src={profilePicture} className="rounded-circle" alt="user-profile" />
                    </div>
                  </li>
                );
              })}
              {talentUsers.length > 4 && (
                <li>
                  <div>{`+${talentUsers.length - 4}`}</div>
                </li>
              )}
            </UserImgList>
          );

          obj.talentsWorking = talentImages;
          obj.action = <A href={`${projectDetailURL}${projectId}`}>{containerMessage.btnView.defaultMessage}</A>;
        }
        array.push(obj);
      });

      this.setState({ projectList: array, paginationData: get(response, 'data', {}), isListLoading: false });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  handleChangeFilter = e => {
    if (!e) {
      e = { label: 'All', value: -1 };
    }
    StorageService.set('talentProjectFilter', JSON.stringify(e));
    this.setState({ projectStatus: e }, () => {
      this.loadTalentProjects(1);
    });
  };

  handleSort = e => {
    StorageService.set('talentProjectSort', JSON.stringify(e.value));
    this.setState({ currentSort: e }, () => {
      this.loadTalentProjects(1);
    });
  };

  render() {
    const { roleType, projectStatus, projectList, paginationData, isListLoading, currentSort, pageSize, pageNum } = this.state;
    const totalDocs = get(paginationData, 'totalDocs', 0);
    const tableColumns = roleType === 'agency' ? listAgencyProjectsColumns : listProjectsColumns;
    const compData = {
      totalDocs,
      projectStatus,
      projectList,
      isListLoading,
      paginationData,
      tableColumns,
      currentSort,
      pageSize,
      pageNum,
      handleSort: this.handleSort,
      loadProjects: this.loadTalentProjects,
      handleChangeFilter: this.handleChangeFilter,
    };
    return (
      <React.Fragment>
        {roleType === 'agency' ? <AgencyProjects {...compData} {...this.props} /> : <TalentProjects {...compData} {...this.props} />}
      </React.Fragment>
    );
  }
}

MyProjects.defaultProps = defaultProps;
MyProjects.propTypes = propTypes;

export default MyProjects;
