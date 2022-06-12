import React from 'react';
import { FormGroup, Row, Col } from 'reactstrap';
import { H4, FormLabel } from 'components';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form/immutable';
import { defaultProps, propTypes } from 'containers/proptypes';
import containerMessage from 'containers/messages';
import { renderField, renderTextEditor } from 'utils/Fields';
import { getFieldValidator } from './fields';
import messages from './messages';

export const TradingDetailsFields = props => {
  const { tradingSummary, editFlag = true } = props;

  return (
    <React.Fragment>
      <H4>
        <FormattedMessage {...messages.titleTradingDetails} />
      </H4>
      <Row className="row-spacing">
        <Col md="6">
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...messages.labelTradingName} />
            </FormLabel>
            <Field
              name="tradingName"
              type="text"
              component={renderField}
              disabled={!editFlag}
              placeholder={messages.placeHolderTradingName.defaultMessage}
              validate={getFieldValidator('tradingName', true)}
            />
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...containerMessage.labelWeb} />
            </FormLabel>
            <Field
              name="tradingWebsite"
              type="text"
              component={renderField}
              disabled={!editFlag}
              placeholder={messages.placeHolderWebsite.defaultMessage}
              validate={getFieldValidator('tradingWebsite', true)}
            />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <FormLabel>
          <FormattedMessage {...messages.labelSummary} />
        </FormLabel>
        <Field
          name="tradingSummary"
          component={renderTextEditor}
          disabled={!editFlag}
          editorState={tradingSummary}
          placeholder={messages.placeHolderSummary.defaultMessage}
          validate={getFieldValidator('tradingSummary', true)}
        />
      </FormGroup>
    </React.Fragment>
  );
};

TradingDetailsFields.defaultProps = defaultProps;
TradingDetailsFields.propTypes = propTypes;
