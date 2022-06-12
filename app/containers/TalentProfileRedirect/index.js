/**
 * TalentProfileRedirect Details Page
 * This is the TalentProfileRedirect page for the App
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import StorageService from 'utils/StorageService';
import { dashboardPath } from 'utils/Helper';
import history from 'utils/history';
import { defaultProps, propTypes } from 'containers/proptypes';
import { Card, ContainerMod, P, H3, Button } from 'components';
import messages from './messages';

export const redirectToHome = () => {
  const pathname = dashboardPath();
  history.replace(pathname);
};

export const renderNoAccess = () => (
  <React.Fragment>
    <Helmet>
      <title>{messages.title.defaultMessage}</title>
      <meta name="description" content={messages.metaTitle.defaultMessage} />
    </Helmet>
    <ContainerMod>
      <Card className="text-center">
        <H3 className="text-primary mb-5">
          <FormattedMessage {...messages.heading} />
        </H3>
        <P className="text-muted">
          <FormattedMessage {...messages.talentProfileHeading} />
        </P>
        <Button className="btn btn-sm btn-outline mt-3" onClick={redirectToHome}>
          <FormattedMessage {...messages.backToHome} />
        </Button>
      </Card>
    </ContainerMod>
  </React.Fragment>
);

export const redirectToProfilePage = (userType, talentID) => {
  const output = { redirect: false, path: '' };
  if (userType === '2') {
    output.redirect = true;
    output.path = `/client/talent-profile/${talentID}`;
  } else if (userType === '4') {
    output.redirect = true;
    output.path = `/admin/talent-profile/${talentID}`;
  }
  return output;
};

export const TalentProfileRedirect = props => {
  const talentID = get(props, 'match.params.talentID');
  const userType = StorageService.get('userType');
  const { redirect, path } = redirectToProfilePage(userType, talentID);

  let output = '';
  if (redirect) history.replace(path);
  else output = renderNoAccess();

  return output;
};

TalentProfileRedirect.defaultProps = defaultProps;
TalentProfileRedirect.propTypes = propTypes;
export default TalentProfileRedirect;
