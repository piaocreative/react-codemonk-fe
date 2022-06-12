/** CredentialsComponent
 */
import React from 'react';
import { Field } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { FormGroup, Row, Col } from 'reactstrap';
import { renderField } from 'utils/Fields';
import * as normalize from 'utils/normalize';
import containerMessage from 'containers/messages';
import { getFieldValidator } from 'components/UserProfileComponents/fields';
import { FormLabel } from 'components';
import messages from 'containers/Auth/Talent/AgencyCertificatesPage/messages';
import { defaultProps, propTypes } from 'containers/proptypes';

export class CredentialsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderOnBoarding = () => (
    <React.Fragment>
      <Row>
        <Col md="4">
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...containerMessage.labelProfileLinkedIn} />
            </FormLabel>
            <Field
              name="linkedInUrl"
              type="text"
              component={renderField}
              placeholder={containerMessage.urlPlaceholder.defaultMessage}
              normalize={normalize.trimSpace}
              validate={getFieldValidator('linkedInUrl', false)}
            />
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...containerMessage.labelProfileGithub} />
            </FormLabel>
            <Field
              name="gitHubUrl"
              type="text"
              component={renderField}
              placeholder={containerMessage.urlPlaceholder.defaultMessage}
              normalize={normalize.trimSpace}
              validate={getFieldValidator('gitHubUrl', false)}
            />
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...messages.labelProfileDribble} />
            </FormLabel>
            <Field
              name="dribbbleUrl"
              type="text"
              component={renderField}
              placeholder={containerMessage.urlPlaceholder.defaultMessage}
              normalize={normalize.trimSpace}
              validate={getFieldValidator('dribbbleUrl', false)}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...messages.labelClutchURL} />
            </FormLabel>
            <Field
              name="clutchUrl"
              type="text"
              component={renderField}
              placeholder={containerMessage.urlPlaceholder.defaultMessage}
              normalize={normalize.trimSpace}
              validate={getFieldValidator('clutchUrl', false)}
            />
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...messages.labelGoodfirmsURL} />
            </FormLabel>
            <Field
              name="goodfirmsUrl"
              type="text"
              component={renderField}
              placeholder={containerMessage.urlPlaceholder.defaultMessage}
              normalize={normalize.trimSpace}
              validate={getFieldValidator('goodfirmsUrl', false)}
            />
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...messages.labelOtherProfessional} />
            </FormLabel>
            <Field
              name="otherWebsiteUrl"
              type="text"
              component={renderField}
              placeholder={containerMessage.urlPlaceholder.defaultMessage}
              normalize={normalize.trimSpace}
              validate={getFieldValidator('otherWebsiteUrl', false)}
            />
          </FormGroup>
        </Col>
      </Row>
    </React.Fragment>
  );

  renderProfile = editFlag => (
    <React.Fragment>
      <Row>
        <Col md="6">
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...containerMessage.labelProfileLinkedIn} />
            </FormLabel>
            <Field
              name="linkedInUrl"
              type="text"
              component={renderField}
              disabled={!editFlag}
              placeholder={containerMessage.urlPlaceholder.defaultMessage}
              normalize={normalize.trimSpace}
              validate={getFieldValidator('linkedInUrl', false)}
            />
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...messages.labelProfileDribble} />
            </FormLabel>
            <Field
              name="dribbbleUrl"
              type="text"
              component={renderField}
              disabled={!editFlag}
              placeholder={containerMessage.urlPlaceholder.defaultMessage}
              normalize={normalize.trimSpace}
              validate={getFieldValidator('dribbbleUrl', false)}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...containerMessage.labelProfileGithub} />
            </FormLabel>
            <Field
              name="gitHubUrl"
              type="text"
              component={renderField}
              disabled={!editFlag}
              placeholder={containerMessage.urlPlaceholder.defaultMessage}
              normalize={normalize.trimSpace}
              validate={getFieldValidator('gitHubUrl', false)}
            />
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...messages.labelClutchURL} />
            </FormLabel>
            <Field
              name="clutchUrl"
              type="text"
              component={renderField}
              disabled={!editFlag}
              placeholder={containerMessage.urlPlaceholder.defaultMessage}
              normalize={normalize.trimSpace}
              validate={getFieldValidator('clutchUrl', false)}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...messages.labelGoodfirmsURL} />
            </FormLabel>
            <Field
              name="goodfirmsUrl"
              type="text"
              component={renderField}
              disabled={!editFlag}
              placeholder={containerMessage.urlPlaceholder.defaultMessage}
              normalize={normalize.trimSpace}
              validate={getFieldValidator('goodfirmsUrl', false)}
            />
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...messages.labelOtherProfessional} />
            </FormLabel>
            <Field
              name="otherWebsiteUrl"
              type="text"
              component={renderField}
              disabled={!editFlag}
              placeholder={containerMessage.urlPlaceholder.defaultMessage}
              normalize={normalize.trimSpace}
              validate={getFieldValidator('otherWebsiteUrl', false)}
            />
          </FormGroup>
        </Col>
      </Row>
    </React.Fragment>
  );

  render() {
    const { editFlag = true, onBoarding } = this.props;
    return <React.Fragment>{onBoarding ? this.renderOnBoarding() : this.renderProfile(editFlag)}</React.Fragment>;
  }
}

CredentialsComponent.defaultProps = defaultProps;
CredentialsComponent.propTypes = propTypes;

export default CredentialsComponent;
