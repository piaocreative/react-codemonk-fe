/**
 * FeatureJobWidget
 */

import React, { Component } from 'react';
import { P } from 'components';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import SVG from 'react-inlinesvg';
import { FormattedMessage } from 'react-intl';
import {
  logoPlaceholder,
  API_URL,
  JOB_POST,
  FEATURE,
  assignmentArray,
  partTimeArray,
  teamPreferenceArray,
  countryTimeXZone,
} from 'containers/App/constants';
import request from 'utils/request';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import { getArrayLabels, getTimzoneOffest, getTimzoneCountry } from 'containers/MyProfilePage/components/utils';
import { VALIDATION } from 'utils/constants';
import ToastifyMessage from 'components/ToastifyMessage';
import containerMessage from 'containers/messages';
import { WidgetCard, JobWidgetSlider } from './styles';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export class FeatureJobWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobDetails: [],
    };
  }

  componentDidMount() {
    this.loadJobPostDetails();
  }

  loadJobPostDetails = () => {
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${JOB_POST}${FEATURE}?limit=12`;
    request(requestURL, data)
      .then(this.setJobPostDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setJobPostDetails = response => {
    if (get(response, 'status')) {
      const { data } = response;
      this.setState({ jobDetails: data });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  render() {
    const { jobDetails } = this.state;

    const settings = {
      dots: true,
      infinite: true,
      centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      swipeToSlide: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
    };

    return (
      <JobWidgetSlider {...settings}>
        {jobDetails.map(jobData => (
          // eslint-disable-next-line no-underscore-dangle
          <WidgetCard key={jobData._id}>
            <div className="logo-icon">
              <SVG src={logoPlaceholder} />
            </div>
            <div className="inner-card-block">
              <P className="p16" opacityVal="0.7" fontFamiliy="GT-Walsheim-Pro-Medium">
                {jobData.expertise}
              </P>
              <h4>{jobData.role}</h4>
              {jobData.assignments.length >= 1 && (
                <div className="d-flex align-items-center">
                  {jobData.assignments.length >= 1 && (
                    <div className="job-tag">
                      {getArrayLabels(get(jobData, 'assignments', []), assignmentArray)
                        .slice(0, 1)
                        .map(subItem => subItem)}
                    </div>
                  )}
                  {jobData.timeZone && (
                    <P className="p16 m-0">
                      {getTimzoneOffest(countryTimeXZone, 'name', jobData.timeZone)} ({jobData.timeZone}),{' '}
                      {getTimzoneCountry(countryTimeXZone, 'name', jobData.timeZone)}
                    </P>
                  )}
                </div>
              )}
              <div className="d-flex justify-content-between mb-1 mb-md-4 mt-4 flex-column flex-md-row">
                <div className="d-flex flex-row flex-md-column">
                  <P className="p16">Type</P>
                  <h5 className="p16 ms-3 ms-md-0">
                    <b>
                      {getArrayLabels(get(jobData, 'workPreference', []), partTimeArray.concat({ value: 'fulltime', label: 'Full time' }))
                        .slice(0, 1)
                        .map(subItem => subItem)}
                    </b>
                  </h5>
                </div>

                <div className="d-flex flex-row flex-md-column">
                  <P className="p16">Duration</P>
                  <h5 className="p16 ms-3 ms-md-0">
                    <b>{jobData.duration} months</b>
                  </h5>
                </div>
                <div className="d-flex flex-row flex-md-column">
                  <P className="p16">
                    <FormattedMessage {...containerMessage.subHeadingTeam} />
                  </P>
                  <h5 className="p16 ms-3 ms-md-0">
                    {get(jobData, 'teamPreference', []).length !== 0 ? (
                      <b>
                        {getArrayLabels(get(jobData, 'teamPreference', []), teamPreferenceArray)
                          .slice(0, 1)
                          .map(subItem => subItem)}
                      </b>
                    ) : (
                      '-'
                    )}
                  </h5>
                </div>
              </div>
              <div className="read-more-less-content mb-2">
                <HTMLEllipsis unsafeHTML={get(jobData, 'description', '')} maxLine="2" ellipsis="..." basedOn="letters" />
              </div>
              <ul>
                {jobData.skills.map(skill => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          </WidgetCard>
        ))}
      </JobWidgetSlider>
    );
  }
}
export default FeatureJobWidget;
