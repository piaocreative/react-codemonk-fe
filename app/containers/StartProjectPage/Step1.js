import React from 'react';
import { FormattedMessage } from 'react-intl';
import { H1, FormLabel } from 'components';
import { FormGroup } from 'reactstrap';
import { Field } from 'redux-form/immutable';
import { renderField, renderTextEditor } from 'utils/Fields';
import * as formValidations from 'utils/formValidations';
import containerMessage from 'containers/messages';
import StorageService from 'utils/StorageService';
import { defaultProps, propTypes } from 'containers/proptypes';
import { IntroStepBlock } from './styles';
import messages from './messages';
import StepFooter from './StepFooter';

export class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    if (!StorageService.get('stepCompleted')) {
      StorageService.set('stepCompleted', 1, { hash: true });
    }
  }

  onEditorStateChange = editorState => {
    const { onChangeProjectDecription } = this.props;
    onChangeProjectDecription(editorState);
  };

  render() {
    const { name, onChangeProjectName, description } = this.props;
    return (
      <IntroStepBlock>
        <H1>
          <FormattedMessage {...messages.titleStep1} />
        </H1>
        <FormGroup>
          <FormLabel>
            <FormattedMessage {...containerMessage.labelProjectName} />
          </FormLabel>
          <Field
            name="projectName"
            type="text"
            component={renderField}
            placeholder={containerMessage.placeholderProjectName.defaultMessage}
            value={name}
            onChange={onChangeProjectName}
            validate={[formValidations.required, formValidations.minLength2, formValidations.maxLength50]}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>
            <FormattedMessage {...messages.labelProjectDecription} />
          </FormLabel>
          <Field
            name="description"
            component={renderTextEditor}
            placeholder={messages.placeholderProjectDecription.defaultMessage}
            editorState={description}
            onChange={editorState => this.onEditorStateChange(editorState)}
            validate={[formValidations.requiredField, formValidations.minLengthRichText100, formValidations.maxLengthRichText1500]}
          />
        </FormGroup>
        <StepFooter step={1} {...this.props} />
      </IntroStepBlock>
    );
  }
}

Step1.defaultProps = defaultProps;
Step1.propTypes = propTypes;

export default Step1;
