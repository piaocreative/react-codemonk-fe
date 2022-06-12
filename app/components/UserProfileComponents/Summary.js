import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from 'reactstrap';
import { FormLabel } from 'components';
import { FormattedMessage } from 'react-intl';
import { Field, change } from 'redux-form/immutable';
import { EditorState } from 'draft-js';
import { renderTextEditor } from 'utils/Fields';
import { getFieldValidator } from './fields';
import { setInputClass } from './utils';
import messages from './messages';

export class SummaryComponents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { onBoarding, onChangeBrief } = this.props;
    if (onBoarding) {
      onChangeBrief(EditorState.createEmpty());
    }
  }

  onEditorStateChange = editorState => {
    const { onChangeBrief, formKey: key } = this.props;
    const { dispatch } = this.props;
    dispatch(change(key, 'briefHTML', editorState));
    onChangeBrief(editorState);
  };

  render() {
    const { briefHTML, size } = this.props;
    return (
      <React.Fragment>
        <FormGroup className={setInputClass(size)}>
          <FormLabel>
            <FormattedMessage {...messages.labelBrief} />
          </FormLabel>
          <Field
            name="briefHTML"
            component={renderTextEditor}
            editorState={briefHTML}
            placeholder={messages.labelBriefPlaceholder.defaultMessage}
            onChange={editorState => this.onEditorStateChange(editorState)}
            validate={getFieldValidator('briefHTML', true)}
          />
        </FormGroup>
      </React.Fragment>
    );
  }
}

SummaryComponents.defaultProps = {
  size: '',
  onBoarding: false,
};
SummaryComponents.propTypes = {
  onBoarding: PropTypes.bool,
  size: PropTypes.string,
  briefHTML: PropTypes.any,
  onChangeBrief: PropTypes.func,
  dispatch: PropTypes.func,
  formKey: PropTypes.string,
};
