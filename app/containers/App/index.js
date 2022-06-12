/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { ToastContainer, Slide } from 'react-toastify';
import { Switch, Route } from 'react-router-dom';
import { pageUpdate } from 'utils/Helper';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import PrivateLayout from 'components/Layouts/PrivateLayout';
import AuthLayout from 'components/Layouts/AuthLayout';
import SignInLayout from 'components/Layouts/SignInLayout';
import SignInLayoutV2 from 'components/Layouts/SignInLayoutV2';
import ClientHomePage from 'containers/ClientHomePage/Loadable';
import StartProjectPage from 'containers/StartProjectPage/Loadable';
import RequestReceivedPage from 'containers/RequestReceivedPage/Loadable';
import AccountSettingsPage from 'containers/AccountSettingsPage/Loadable';
import MyProfilePage from 'containers/MyProfilePage/Loadable';
import LoginPage from 'containers/Auth/LoginPage/Loadable';
import SignUpPage from 'containers/Auth/SignUp/Loadable';
import ForgotPasswordPage from 'containers/Auth/ForgotPasswordPage/Loadable';
import VerifyEmailPage from 'containers/Auth/VerifyEmailPage/Loadable';
import ResetPasswordPage from 'containers/Auth/ResetPasswordPage/Loadable';
import PasswordResetSuccess from 'containers/Auth/PasswordResetSuccess/Loadable';

