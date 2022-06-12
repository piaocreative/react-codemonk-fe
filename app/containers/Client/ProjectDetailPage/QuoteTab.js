/** Quote Tab Page
 */
import React from 'react';
import { Row, Col } from 'reactstrap';
import get from 'lodash/get';
import { change, untouch } from 'redux-form/immutable';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { H5, P } from 'components';
import SVG from 'react-inlinesvg';
import { getPageData, paginationComponent } from 'containers/App/utils';
import { getLabel, getArrayLabels } from 'containers/MyProfilePage/components/utils';
import { ProjectInfo, ActionIcon } from 'containers/MyProfilePage/styles';
import { editNoteIcon, attachIcon, filesIcon } from 'containers/App/constants';
import Emitter from 'utils/emitter';
import {
  WorkProgress,
  BudgetArray,
  ProjectSpeed,
  ManageTeam,
  uxDesignArray,
  softwareDevArray,
  devTeamArray,
  dataAIAndMlArray,
} from 'containers/StartProjectPage/constants';
import ShowMoreText from 'components/ShowMore/ShowMoreText';
import parse from 'html-react-parser';
import { ComingSoonBlock } from 'components/ComingSoon/styles';
import PopupWrapper from 'containers/MyProfilePage/PopupWrapper';
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from 'containers/constants';
import { DownloadLink } from 'containers/Auth/Talent/AddTalentsPage/styles';
import { setDocName } from 'containers/Auth/utils';
import { Attachment } from 'containers/Agency/Quotes/styles';
import containerMessage from 'containers/messages';
import { defaultProps, propTypes } from 'containers/proptypes';
import { OpenRoles } from 'containers/Talent/MyProjectDetail/styles';
import { checkIfWhatAreYouLooking } from './utils';
import { key } from './constants';
import { QuoteList } from './styles';
import messages from './messages';
import AddQuote from './AddQuote';

export class QuoteTab extends React.Component {
  constructor(props) {
    super(props);
    const totalDocs = get(props, 'data', []);
    this.state = {
      quoteData: {},
      lookingFor: {},
      showQuoteModal: false,
      quoteModalType: '',
      quoteFile: '',
      pageNum: DEFAULT_PAGE_NO,
      paginationData: { totalDocs: totalDocs.length, page: DEFAULT_PAGE_NO, limit: DEFAULT_PAGE_SIZE },
      adminQuoteList: [],
    };
  }

  componentDidMount() {
    Emitter.on('quoteSubmit', quoteSubmit => {
      if (quoteSubmit) {
        this.handleQuoteCloseModal();
      }
    });

    this.setQuoteData();
  }

  componentDidUpdate(prevProps) {
    const { showQuoteModal, data } = this.props;
    if (showQuoteModal && !prevProps.showQuoteModal) {
      this.handleQuoteModalOpen('add');
    }

    if (prevProps.data !== data) {
      this.setQuoteData();
    }
  }

  componentWillUnmount() {
    Emitter.off('quoteSubmit');
  }

  setQuoteData = () => {
    const { projectData } = this.props;
    const teamManageType = getLabel(get(projectData, 'teamManageType', ''), ManageTeam);
    const buildStatus = getLabel(get(projectData, 'buildStatus', ''), WorkProgress);
    const speed = getLabel(get(projectData, 'speed', ''), ProjectSpeed);
    const budget = getLabel(get(projectData, 'budget', ''), BudgetArray);

    const adminUxAndUiDesign = get(projectData, 'lookingFor.design', '')
      ? getArrayLabels(get(projectData, 'lookingFor.design', ''), uxDesignArray)
      : '';
    const adminSoftwareDevelopment = get(projectData, 'lookingFor.softwareDevelopment', '')
      ? getArrayLabels(get(projectData, 'lookingFor.softwareDevelopment', ''), softwareDevArray)
      : '';
    const adminDevelopmentTeam = get(projectData, 'lookingFor.developmentTeam', '')
      ? getArrayLabels(get(projectData, 'lookingFor.developmentTeam', ''), devTeamArray)
      : '';
    const adminDataAiMl = get(projectData, 'lookingFor.dataAiMl', '')
      ? getArrayLabels(get(projectData, 'lookingFor.dataAiMl', ''), dataAIAndMlArray)
      : '';

    const howMuchBeenDone = buildStatus || '';
    const whatAreYouLooking = {
      uxAndUiDesign: adminUxAndUiDesign,
      softwareDevelopment: adminSoftwareDevelopment,
      developmentTeam: adminDevelopmentTeam,
      dataAiMl: adminDataAiMl,
      agielCoaching: get(projectData, 'lookingFor.isAgileCoach', '') ? 'Yes' : 'No',
      otherRequirement: get(projectData, 'lookingFor.other', ''),
      growthHacking: get(projectData, 'lookingFor.isGrowthHacking', '') ? 'Yes' : 'No',
    };
    const whatsYourBudget = budget || '';
    const anythingElseWeShould = get(projectData, 'messageToPreSales', '');
    const howFast = speed || '';
    const howWouldManageTeam = teamManageType || '';

    const quoteData = {
      whatAreYouLooking,
      howMuchBeenDone,
      anythingElseWeShould,
      whatsYourBudget,
      howWouldManageTeam,
      howFast,
    };

    this.setAdminQuotes(1);
    this.setState({ quoteData, lookingFor: get(projectData, 'lookingFor') });
  };

