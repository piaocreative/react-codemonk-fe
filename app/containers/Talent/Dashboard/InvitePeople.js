/**
 * Invite Friends Page
 *
 */

import React, { Component } from 'react';
import { Field, change } from 'redux-form/immutable';
import * as formValidations from 'utils/formValidations';
import { renderField } from 'utils/Fields';
import { FormGroup } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { FormLabel, P } from 'components';
import containerMessage from 'containers/messages';
import messages from './messages';
import { propTypes } from './proptypes';

export class InvitePeople extends Component {
  handleChangeInviteMail = (e, index) => {
    const { dispatch, formKey: key, onChangeInvite, inviteMails } = this.props;
    const newInviteMail = e.target.value;

    dispatch(change(key, `email${index}`, newInviteMail));
    const invite = inviteMails;
    invite[index].email = newInviteMail;
    onChangeInvite(invite);
  };

  handleChangeInviteName = (e, index) => {
    const { dispatch, key, onChangeInvite, inviteMails } = this.props;
    const newInviteName = e.target.value;

    dispatch(change(key, `name${index}`, newInviteName));
    const invite = inviteMails;
    invite[index].name = newInviteName;
    onChangeInvite(invite);
  };

  render() {
    const { inviteMails } = this.props;
    return (
      <React.Fragment>
        <form>
          <table className="table">
            <thead>
              <tr>
                <td className="border-0 py-1 px-0">
                  <FormLabel>
                    <FormattedMessage {...containerMessage.labelEmailAddress} />
                  </FormLabel>
                </td>
                <td className="border-0 py-1 px-0">
                  <FormLabel className="d-inline-flex align-items-center">
                    <FormattedMessage {...messages.labelFullName} />
                    <P className="p14 ms-1 mb-0 text-capitalize" opacityVal="0.5">
                      <FormattedMessage {...containerMessage.optionalText} />
                    </P>
                  </FormLabel>
                </td>
              </tr>
            </thead>
            <tbody className="border-1">
              {inviteMails.map((inviteMail, index) => (
                <tr key={inviteMail}>
                  <td className="py-1 px-0">
                    <FormGroup className="input-sm mb-0">
                      <Field
                        name={`email${index}`}
                        component={renderField}
                        type="text"
                        defaultValue={inviteMails[index].email}
                        placeholder={containerMessage.placeholderEmailAddress.defaultMessage}
                        onChange={e => this.handleChangeInviteMail(e, index)}
                        validate={[formValidations.email]}
                      />
                    </FormGroup>
                  </td>
                  <td className="py-1 px-0">
                    <FormGroup className="input-sm left-border mb-0">
                      <Field
                        name={`name${index}`}
                        component={renderField}
                        type="text"
                        defaultValue={inviteMails[index].name}
                        placeholder={messages.placeholderFullName.defaultMessage}
                        onChange={e => this.handleChangeInviteName(e, index)}
                      />
                    </FormGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </React.Fragment>
    );
  }
}

InvitePeople.propTypes = propTypes;