import VerificationPage from 'containers/Auth/Verification/Loadable';
import TalentEmailVerification from 'containers/Auth/TalentEmailVerification/Loadable';
import AboutYouPage from 'containers/Auth/Client/AboutYouPage/Loadable';
import AboutCompanyPage from 'containers/Auth/Client/AboutCompanyPage/Loadable';
import CompanyLocationPage from 'containers/Auth/Client/CompanyLocationPage/Loadable';
import RegistrationTypePage from 'containers/Auth/Talent/RegistrationTypePage/Loadable';
import TalentCreateProfilePage from 'containers/Auth/Talent/AgencyCreateProfilePage/Loadable';
import AddTalentsPage from 'containers/Auth/Talent/AddTalentsPage/Loadable';
import AgencyCertificatesPage from 'containers/Auth/Talent/AgencyCertificatesPage/Loadable';
import PayoutDetailsPage from 'containers/Auth/Talent/PayoutDetailsPage/Loadable';
import AgencyAccountSettingsPage from 'containers/AgencyAccountSettingsPage/Loadable';
import DocumentsPage from 'containers/Auth/Talent/DocumentsPage/Loadable';
import AddDirectorsPage from 'containers/Auth/Talent/AddDirectorsPage/Loadable';
import UploadCV from 'containers/Auth/Talent/UploadCV/Loadable';
import PersonalDetails from 'containers/Auth/PersonalDetails/Loadable';
import KeyProjects from 'containers/Auth/KeyProjects/Loadable';
import Preferences from 'containers/Auth/Preferences/Loadable';
import WorkExperience from 'containers/Auth/WorkExperience/Loadable';
import SalaryAndBilling from 'containers/Auth/SalaryAndBilling/Loadable';
import DocumentUpload from 'containers/Auth/DocumentUpload/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import TalentListingPage from 'containers/TalentListingPage/Loadable';
import EducationCertification from 'containers/Auth/Education-Certification/Loadable';
import UserReferral from 'containers/Auth/UserReferral/Loadable';
import ClientProfile from 'containers/ClientProfile/Loadable';
import ClientAccountSettingsPage from 'containers/ClientAccountSettingsPage/Loadable';
import AdminDashboard from 'containers/Admin/Dashboard/Loadable';
import AdminProjects from 'containers/Admin/Projects/Loadable';
import AdminClients from 'containers/Admin/Clients/Loadable';
import AdminAgencies from 'containers/Admin/Agencies/Loadable';
import AdminTalents from 'containers/Admin/Talents/Loadable';
import ClientDetailPage from 'containers/Admin/ClientDetailPage/Loadable';
import AgencyDetailPage from 'containers/Admin/AgencyDetailPage/Loadable';
import InterviewRequests from 'containers/Admin/InterviewRequests/Loadable';
import InterviewDetailPage from 'containers/Admin/InterviewDetailPage/Loadable';
import Referrals from 'containers/Admin/Referrals/Loadable';
import AgencyProfilePage from 'containers/Agency/ProfilePage/Loadable';
import ClientBrief from 'containers/Client/Briefs/Loadable';
import ClientBriefDetail from 'containers/Client/BriefsDetail/Loadable';
import ClientProjects from 'containers/Client/Projects/Loadable';
import ClientProjectDetailPage from 'containers/Client/ProjectDetailPage/Loadable';
import ClientTalents from 'containers/Client/Talents/Loadable';
import ClientBilling from 'containers/Client/Billing/Loadable';
import ClientContracts from 'containers/Client/Contracts/Loadable';
import ClientPayments from 'containers/Client/Payments/Loadable';
import Timesheets from 'containers/Timesheets/Loadable';
import TalentBriefs from 'containers/Talent/Briefs/Loadable';
import TalentBriefsDetail from 'containers/Talent/BriefsDetail/Loadable';
import TalentKnowledgeBase from 'containers/Talent/KnowledgeBase/Loadable';
import TalentCareerPath from 'containers/Talent/CareerPath/Loadable';
import TalentLearningDevelopment from 'containers/Talent/LearningDevelopment/Loadable';
import TalentPerks from 'containers/Talent/Perks/Loadable';
import TalentWellbeing from 'containers/Talent/Wellbeing/Loadable';
import Dashboard from 'containers/Talent/Dashboard/Loadable';
import Invoices from 'containers/CommingSoonPages/Invoices/Loadable';
import AgencyStatements from 'containers/Agency/Statements/Loadable';
import AgencyPlanning from 'containers/Agency/Planning/Loadable';
import AgencyMyTeam from 'containers/Agency/MyTeam/Loadable';
import AgencyQuotes from 'containers/Agency/Quotes/Loadable';
import AgencyQuoteDetail from 'containers/Agency/QuoteDetail/Loadable';
import MyProjects from 'containers/Talent/MyProjects/Loadable';
import MyProjectDetail from 'containers/Talent/MyProjectDetail/Loadable';
import AgencyProjectDetail from 'containers/Agency/ProjectDetail/Loadable';
import Quotes from 'containers/Quotes/Loadable';
import QuoteDetail from 'containers/QuoteDetail/Loadable';
import TalentProfileRedirect from 'containers/TalentProfileRedirect/Loadable';
import FeatureJobWidget from 'containers/ExternalComponents/FeatureJobWidget';
import FeatureDevlopersWidget from 'containers/ExternalComponents/FeatureDevlopersWidget';
import { USER, CLIENT, ADMIN, AGENCY, TALENT, routes } from './constants';
import GlobalStyle from '../../global-styles';