  setAdminQuotes = pageNum => {
    this.setState({ pageNum });
    const paginationData = { totalDocs: get(this.props, 'data', []).length, page: DEFAULT_PAGE_NO, limit: DEFAULT_PAGE_SIZE };
    const pageData = getPageData(get(this.props, 'data', []), pageNum, DEFAULT_PAGE_SIZE);
    this.setState({ adminQuoteList: pageData, paginationData });
  };

  handleQuoteModalOpen = (quoteModalType, quote = {}) => {
    const { dispatch } = this.props;
    let quoteTitle = '';
    let quoteDescription = EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML('')));
    let quoteFile = '';
    if (quoteModalType === 'edit') {
      quoteTitle = get(quote, 'name', '');
      quoteDescription = EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(get(quote, 'description', ''))));
      quoteFile = setDocName(get(quote, 'quoteUrl', ''));
      this.setState({ quoteFile });
    }
    const data = {
      quoteTitle,
      quoteDescription,
      quoteFile,
    };
    Object.keys(data).forEach(fieldKey => {
      dispatch(change(key, fieldKey, data[fieldKey]));
      dispatch(untouch(key, fieldKey));
    });

    this.setState({ showQuoteModal: true, quoteModalType, quoteId: get(quote, '_id', '') });
  };

  handleQuoteCloseModal = () => {
    const { quotePopupClose } = this.props;
    quotePopupClose();
    this.setState({ showQuoteModal: false, quoteFile: '', quoteModalType: '' });
  };

  quoteFileChanged = quoteFile => {
    this.setState({ quoteFile });
  };

  handleQuoteModalSubmit = e => {
    const { projectID: projectId, quoteTitle: name, quoteDescription, quoteModalSubmit } = this.props;
    const { quoteModalType, quoteId, quoteFile } = this.state;

    const description = draftToHtml(convertToRaw(quoteDescription.getCurrentContent()));
    const quote = quoteFile;
    const data = {
      projectId,
      name,
      description,
      quote,
    };

    if (quoteModalType === 'edit') {
      data.id = quoteId;
    }
    quoteModalSubmit(e, quoteModalType, data);
  };

  renderClientQuote = (quoteData, lookingFor) => (
    <React.Fragment>
      {get(quoteData, 'howMuchBeenDone') && (
        <React.Fragment>
          <H5 className="mb-2">{messages.howMuchBeenDone.defaultMessage}</H5>
          <div className="read-more-less-content">
            <HTMLEllipsis unsafeHTML={get(quoteData, 'howMuchBeenDone', '-')} maxLine="5" ellipsis="..." basedOn="letters" />
          </div>

          <hr />
        </React.Fragment>
      )}

      {checkIfWhatAreYouLooking(lookingFor) && (
        <React.Fragment>
          <H5 className="mb-2">{messages.whatAreYouLooking.defaultMessage}</H5>
          <Row>
            {get(quoteData, 'whatAreYouLooking.uxAndUiDesign', []).length > 0 && (
              <Col md={3}>
                <ProjectInfo className="list-view">
                  <H5 className="mb-2">{messages.uxAndUiDesign.defaultMessage}</H5>
                  {get(quoteData, 'whatAreYouLooking.uxAndUiDesign', []).map(data => (
                    <P className="p16" opacityVal={0.5} key={data}>
                      {data}
                    </P>
                  ))}
                </ProjectInfo>
              </Col>
            )}

            {get(quoteData, 'whatAreYouLooking.softwareDevelopment', []).length > 0 && (
              <Col md={3}>
                <ProjectInfo className="list-view">
                  <H5 className="mb-2">{messages.softwareDevelopment.defaultMessage}</H5>
                  {get(quoteData, 'whatAreYouLooking.softwareDevelopment', []).map(data => (
                    <P className="p16" opacityVal={0.5} key={data}>
                      {data}
                    </P>
                  ))}
                </ProjectInfo>
              </Col>
            )}

            {get(quoteData, 'whatAreYouLooking.developmentTeam', []).length > 0 && (
              <Col md={3}>
                <ProjectInfo className="list-view">
                  <H5 className="mb-2">{messages.developmentTeam.defaultMessage}</H5>
                  {get(quoteData, 'whatAreYouLooking.developmentTeam', []).map(data => (
                    <P className="p16" opacityVal={0.5} key={data}>
                      {data}
                    </P>
                  ))}
                </ProjectInfo>
              </Col>
            )}
            {get(quoteData, 'whatAreYouLooking.dataAiMl', []).length > 0 && (
              <Col md={3}>
                <ProjectInfo className="list-view">
                  <H5 className="mb-2">{messages.dataAiMl.defaultMessage}</H5>
                  {get(quoteData, 'whatAreYouLooking.dataAiMl', []).map(data => (
                    <P className="p16" opacityVal={0.5} key={data}>
                      {data}
                    </P>
                  ))}
                </ProjectInfo>
              </Col>
            )}

            {/* growthHacking */}
            {get(lookingFor, 'isGrowthHacking', '') && (
              <Col md={3}>
                <ProjectInfo className="list-view">
                  <H5 className="mb-2">{messages.growthHacking.defaultMessage}</H5>
                  <P className="p16" opacityVal={0.5}>
                    {get(quoteData, 'whatAreYouLooking.growthHacking')}
                  </P>
                </ProjectInfo>
              </Col>
            )}
            {get(lookingFor, 'isAgileCoach', '') && (
              <Col md={3}>
                <ProjectInfo className="list-view">
                  <H5 className="mb-2">{messages.agielCoaching.defaultMessage}</H5>
                  <P className="p16" opacityVal={0.5}>
                    {get(quoteData, 'whatAreYouLooking.agielCoaching')}
                  </P>
                </ProjectInfo>
              </Col>
            )}
            {get(quoteData, 'whatAreYouLooking.otherRequirement') && (
              <Col md={3}>
                <ProjectInfo className="list-view">
                  <H5 className="mb-2">{messages.otherRequirement.defaultMessage}</H5>
                  <P className="p16" opacityVal={0.5}>
                    {get(quoteData, 'whatAreYouLooking.otherRequirement')}
                  </P>
                </ProjectInfo>
              </Col>
            )}
          </Row>
          <hr className="mt-0" />
        </React.Fragment>
      )}

      {get(quoteData, 'whatsYourBudget') && (
        <React.Fragment>
          <H5 className="mb-2">{messages.whatsYourBudget.defaultMessage}</H5>
          <div className="read-more-less-content">
            <HTMLEllipsis unsafeHTML={get(quoteData, 'whatsYourBudget', '-')} maxLine="5" ellipsis="..." basedOn="letters" />
          </div>
          <hr />
        </React.Fragment>
      )}

      {get(quoteData, 'anythingElseWeShould') && (
        <React.Fragment>
          <H5 className="mb-2">{messages.anythingElseWeShould.defaultMessage}</H5>
          <div className="read-more-less-content">
            <HTMLEllipsis unsafeHTML={get(quoteData, 'anythingElseWeShould', '-')} maxLine="5" ellipsis="..." basedOn="letters" />
          </div>
          <hr />
        </React.Fragment>
      )}

      {get(quoteData, 'howFast') && (
        <React.Fragment>
          <H5 className="mb-2">{messages.howFast.defaultMessage}</H5>
          <div className="read-more-less-content">
            <HTMLEllipsis unsafeHTML={get(quoteData, 'howFast', '-')} maxLine="5" ellipsis="..." basedOn="letters" />
          </div>
          <hr />
        </React.Fragment>
      )}

      {get(quoteData, 'howWouldManageTeam') && (
        <React.Fragment>
          <H5 className="mb-2">{messages.howWouldManageTeam.defaultMessage}</H5>
          <div className="read-more-less-content">
            <HTMLEllipsis unsafeHTML={get(quoteData, 'howWouldManageTeam', '-')} maxLine="5" ellipsis="..." basedOn="letters" />
          </div>
          <hr />
        </React.Fragment>
      )}
    </React.Fragment>
  );

  renderQuotePopup = () => {
    const { showQuoteModal, quoteModalType, quoteFile } = this.state;
    const { handleSubmit, invalid, loading, responseSuccess, responseError } = this.props;
    const {
      addQuotePopupTitle: { defaultMessage: addTitle },
      editQuotePopupTitle: { defaultMessage: editTitle },
    } = messages;
    return (
      <PopupWrapper
        modalId="showQuoteModal"
        loading={loading}
        responseSuccess={responseSuccess}
        responseError={responseError}
        disabled={invalid}
        isOpen={showQuoteModal}
        onDiscard={this.handleQuoteCloseModal}
        onHandleSubmit={handleSubmit(e => {
          this.handleQuoteModalSubmit(e);
        })}
        modalType={quoteModalType}
        {...(quoteModalType === 'add' ? { title: addTitle } : { title: editTitle })}
      >
        <form onSubmit={handleSubmit}>
          <AddQuote quoteFileChanged={this.quoteFileChanged} quoteFile={quoteFile} {...this.props} />
        </form>
      </PopupWrapper>
    );
  };

  render() {
    const { projectData, isAdmin } = this.props;
    const { paginationData, pageNum, quoteData, lookingFor, adminQuoteList } = this.state;
    const quotes = get(projectData, 'quotes', []);
    return (
      <OpenRoles className="mt-3">
        {checkIfWhatAreYouLooking(lookingFor) || quotes.length > 0 ? (
          <React.Fragment>
            {this.renderClientQuote(quoteData, lookingFor)}

            {isAdmin &&
              adminQuoteList.map((quote, index) => {
                const plainTextDescription = get(quote, 'description', '-').replace(/<[^>]*>?/gm, '');
                return (
                  <React.Fragment>
                    <QuoteList className="d-flex justify-content-between" key={`${get(quote, '_id')}`}>
                      <div>
                        <H5 className="mb-2">{containerMessage.labelTitle.defaultMessage}</H5>
                        <P className="p16" opacityVal={0.5}>
                          {get(quote, 'name')}
                        </P>

                        <H5 className="mb-2">{containerMessage.labelDescription.defaultMessage}</H5>
                        <div className="read-more-less-content">
                          <ShowMoreText
                            lines={5}
                            more="more"
                            less=""
                            anchorClass="links"
                            onClick={this.executeOnClick}
                            expanded={false}
                            plainText={plainTextDescription}
                          >
                            {parse(get(quote, 'description'))}
                          </ShowMoreText>
                        </div>

                        <H5 className="mb-2">{containerMessage.labelAttachment.defaultMessage}</H5>
                        <Attachment className="d-flex align-items-center">
                          <SVG src={attachIcon} />
                          <DownloadLink href={get(quote, 'quoteUrl')} target="_blank" className="btn-link ms-2" download>
                            {containerMessage.labelDownloadAttachment.defaultMessage}
                          </DownloadLink>
                        </Attachment>
                      </div>
                      <ActionIcon type="button" onClick={() => this.handleQuoteModalOpen('edit', quote)}>
                        <SVG src={editNoteIcon} />
                      </ActionIcon>
                    </QuoteList>
                    {quotes.length > 1 && index !== quotes.length - 1 ? <hr /> : ''}
                  </React.Fragment>
                );
              })}
            {paginationComponent(paginationData, DEFAULT_PAGE_SIZE, this.setAdminQuotes, pageNum)}
          </React.Fragment>
        ) : (
          <ComingSoonBlock className="mt-0 border-0 mb-0">
            <div className="inner-content">
              <SVG src={filesIcon} />
              <p className="sm my-0">{containerMessage.noQuote.defaultMessage}</p>
            </div>
          </ComingSoonBlock>
        )}
        {isAdmin && this.renderQuotePopup()}
      </OpenRoles>
    );
  }
}

QuoteTab.defaultProps = defaultProps;
QuoteTab.propTypes = propTypes;

export default QuoteTab;
