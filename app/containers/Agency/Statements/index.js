/** Statements
 * This is the Statements page for the agency, at the '/talent/agency-statements' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import Content from 'components/Content';
import ComingSoon from 'components/ComingSoon';
import messages from './messages';

export class Statements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <Content>
          <ComingSoon entity="statements" />
        </Content>
      </React.Fragment>
    );
  }
}
export default Statements;
