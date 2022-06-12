import React, { Component } from 'react';
import { FormGroup, Row, Col } from 'reactstrap';
import { FormLabel, ToastifyMessage, P } from 'components';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import { Field, change, untouch } from 'redux-form/immutable';
import { propTypes } from 'containers/Auth/ProfessionalDetail/proptypes';
import { toast } from 'react-toastify';
import containerMessage from 'containers/messages';
import { renderSelectTags, renderSelectRatings } from 'utils/Fields';
import { getSkills } from 'containers/Auth/utils';
import { getFieldValidator } from './fields';
import { jsonCopy } from './utils';
import messages from './messages';

export class SkillRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skillsList: [],
    };
  }

  componentDidMount() {
    const { onBoarding, formKey, skills, skillsCount, skillsRating, dispatch } = this.props;
    getSkills(this.setSkills);
    if (!onBoarding) this.setValues(skills, formKey);
    else {
      dispatch(change(formKey, 'skillsCount', skillsCount));
      dispatch(change(formKey, 'skillsRating', skillsRating));
    }
  }

  setSkills = response => {
    if (get(response, 'status')) {
      this.setState({ skillsList: response.data });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  setValues = (skills, formKey) => {
    const { dispatch, onChangeSkills } = this.props;
    const newSkills = jsonCopy(skills);
    const newData = [];
    for (let i = 0; i < newSkills.length; i++) {
      const objData = {
        label: newSkills[i].name,
        value: newSkills[i].name,
        rating: newSkills[i].rate,
      };
      newData.push(objData);
    }
    dispatch(change(formKey, 'skillsCount', newData));
    dispatch(change(formKey, 'skillsRating', newData));
    dispatch(untouch(formKey, 'skillsCount'));
    dispatch(untouch(formKey, 'skillsRating'));
    onChangeSkills(newData);
  };

  onClickHandlerRating = (indexCurrent, value) => {
    const { dispatch, formKey: key, skills, onChangeSkills } = this.props;
    const temp = jsonCopy(skills);
    temp[indexCurrent].rating = value;
    dispatch(change(key, 'skillsCount'), temp);
    dispatch(change(key, 'skillsRating', temp));
    onChangeSkills(temp);
  };

  handleSelectChangeTags = (selectedValues = []) => {
    const { dispatch, onChangeSkills, formKey: key, skills = [] } = this.props;
    const selected =
      selectedValues.map(s => {
        const previousValue = skills.find(os => os.value === s.value);
        if (previousValue) {
          s.rating = previousValue.rating;
        }
        return s;
      }) || [];
    dispatch(change(key, 'skillsCount', selected));
    dispatch(change(key, 'skillsRating', selected));
    dispatch(untouch(key, 'skillsRating'));
    onChangeSkills(selected);
  };

  render() {
    const { skills } = this.props;
    const { skillsList } = this.state;
    return (
      <React.Fragment>
        <Row>
          <Col>
            <FormGroup>
              <FormLabel className="d-inline-flex align-items-center">
                <FormattedMessage {...messages.secondaryLabelSkills} />
                <P className="p14 ms-1 mb-0" opacityVal="0.5">
                  <FormattedMessage {...messages.labelSkillsMsg} />
                </P>
              </FormLabel>
              <Field
                name="skills"
                component={renderSelectTags}
                value={skills}
                onChange={this.handleSelectChangeTags}
                options={skillsList.map(item => ({
                  label: item,
                  value: item,
                }))}
                isMulti
                optionLimit="7"
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                validate={getFieldValidator('skillsCount', true)}
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Field
            name="skillsRating"
            component={renderSelectRatings}
            itemList={skills}
            onChangeRating={this.onClickHandlerRating}
            message={messages.labelProfSkillRatings}
            errorText={messages.skillErrorText}
            forceValidate
            // validate={getFieldValidator('skillsRating', true)}
          />
        </FormGroup>
      </React.Fragment>
    );
  }
}

SkillRating.propTypes = propTypes;
