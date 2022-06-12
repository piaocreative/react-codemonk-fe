/** Skills Page
 * This is the Skills page for the App, at the '/my-profile' route
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import SVG from 'react-inlinesvg';
import get from 'lodash/get';
import { Card, P, Badge, ProgressMod } from 'components';
import containerMessage from 'containers/messages';
import { professionIcon } from 'containers/App/constants';
import { propTypes } from 'containers/Auth/ProfessionalDetail/proptypes';
import { SkillListing } from 'containers/Talent/Dashboard/styles';
import { SkillContainer } from '../styles';
import messages from '../messages';

export class Skills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { role } = this.props;
    return (
      <React.Fragment>
        <Card className="p-30">
          <P className="p20">
            <FormattedMessage {...messages.titleSkills} />
          </P>

          <SkillContainer>
            <div className="hard-skills">
              <div className="d-flex align-items-center">
                <SVG className="me-2" src={professionIcon} />
                <P className="p14 mb-0">
                  {role !== '2' ? (
                    <FormattedMessage {...containerMessage.yourTopSkills} />
                  ) : (
                    <FormattedMessage {...containerMessage.topSkills} />
                  )}
                </P>
              </div>
              <SkillListing>
                {get(this.props, 'data', [])
                  .filter((item, index) => index < 7)
                  .map(item => (
                    <li key={item.name}>
                      <div className="d-flex">
                        <Badge className="badge-sm primary">{item.name}</Badge>
                      </div>
                      <ProgressMod value={item.rate} max={10} className="sm ms-auto" />
                    </li>
                  ))}
              </SkillListing>
            </div>
          </SkillContainer>
        </Card>
      </React.Fragment>
    );
  }
}

Skills.propTypes = propTypes;

export default Skills;
