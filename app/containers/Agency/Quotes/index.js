/** Quotes
 * This is the Quotes page for the Agency, at the '/Talent/quotes' route
 */
import React from 'react';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import get from 'lodash/get';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import Content from 'components/Content';
import { PrivateGrid, H4, ToastifyMessage, Badge } from 'components';
import SVG from 'react-inlinesvg';
import StorageService from 'utils/StorageService';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';
import { API_URL, QUOTE, LIST, attachIcon, filesIcon } from 'containers/App/constants';
import { BriefCardSkeleton } from 'components/SkeletonLoader';
import { paginationComponent } from 'containers/App/utils';
import { ComingSoonBlock } from 'components/ComingSoon/styles';
import { DownloadLink } from 'containers/Auth/Talent/AddTalentsPage/styles';
import containerMessage from 'containers/messages';
import { DEFAULT_PAGE_SIZE } from 'containers/constants';
import ApplyQuoteModal from 'containers/Agency/ApplyQuoteModal';
import { OutlineButton } from 'containers/TalentListingPage/styles';
import { propTypes, defaultProps } from 'containers/proptypes';
import { BriefCard, BriefCardHeader } from 'containers/Talent/Briefs/styles';
import { Attachment } from './styles';
import { downloadAttachment } from './utils';
import messages from './messages';

export class Quotes extends React.Component {
  constructor(props) {
    super(props);
    const getPageNumber = StorageService.get('agencyQuotePage');
    const updatedPageNumber = JSON.parse(getPageNumber) || 1;
    this.state = {
      showApplyModal: false,
      pageNum: updatedPageNumber,
    };
  }

  componentDidMount() {
    const { pageNum } = this.state;
    this.loadAgencyQuotes(pageNum);
  }

  loadAgencyQuotes = pageNum => {
    StorageService.set('agencyQuotePage', JSON.stringify(pageNum));
    this.setState({ isListLoading: true, pageNum });

    const data = { method: 'GET' };
    const requestURL = `${API_URL}${QUOTE}${LIST}?page=${pageNum}&limit=${DEFAULT_PAGE_SIZE}`;

    request(requestURL, data)
      .then(this.setAgencyQuotes)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setAgencyQuotes = response => {
    if (get(response, 'status')) {
      const { docs } = response.data;
      const quoteData = [];

      docs.forEach(quote => {
        const quoteObj = {
          id: get(quote, '_id'),
          name: get(quote, 'name', ''),
          description: get(quote, 'description', ''),
          isApplied: get(quote, 'isApplied'),
          projectId: get(quote, 'projectId'),
          quoteUrl: get(quote, 'quoteUrl'),
        };
        quoteData.push(quoteObj);
      });

      this.setState({ paginationData: get(response, 'data', {}), quoteData, isListLoading: false });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  handleApplyModalOpen = (e, projectId, quoteId) => {
    e.preventDefault();
    this.setState({ showApplyModal: true, projectId, quoteId });
  };

  handleApplyModalClose = () => {
    this.setState({ showApplyModal: false, projectId: '', quoteId: '' });
  };

  handleSuccess = () => {
    const { pageNum } = this.state;
    this.setState({ showApplyModal: false }, () => this.loadAgencyQuotes(pageNum));
  };

  quoteCard = (quote, index) => (
    <BriefCard key={index} to={`/agency/quote-detail/${get(quote, 'id')}`}>
      <div className="d-flex justify-content-between flex-column flex-md-row">
        <div>
          <div className="d-flex align-items-start">
            <H4>{get(quote, 'name', '')}</H4>
            {get(quote, 'isApplied') && <Badge className="success ms-3">{containerMessage.badgeSubmitted.defaultMessage}</Badge>}
          </div>
          <div className="read-more-less-content">
            <HTMLEllipsis unsafeHTML={get(quote, 'description', '')} maxLine="2" ellipsis="..." basedOn="letters" />
          </div>
          <Attachment>
            <SVG src={attachIcon} />
            <DownloadLink
              href={get(quote, 'quoteUrl')}
              className="btn-link ms-2"
              download
              onClick={e => {
                downloadAttachment(e, get(quote, 'quoteUrl'));
              }}
            >
              {containerMessage.labelDownloadAttachment.defaultMessage}
            </DownloadLink>
          </Attachment>
        </div>
        {!get(quote, 'isApplied') && (
          <OutlineButton onClick={e => this.handleApplyModalOpen(e, get(quote, 'projectId'), get(quote, 'id'))}>
            <span>{containerMessage.btnSubmit.defaultMessage}</span>
          </OutlineButton>
        )}
      </div>
    </BriefCard>
  );

  showNoRecordFound = () => {
    const { noFilterApplied } = this.state;
    let output = <p className="text-center p-5">{containerMessage.noResultText.defaultMessage}</p>;
    if (noFilterApplied) {
      output = (
        <ComingSoonBlock>
          <div className="inner-content">
            <SVG src={filesIcon} />
            <p className="sm my-0">{containerMessage.noQuoteAgency.defaultMessage}</p>
          </div>
        </ComingSoonBlock>
      );
    }
    return output;
  };

  renderQuoteAfterLoading = paginationData => {
    let output = '';
    const totalDocs = get(paginationData, 'totalDocs');
    if (totalDocs === 0) {
      output = this.showNoRecordFound();
    } else if (totalDocs > get(paginationData, 'limit')) {
      output = (
        <React.Fragment>
          {get(this.state, 'quoteData', []).map((quote, index) => this.quoteCard(quote, index))}
          {paginationComponent(paginationData, get(paginationData, 'limit'), this.loadAgencyQuotes)}
        </React.Fragment>
      );
    } else {
      output = <React.Fragment>{get(this.state, 'quoteData', []).map((quote, index) => this.quoteCard(quote, index))}</React.Fragment>;
    }
    return output;
  };

  renderQuoteCards = () => {
    const { isListLoading, paginationData } = this.state;
    let output = '';
    if (isListLoading) {
      output = (
        <BriefCardSkeleton
          cardCount={
            get(paginationData, 'totalDocs') > get(paginationData, 'limit')
              ? get(paginationData, 'limit')
              : get(paginationData, 'totalDocs')
          }
        />
      );
    } else {
      output = this.renderQuoteAfterLoading(paginationData);
    }
    return output;
  };

  render() {
    const { projectId, quoteId, showApplyModal } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <Content>
          <PrivateGrid>
            <BriefCardHeader className="d-flex justify-content-between">
              <H4 className="m-0">{messages.heading.defaultMessage}</H4>
            </BriefCardHeader>
            {this.renderQuoteCards()}
          </PrivateGrid>
        </Content>
        <ApplyQuoteModal
          projectId={projectId}
          quoteId={quoteId}
          showApplyModal={showApplyModal}
          handleApplyModalClose={this.handleApplyModalClose}
          handleSuccess={this.handleSuccess}
        />
      </React.Fragment>
    );
  }
}

Quotes.defaultProps = defaultProps;
Quotes.propTypes = propTypes;

export default Quotes;
