import React from 'react';
import { FormGroup, Row, Col } from 'reactstrap';
import { FormLabel, P } from 'components';

import { FormattedMessage } from 'react-intl';
import { Field, change, untouch } from 'redux-form/immutable';
import { languageData } from 'containers/App/constants';
import { propTypes } from 'containers/proptypes';
import containerMessage from 'containers/messages';
import { renderSelectTags, renderSelectRatings } from 'utils/Fields';
import { languageLabel } from 'containers/MyProfilePage/components/utils';
import { getFieldValidator } from './fields';
import { jsonCopy } from './utils';
import messages from './messages';

export class LanguageRating extends React.Component {
  componentDidMount() {
    const { onBoarding, language, formKey, dispatch, languageCount } = this.props;
    if (!onBoarding) this.setValues(language, formKey);
    else {
      dispatch(change(formKey, 'languageCount', languageCount));
      dispatch(change(formKey, 'languageRating', languageCount));
    }
  }

  setValues = (language, formKey) => {
    const { dispatch, onChangeLanguage } = this.props;
    const newSkills = jsonCopy(language);
    const newData = [];
    for (let i = 0; i < newSkills.length; i++) {
      const label = languageLabel(newSkills[i]);
      const objData = {
        value: newSkills[i].name,
        rating: newSkills[i].rate,
        label,
      };
      newData.push(objData);
    }
    dispatch(change(formKey, 'languageCount', newData));
    dispatch(change(formKey, 'languageRating', newData));

    dispatch(untouch(formKey, 'languageCount'));
    dispatch(untouch(formKey, 'languageRating'));
    onChangeLanguage(newData);
  };

  onClickHandlerRating = (indexCurrent, value) => {
    const { dispatch, onChangeLanguage, language, formKey: key } = this.props;
    const temp = jsonCopy(language);
    temp[indexCurrent].rating = value;
    dispatch(change(key, 'languageCount', temp));
    dispatch(change(key, 'languageRating', temp));
    onChangeLanguage(temp);
  };

  handleSelectChangeTags = selectedValues => {
    const { dispatch, onChangeLanguage, formKey: key } = this.props;
    const selected = selectedValues || [];
    dispatch(change(key, 'languageCount', selected));
    dispatch(change(key, 'languageRating', selected));
    dispatch(untouch(key, 'languageRating'));
    onChangeLanguage(selected);
  };

  render() {
    const { language } = this.props;
    return (
      <React.Fragment>
        <Row>
          <Col>
            <FormGroup>
              <FormLabel className="d-inline-flex align-items-center">
                <FormattedMessage {...messages.labelLanguage} />
                <P className="p14 ms-1 mb-0" opacityVal="0.5">
                  <FormattedMessage {...messages.labelLanguagesMsg} />
                </P>
              </FormLabel>
              <Field
                name="languageCount"
                component={renderSelectTags}
                value={language}
                onChange={this.handleSelectChangeTags}
                options={languageData.map(l => ({
                  label: l.language,
                  value: l.code,
                }))}
                isMulti
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                validate={getFieldValidator('languageCount', true)}
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Field
            name="languageRating"
            component={renderSelectRatings}
            itemList={language}
            onChangeRating={this.onClickHandlerRating}
            message={messages.labelSkillRatings}
            validate={getFieldValidator('languageRating', true)}
            noTooltip
          />
        </FormGroup>
      </React.Fragment>
    );
  }
}

LanguageRating.propTypes = propTypes;
