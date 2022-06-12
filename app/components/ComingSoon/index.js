/** ComingSoon **/
import React from 'react';
import { FormGroup } from 'reactstrap';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import SVG from 'react-inlinesvg';
import { toast } from 'react-toastify';
import StorageService from 'utils/StorageService';
import request from 'utils/request';
import get from 'lodash/get';
import { VALIDATION } from 'utils/constants';
import ToastifyMessage from 'components/ToastifyMessage';
import { filesIcon, API_URL, NEWS_LETTER, CLIENT } from 'containers/App/constants';
import { renderFieldoptCheckbox } from 'utils/Fields';
import { P, H1, Button, OnBoardingFormBody, FormControlWrapper, FormControl } from 'components';
import { defaultProps, propTypes } from 'containers/proptypes';
import { ComingSoonBlock } from './styles';
import messages from './messages';

export class ComingSoon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agreed: false,
      loading: false,
    };
  }

  handleSubscribe = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const { entity } = this.props;
    const apiCallData = {
      method: 'POST',
      body: {
        entity,
      },
    };
    const requestURL = `${API_URL}${CLIENT}${NEWS_LETTER}`;
    request(requestURL, apiCallData)
      .then(this.onSubmitSuccess)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  onSubmitSuccess = response => {
    if (get(response, 'status')) {
      this.setState({ loading: false });
      toast.success(<ToastifyMessage message={get(response, 'message')} type="success" />, { className: 'Toast-success' });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  render() {
    const { agreed = false, loading } = this.state;
    const emailAddress = StorageService.get('userEmail') || '';
    return (
      <ComingSoonBlock className="flex-1 align-items-center d-flex">
        <div className="inner-content">
          <SVG src={filesIcon} className="mb-3" />
          <H1>{messages.emptyStateHeader.defaultMessage}</H1>
          <p>{messages.emptyStateContent.defaultMessage}</p>
          <OnBoardingFormBody className="my-0">
            <FormGroup>
              <FormControlWrapper>
                <FormControl className="form-control" name="email" value={emailAddress} type="text" placeholder="Email address" disabled />
              </FormControlWrapper>
            </FormGroup>
            <P className="checkbox text-start">
              <small>
                <Field
                  name="newsletter"
                  type="checkbox"
                  component={renderFieldoptCheckbox}
                  message={messages.newsLetterText.defaultMessage}
                  onClick={e => {
                    this.setState({ agreed: e.target.checked });
                  }}
                />
              </small>
            </P>
          </OnBoardingFormBody>
          <Button className={`${loading && 'loading'} btn btn-primary`} disabled={!agreed} onClick={e => this.handleSubscribe(e)}>
            {messages.btnSubscribe.defaultMessage}
          </Button>
        </div>
      </ComingSoonBlock>
    );
  }
}

ComingSoon.defaultProps = defaultProps;
ComingSoon.propTypes = propTypes;

export default compose(
  reduxForm({
    form: 'ComingSoon',
    touchOnChange: true,
  }),
)(ComingSoon);
