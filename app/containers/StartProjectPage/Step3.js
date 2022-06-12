import React from 'react';
import { FormattedMessage } from 'react-intl';
import { H1, H4 } from 'components';
import { FormGroup, Row, Col } from 'reactstrap';
import { Field } from 'redux-form/immutable';
import * as formValidations from 'utils/formValidations';
import { renderField, renderCheckBox } from 'utils/Fields';
import { defaultProps, propTypes } from 'containers/proptypes';
import { uxDesignArray, softwareDevArray, devTeamArray, dataAIAndMlArray, key } from './constants';
import StepFooter from './StepFooter';
import messages from './messages';

export class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleUXDesignChange = event => {
    const { lookingForDesign, onUXDesignChange, dispatch, untouch } = this.props;
    const isChecked = event.target.checked;
    const item = event.target.name;
    dispatch(untouch(key, 'other'));
    let updatedUXDesign = Array.from(lookingForDesign);
    if (updatedUXDesign.includes(item) && !isChecked) {
      updatedUXDesign = updatedUXDesign.filter(e => e !== item);
    } else {
      updatedUXDesign.push(item);
    }
    onUXDesignChange(updatedUXDesign);
  };

  handleSoftwareDevChnage = event => {
    const { lookingForSoftwareDevelopment, onSoftwareDevelopmentChange, dispatch, untouch } = this.props;
    const isChecked = event.target.checked;
    const item = event.target.name;
    dispatch(untouch(key, 'other'));
    let updatedSoftwareDev = Array.from(lookingForSoftwareDevelopment);
    if (updatedSoftwareDev.includes(item) && !isChecked) {
      updatedSoftwareDev = updatedSoftwareDev.filter(e => e !== item);
    } else {
      updatedSoftwareDev.push(item);
    }
    onSoftwareDevelopmentChange(updatedSoftwareDev);
  };

  handleDevTeamChange = event => {
    const { lookingForDevelopmentTeam, onDevelopmentTeamChange, dispatch, untouch } = this.props;
    dispatch(untouch(key, 'other'));
    const isChecked = event.target.checked;
    const item = event.target.name;
    let updatedSoftwareDev = Array.from(lookingForDevelopmentTeam);
    if (updatedSoftwareDev.includes(item) && !isChecked) {
      updatedSoftwareDev = updatedSoftwareDev.filter(e => e !== item);
    } else {
      updatedSoftwareDev.push(item);
    }
    onDevelopmentTeamChange(updatedSoftwareDev);
  };

  handleDataAiMLChange = event => {
    const { lookingForDataAiMl, onDataAiMiChange, dispatch, untouch } = this.props;
    dispatch(untouch(key, 'other'));
    const isChecked = event.target.checked;
    const item = event.target.name;
    let updatedSoftwareDev = Array.from(lookingForDataAiMl);
    if (updatedSoftwareDev.includes(item) && !isChecked) {
      updatedSoftwareDev = updatedSoftwareDev.filter(e => e !== item);
    } else {
      updatedSoftwareDev.push(item);
    }
    onDataAiMiChange(updatedSoftwareDev);
  };

  onChangeGrowthHacking = () => {
    const { onGrowthHackingChange, lookingForGrowthHacking, dispatch, untouch } = this.props;
    dispatch(untouch(key, 'other'));
    onGrowthHackingChange(!lookingForGrowthHacking);
  };

  onChangeAgileCoach = () => {
    const { onAgileCoachChange, lookingForAgileCoach, dispatch, untouch } = this.props;
    dispatch(untouch(key, 'other'));
    onAgileCoachChange(!lookingForAgileCoach);
  };

  isLocalStateValid = () => {
    const {
      lookingForDesign,
      lookingForSoftwareDevelopment,
      lookingForDevelopmentTeam,
      lookingForDataAiMl,
      lookingForGrowthHacking,
      lookingForAgileCoach,
    } = this.props;
    return (
      lookingForGrowthHacking ||
      lookingForAgileCoach ||
      lookingForDesign.length > 0 ||
      lookingForSoftwareDevelopment.length > 0 ||
      lookingForDevelopmentTeam.length > 0 ||
      lookingForDataAiMl.length > 0
    );
  };

  render() {
    const {
      lookingForOther,
      onChangeOther,
      lookingForDesign,
      lookingForSoftwareDevelopment,
      lookingForDevelopmentTeam,
      lookingForDataAiMl,
      lookingForGrowthHacking,
      lookingForAgileCoach,
      invalid,
    } = this.props;
    return (
      <React.Fragment>
        <H1>
          <FormattedMessage {...messages.titleStep3} />
        </H1>
        <Row>
          <Col md="6">
            <H4>
              <FormattedMessage {...messages.titleUXDesign} />
            </H4>
            <FormGroup>
              {uxDesignArray.map(item => (
                <Field
                  name={item.value}
                  type="checkbox"
                  component={renderCheckBox}
                  label={item.label}
                  checked={lookingForDesign.includes(item.value)}
                  onChange={this.handleUXDesignChange}
                />
              ))}
            </FormGroup>
          </Col>
          <Col md="6">
            <H4>
              <FormattedMessage {...messages.titlesoftwareDev} />
            </H4>
            {softwareDevArray.map(item => (
              <Field
                name={item.value}
                type="checkbox"
                component={renderCheckBox}
                label={item.label}
                checked={lookingForSoftwareDevelopment.includes(item.value)}
                onChange={this.handleSoftwareDevChnage}
              />
            ))}
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <H4>
              <FormattedMessage {...messages.titleDevTeam} />
            </H4>
            <FormGroup>
              {devTeamArray.map(item => (
                <Field
                  name={item.value}
                  type="checkbox"
                  component={renderCheckBox}
                  label={item.label}
                  checked={lookingForDevelopmentTeam.includes(item.value)}
                  onChange={this.handleDevTeamChange}
                />
              ))}
            </FormGroup>
          </Col>
          <Col md="6">
            <H4>
              <FormattedMessage {...messages.titleDataUIAndML} />
            </H4>
            {dataAIAndMlArray.map(item => (
              <Field
                name={item.value}
                type="checkbox"
                component={renderCheckBox}
                label={item.label}
                checked={lookingForDataAiMl.includes(item.value)}
                onChange={this.handleDataAiMLChange}
              />
            ))}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="my-md-5 mt-4 mb-2">
            <FormGroup>
              <Field
                name="growth-hacking"
                type="checkbox"
                component={renderCheckBox}
                label={messages.labelGrowthHacking.defaultMessage}
                checked={lookingForGrowthHacking}
                onChange={this.onChangeGrowthHacking}
                wrapperClassName="checkbox-block"
              />
            </FormGroup>
          </Col>
          <Col md="6" className="my-md-5 mt-2 mb-4">
            <Field
              name="agile-coaching"
              type="checkbox"
              component={renderCheckBox}
              label={messages.labelAgileCoaching.defaultMessage}
              checked={lookingForAgileCoach}
              onChange={this.onChangeAgileCoach}
              wrapperClassName="checkbox-block"
            />
          </Col>
        </Row>
        <FormGroup>
          <Field
            name="other"
            type="text"
            component={renderField}
            placeholder={messages.placeholderOther.defaultMessage}
            value={lookingForOther}
            onChange={onChangeOther}
            validate={[formValidations.required, formValidations.minLength2, formValidations.maxLength30]}
          />
        </FormGroup>
        <StepFooter step={3} {...this.props} invalid={invalid && !this.isLocalStateValid()} />
      </React.Fragment>
    );
  }
}

Step3.defaultProps = defaultProps;
Step3.propTypes = propTypes;

export default Step3;
