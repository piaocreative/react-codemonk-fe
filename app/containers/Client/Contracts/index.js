/** Contracts
 * This is the Projects page for the client, at the '/client/contracts' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import Content from 'components/Content';
import ComingSoon from 'components/ComingSoon';
import messages from './messages';

export class Contracts extends React.Component {
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
          <ComingSoon entity="contracts" />
        </Content>
      </React.Fragment>
    );
  }
}

export default Contracts;
