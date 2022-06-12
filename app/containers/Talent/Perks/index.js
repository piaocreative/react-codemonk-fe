/** Perks
 * This is the Projects page for the client, at the '/client/perks' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import Content from 'components/Content';
import ComingSoon from 'components/ComingSoon';
import messages from './messages';

export class Perks extends React.Component {
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
          <ComingSoon entity="perks" />
        </Content>
      </React.Fragment>
    );
  }
}
export default Perks;
