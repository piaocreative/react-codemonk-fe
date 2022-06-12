/** OtherSkills Page
 * This is the OtherSkills page for the App, at the '/my-profile' route
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import { Card, P, Badge } from 'components';
import { propTypes } from 'containers/Auth/ProfessionalDetail/proptypes';
import messages from '../messages';

export class OtherSkills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Card className="p-30">
          <P className="p20">
            <FormattedMessage {...messages.alsoKnows} />
          </P>
          <div className="d-flex flex-wrap">
            {get(this.props, 'data', [])
              .filter((item, index) => index > 6)
              .map(item => (
                <Badge className="primary badge-sm me-2 mb-2">{item.name}</Badge>
              ))}
          </div>
        </Card>
      </React.Fragment>
    );
  }
}

OtherSkills.propTypes = propTypes;

export default OtherSkills;
