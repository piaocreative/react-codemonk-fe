/**
 * FeatureDevlopersWidget
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import { API_URL, TALENT, FEATURE } from 'containers/App/constants';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';
import ToastifyMessage from 'components/ToastifyMessage';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import DeveloperWidgetBlock from './DeveloperWidgetBlock';
import { sortUrl } from './utils';
import { DeveloperJobWidgetSlider } from './styles';

const DEFULT_LIMIT = 12;

export class FeatureDevlopersWidget extends Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    this.state = {
      developerList: [],
      params: queryString.parse(location.search),
    };
  }

  componentDidMount() {
    this.appyTransperantBg();
    this.loadTalentDetails();
  }

  appyTransperantBg = () => {
    document.body.className += ' bg-transparent';
    document.getElementById('app').className += ' bg-transparent';
  };

  loadTalentDetails = () => {
    const data = { method: 'GET' };
    const filterParam = [];
    const { params } = this.state;
    const { role = null, limit = DEFULT_LIMIT, skills = null, yearsOfExperience = null, teamPreference = null } = params;
    const { sort = null } = params;
    if (role) {
      filterParam.push(`role=${role}`);
    }
    if (skills) {
      filterParam.push(`skills=${skills}`);
    }
    if (yearsOfExperience) {
      filterParam.push(`yearsOfExperience=${yearsOfExperience}`);
    }
    if (teamPreference) {
      filterParam.push(`teamPreference=${teamPreference}`);
    }
    if (sort) {
      filterParam.push(sortUrl(sort));
    }
    const requestURL = `${API_URL}${TALENT}${FEATURE}?${filterParam.join('&')}&limit=${limit}`;
    request(requestURL, data)
      .then(this.setJobPostDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setJobPostDetails = response => {
    if (get(response, 'status')) {
      const { data } = response;
      this.setState({ developerList: data.docs });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  render() {
    const { developerList } = this.state;

    const settings = {
      dots: true,
      infinite: true,
      swipeToSlide: true,
      arrows: false,
      rows: 2,
      slidesPerRow: 3,
      responsive: [
        {
          breakpoint: 980,
          settings: {
            slidesPerRow: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesPerRow: 1,
          },
        },
      ],
    };

    return (
      <DeveloperJobWidgetSlider {...settings}>
        {developerList.map(developer => (
          <DeveloperWidgetBlock key={developer} developer={developer} />
        ))}
      </DeveloperJobWidgetSlider>
    );
  }
}

FeatureDevlopersWidget.defaultProps = {
  location: '',
};

FeatureDevlopersWidget.propTypes = {
  location: PropTypes.object,
};

export default FeatureDevlopersWidget;
