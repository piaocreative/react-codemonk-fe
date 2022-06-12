import React from 'react';
import { FormattedMessage } from 'react-intl';
import { H1, FormLabel } from 'components';
import { FormGroup } from 'reactstrap';
import { Field } from 'redux-form/immutable';
import { defaultProps, propTypes } from 'containers/proptypes';
import * as formValidations from 'utils/formValidations';
import { renderTextEditor } from 'utils/Fields';
import StepFooter from './StepFooter';
import messages from './messages';

export class Step5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onEditorStateChange = editorState => {
    const { onChangeMessage } = this.props;
    onChangeMessage(editorState);
  };

  render() {
    const { messageToPreSales } = this.props;
    return (
      <React.Fragment>
        <H1>
          <FormattedMessage {...messages.titleStep5} />
        </H1>
        <FormGroup>
          <FormLabel>
            <FormattedMessage {...messages.labelMessage} />
          </FormLabel>
          <Field
            name="message"
            component={renderTextEditor}
            placeholder={messages.placeholderMessage.defaultMessage}
            editorState={messageToPreSales}
            onChange={editorState => this.onEditorStateChange(editorState)}
            validate={[formValidations.requiredField, formValidations.minLengthRichText2, formValidations.maxLengthRichText1000]}
          />
        </FormGroup>
        <StepFooter step={5} {...this.props} />
      </React.Fragment>
    );
  }
}

Step5.defaultProps = defaultProps;
Step5.propTypes = propTypes;

export default Step5;
