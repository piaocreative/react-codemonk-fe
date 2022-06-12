import React, { Component } from 'react';
import { Field, change, untouch } from 'redux-form/immutable';
import * as normalize from 'utils/normalize';
import { FormGroup, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { renderField } from 'utils/Fields';
import { FormLabel } from 'components';
import containerMessage from 'containers/messages';
import { jsonCopy } from 'components/UserProfileComponents/utils';
import { propTypes } from 'containers/Auth/ProfessionalDetail/proptypes';
import profMessages from 'containers/Auth/ProfessionalDetail/messages';
import { getFieldValidator } from './fields';

export class ProfessionalProfiles extends Component {
  state = {};

  componentDidMount() {
    const { onBoarding, gitHubUrl, linkedInUrl, stackOverFlowUrl, dribbbleUrl, behanceUrl, portfolioUrl, formKey } = this.props;
    if (!onBoarding) {
      this.setValues(gitHubUrl, linkedInUrl, stackOverFlowUrl, dribbbleUrl, behanceUrl, portfolioUrl, formKey);
    }
  }

  setValues = (gitHubUrl, linkedInUrl, stackOverFlowUrl, dribbbleUrl, behanceUrl, portfolioUrl, formKey) => {
    const {
      dispatch,
      onChangeLinkedInProfile,
      onChangeGithubProfile,
      onChangeStackoverflowProfile,
      onChangeDribbleProfile,
      onChangeBehanceProfile,
      onChangePersonalProfile,
    } = this.props;

    dispatch(change(formKey, `linkedInUrl`, jsonCopy(linkedInUrl)));
    dispatch(change(formKey, `gitHubUrl`, jsonCopy(gitHubUrl)));
    dispatch(change(formKey, `stackOverFlowUrl`, jsonCopy(stackOverFlowUrl)));
    dispatch(change(formKey, `dribbbleUrl`, jsonCopy(dribbbleUrl)));
    dispatch(change(formKey, `behanceUrl`, jsonCopy(behanceUrl)));
    dispatch(change(formKey, `portfolioUrl`, jsonCopy(portfolioUrl)));

    dispatch(untouch(formKey, `linkedInUrl`));
    dispatch(untouch(formKey, `gitHubUrl`));
    dispatch(untouch(formKey, `stackOverFlowUrl`));
    dispatch(untouch(formKey, `dribbbleUrl`));
    dispatch(untouch(formKey, `behanceUrl`));
    dispatch(untouch(formKey, `portfolioUrl`));

    onChangeLinkedInProfile({ target: { value: jsonCopy(linkedInUrl) } });
    onChangeGithubProfile({ target: { value: jsonCopy(gitHubUrl) } });
    onChangeStackoverflowProfile({ target: { value: jsonCopy(stackOverFlowUrl) } });
    onChangeDribbleProfile({ target: { value: jsonCopy(dribbbleUrl) } });
    onChangeBehanceProfile({ target: { value: jsonCopy(behanceUrl) } });
    onChangePersonalProfile({ target: { value: jsonCopy(portfolioUrl) } });
  };

  render() {
    const {
      gitHubUrl,
      stackOverFlowUrl,
      linkedInUrl,
      dribbbleUrl,
      behanceUrl,
      portfolioUrl,
      onChangeLinkedInProfile,
      onChangeGithubProfile,
      onChangeStackoverflowProfile,
      onChangeDribbleProfile,
      onChangeBehanceProfile,
      onChangePersonalProfile,
      user = '',
    } = this.props;

    return (
      <React.Fragment>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelProfileLinkedIn} />
              </FormLabel>
              <Field
                name="linkedInUrl"
                type="text"
                component={renderField}
                value={linkedInUrl}
                placeholder={containerMessage.urlPlaceholder.defaultMessage}
                normalize={normalize.trimSpace}
                onChange={onChangeLinkedInProfile}
                validate={getFieldValidator('linkedInUrl', false)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                {user === 'client' ? (
                  <FormattedMessage {...profMessages.labelCorporatewebsite} />
                ) : (
                  <FormattedMessage {...profMessages.labelProfilePersonalWebsite} />
                )}
              </FormLabel>
              <Field
                name="portfolioUrl"
                type="text"
                component={renderField}
                value={portfolioUrl}
                placeholder={containerMessage.urlPlaceholder.defaultMessage}
                normalize={normalize.trimSpace}
                onChange={onChangePersonalProfile}
                validate={getFieldValidator('portfolioUrl', false)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelProfileGithub} />
              </FormLabel>
              <Field
                name="gitHubUrl"
                type="text"
                component={renderField}
                value={gitHubUrl}
                placeholder={containerMessage.urlPlaceholder.defaultMessage}
                normalize={normalize.trimSpace}
                onChange={onChangeGithubProfile}
                validate={getFieldValidator('gitHubUrl', false)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...profMessages.labelProfileStackOverflow} />
              </FormLabel>
              <Field
                name="stackOverFlowUrl"
                type="text"
                component={renderField}
                value={stackOverFlowUrl}
                placeholder={containerMessage.urlPlaceholder.defaultMessage}
                normalize={normalize.trimSpace}
                onChange={onChangeStackoverflowProfile}
                validate={getFieldValidator('stackOverFlowUrl', false)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...profMessages.labelProfileBehance} />
              </FormLabel>
              <Field
                name="behanceUrl"
                type="text"
                component={renderField}
                value={behanceUrl}
                placeholder={containerMessage.urlPlaceholder.defaultMessage}
                normalize={normalize.trimSpace}
                onChange={onChangeBehanceProfile}
                validate={getFieldValidator('behanceUrl', false)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...profMessages.labelProfileDribbble} />
              </FormLabel>
              <Field
                name="dribbbleUrl"
                type="text"
                component={renderField}
                value={dribbbleUrl}
                placeholder={containerMessage.urlPlaceholder.defaultMessage}
                normalize={normalize.trimSpace}
                onChange={onChangeDribbleProfile}
                validate={getFieldValidator('dribbbleUrl', false)}
              />
            </FormGroup>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

ProfessionalProfiles.propTypes = propTypes;