const privateRoutes = [
  { ...routes[0], component: Dashboard },
  { ...routes[1], component: MyProfilePage },
  { ...routes[2], component: AccountSettingsPage },
  { ...routes[3], component: Timesheets },
  { ...routes[4], component: TalentBriefs },
  { ...routes[5], component: TalentBriefsDetail },
  { ...routes[6], component: TalentKnowledgeBase },
  { ...routes[7], component: TalentCareerPath },
  { ...routes[8], component: TalentLearningDevelopment },
  { ...routes[9], component: TalentPerks },
  { ...routes[10], component: TalentWellbeing },
  { ...routes[11], component: Invoices },
  { ...routes[12], component: MyProjects },
  { ...routes[13], component: MyProjectDetail },
  { ...routes[14], component: Dashboard },
  { ...routes[15], component: AgencyProfilePage },
  { ...routes[16], component: AgencyAccountSettingsPage },
  { ...routes[17], component: AgencyQuotes },
  { ...routes[18], component: AgencyQuoteDetail },
  { ...routes[19], component: MyProjects },
  { ...routes[20], component: AgencyProjectDetail },
  { ...routes[21], component: Timesheets },
  { ...routes[22], component: Invoices },
  { ...routes[23], component: AgencyStatements },
  { ...routes[24], component: AgencyMyTeam },
  { ...routes[25], component: AgencyPlanning },
  { ...routes[26], component: MyProfilePage },
  { ...routes[27], component: ClientHomePage },
  { ...routes[28], component: StartProjectPage },
  { ...routes[29], component: RequestReceivedPage },
  { ...routes[30], component: TalentListingPage },
  { ...routes[31], component: ClientProfile },
  { ...routes[32], component: MyProfilePage },
  { ...routes[33], component: ClientAccountSettingsPage },
  { ...routes[34], component: ClientBrief },
  { ...routes[35], component: ClientBriefDetail },
  { ...routes[36], component: ClientProjects },
  { ...routes[37], component: ClientTalents },
  { ...routes[38], component: ClientBilling },
  { ...routes[39], component: ClientContracts },
  { ...routes[40], component: ClientPayments },
  { ...routes[41], component: ClientProjectDetailPage },
  { ...routes[42], component: Timesheets },
  { ...routes[43], component: AdminDashboard },
  { ...routes[44], component: AdminProjects },
  { ...routes[45], component: ClientBrief },
  { ...routes[46], component: InterviewRequests },
  { ...routes[47], component: Quotes },
  { ...routes[48], component: AdminTalents },
  { ...routes[49], component: Timesheets },
  { ...routes[50], component: AdminClients },
  { ...routes[51], component: AdminAgencies },
  { ...routes[52], component: ClientProjectDetailPage },
  { ...routes[53], component: ClientDetailPage },
  { ...routes[54], component: AgencyDetailPage },
  { ...routes[55], component: InterviewDetailPage },
  { ...routes[56], component: MyProfilePage },
  { ...routes[57], component: ClientBriefDetail },
  { ...routes[58], component: QuoteDetail },
  { ...routes[59], component: Referrals },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUpdate() {
    pageUpdate();
  }

  render() {
    const login = '/login';
    const signup = '/signup';
    const forgotPwd = '/forgot-password';
    const verifyEmail = '/verifyemail';
    const pwdResetSuccess = '/password-reset-success';
    const verification = '/verification';
    const resetPwd = '/reset-password';
    const verificationMail = '/verification-mail';

    return (
      <div>
        <Helmet titleTemplate="%s - CodeMonk" defaultTitle="CodeMonk">
          <meta name="description" content="CodeMonk" />
        </Helmet>

        <ToastContainer
          className="Toast"
          type="default"
          position="top-center"
          autoClose={3000}
          hideProgressBar
          pauseOnHover={false}
          transition={Slide}
          draggable={false}
        />

        <Switch>
          <Route path="/feature-job-widget" component={FeatureJobWidget} />
          <Route path="/feature-developers-widget" component={FeatureDevlopersWidget} />
          <SignInLayoutV2 exact path="/" component={SignUpPage} />
          <SignInLayoutV2 path={signup} component={SignUpPage} />
          <SignInLayoutV2 path={login} component={LoginPage} />
          <SignInLayoutV2 path={forgotPwd} component={ForgotPasswordPage} />
          <SignInLayoutV2 path={verifyEmail} component={VerifyEmailPage} />

          <AuthLayout path={`${USER}/profile-view/:talentID`} component={TalentProfileRedirect} redirectToPage />

          {/* Talent user urls */}
          <SignInLayoutV2 path={`${TALENT}${login}`} component={LoginPage} />
          <SignInLayoutV2 path={`${TALENT}${signup}/:talentToken`} component={SignUpPage} />
          <SignInLayoutV2 path={`${TALENT}${signup}`} component={SignUpPage} />
          <SignInLayoutV2 path={`${TALENT}${verifyEmail}`} component={VerifyEmailPage} />
          <SignInLayoutV2 path={`${TALENT}${forgotPwd}`} component={ForgotPasswordPage} />
          <SignInLayoutV2 path={`${TALENT}${pwdResetSuccess}`} component={PasswordResetSuccess} />
          <SignInLayoutV2 path={`${TALENT}${verification}`} component={VerificationPage} />
          <SignInLayoutV2 path={`${TALENT}${verificationMail}/:emailID`} component={TalentEmailVerification} />
          <SignInLayoutV2 path={`${TALENT}${resetPwd}/:resetToken`} component={ResetPasswordPage} />
          <SignInLayoutV2 path={`${TALENT}/referral/:userId`} component={UserReferral} />
          <AuthLayout path={`${TALENT}/registration-type`} component={RegistrationTypePage} />
          <AuthLayout path={`${TALENT}/create-profile`} component={TalentCreateProfilePage} />
          <AuthLayout path={`${TALENT}/upload-cv`} component={UploadCV} />
          <AuthLayout path={`${TALENT}/about-you`} component={PersonalDetails} />
          <AuthLayout path={`${TALENT}/projects`} component={KeyProjects} />
          <AuthLayout path={`${TALENT}/preferences`} component={Preferences} />
          <AuthLayout path={`${TALENT}/experience`} component={WorkExperience} />
          <AuthLayout path={`${TALENT}/qualifications`} component={EducationCertification} />
          <AuthLayout path={`${TALENT}/salary-billing`} component={SalaryAndBilling} />
          <AuthLayout path={`${TALENT}/document-upload`} component={DocumentUpload} />

          {/* Agency user urls */}
          <SignInLayout path={`${AGENCY}${login}`} component={LoginPage} />
          <SignInLayout path={`${AGENCY}${signup}/:talentToken`} component={SignUpPage} />
          <SignInLayout path={`${AGENCY}${signup}`} component={SignUpPage} />
          <SignInLayout path={`${AGENCY}${verifyEmail}`} component={VerifyEmailPage} />
          <SignInLayout path={`${AGENCY}${forgotPwd}`} component={ForgotPasswordPage} />
          <SignInLayout path={`${AGENCY}${pwdResetSuccess}`} component={PasswordResetSuccess} />
          <SignInLayout path={`${AGENCY}${verification}`} component={VerificationPage} />
          <SignInLayout path={`${AGENCY}${verificationMail}/:emailID`} component={TalentEmailVerification} />
          <SignInLayout path={`${AGENCY}${resetPwd}/:resetToken`} component={ResetPasswordPage} />
          <SignInLayout path={`${AGENCY}/referral/:userId`} component={UserReferral} />
          <AuthLayout path={`${AGENCY}/registration-type`} component={RegistrationTypePage} />
          <AuthLayout path={`${AGENCY}/create-profile`} component={TalentCreateProfilePage} />
          <AuthLayout path={`${AGENCY}/add-talents`} component={AddTalentsPage} />
          <AuthLayout path={`${AGENCY}/agency-certificate`} component={AgencyCertificatesPage} />
          <AuthLayout path={`${AGENCY}/payout-details`} component={PayoutDetailsPage} />
          <AuthLayout path={`${AGENCY}/add-directors-shareholders`} component={AddDirectorsPage} />
          <AuthLayout path={`${AGENCY}/documents`} component={DocumentsPage} />

          {/* Client user urls */}
          <SignInLayoutV2 path={`${CLIENT}${login}`} component={LoginPage} />
          <SignInLayoutV2 path={`${CLIENT}${signup}`} component={SignUpPage} />
          <SignInLayoutV2 path={`${CLIENT}${verification}`} component={VerificationPage} />
          <SignInLayoutV2 path={`${CLIENT}${forgotPwd}`} component={ForgotPasswordPage} />
          <SignInLayoutV2 path={`${CLIENT}${verifyEmail}`} component={VerifyEmailPage} />
          <SignInLayoutV2 path={`${CLIENT}${resetPwd}/:resetToken`} component={ResetPasswordPage} />
          <SignInLayoutV2 path={`${CLIENT}${pwdResetSuccess}`} component={PasswordResetSuccess} />
          <AuthLayout path={`${CLIENT}/about-you`} component={AboutYouPage} />
          <AuthLayout path={`${CLIENT}/about-company`} component={AboutCompanyPage} />
          <AuthLayout path={`${CLIENT}/company-location`} component={CompanyLocationPage} />

          {/* Admin user urls */}
          <SignInLayoutV2 path={`${ADMIN}${login}`} component={LoginPage} />

          {privateRoutes.map((route, index) => (
            <PrivateLayout
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
          <SignInLayout path="" component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </div>
    );
  }
}
