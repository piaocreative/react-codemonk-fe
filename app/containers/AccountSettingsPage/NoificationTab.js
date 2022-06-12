/** Notification Tab
 * '/account-setting' route
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Label, Input } from 'reactstrap';
import { H4, P, CheckBoxContainer } from 'components';
import { NOTIFICATION_LIST, PREFERENCES } from './constants';
import messages from './messages';
import { NoificationContent, LabelContainer, FieldContainer } from './styles';

const NoificationTab = () => (
  <NoificationContent>
    <H4 className="newH4 mt-4 mb-3" opacityVal="0.5">
      <FormattedMessage {...messages.updateYourNotificationPreferences} />
    </H4>
    <div className="notifications">
      <div className="d-flex align-items-center">
        <LabelContainer />
        <FieldContainer className="d-flex justify-content-sm-end">
          {PREFERENCES.map(preferece => (
            <P className="p14 mx-1 ml-2 mt-4 notification-item" key={preferece}>
              {preferece}
            </P>
          ))}
        </FieldContainer>
      </div>
      {NOTIFICATION_LIST.map(item => (
        <div className="d-flex align-items-center">
          <LabelContainer>
            <P className="p14 m-0 mr-2 mt-2" lineHeight="22">
              {item}
            </P>
          </LabelContainer>
          <FieldContainer className="d-flex">
            <CheckBoxContainer className="d-flex mb-0 mx-2 notification-item">
              <Label className="checkbox-label d-flex mb-3">
                <Input type="checkbox" className="rounded-1" checked />
                <span className="checkmark" />
              </Label>
            </CheckBoxContainer>
            <CheckBoxContainer className="d-flex mb-0 mx-2 d-flex notification-item">
              <Label className="checkbox-label mb-3">
                <Input type="checkbox" className="rounded-1" disabled />
                <span className="checkmark" />
              </Label>
            </CheckBoxContainer>
            <CheckBoxContainer className="d-flex mb-0 mx-2 d-flex notification-item">
              <Label className="checkbox-label mb-3">
                <Input type="checkbox" className="rounded-1" disabled />
                <span className="checkmark" />
              </Label>
            </CheckBoxContainer>
          </FieldContainer>
        </div>
      ))}
    </div>
  </NoificationContent>
);

export default NoificationTab;
