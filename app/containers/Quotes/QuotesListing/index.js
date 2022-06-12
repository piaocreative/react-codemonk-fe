/** QuotesListing
 */
import React from 'react';
import { toast } from 'react-toastify';
import SVG from 'react-inlinesvg';
import parse from 'html-react-parser';
import get from 'lodash/get';
import request from 'utils/request';
import StorageService from 'utils/StorageService';
import { VALIDATION } from 'utils/constants';
import ShowMoreText from 'components/ShowMore/ShowMoreText';
import { DEFAULT_PAGE_SIZE } from 'containers/constants';
import { paginationComponent } from 'containers/App/utils';
import { API_URL, QUOTE, LIST, attachIcon } from 'containers/App/constants';
import { BriefCardSkeleton } from 'components/SkeletonLoader';
import { OutlineButton } from 'containers/TalentListingPage/styles';
import { defaultProps, propTypes } from 'containers/proptypes';
import { DownloadLink } from 'containers/Auth/Talent/AddTalentsPage/styles';
import { Attachment } from 'containers/Agency/Quotes/styles';
import { downloadAttachment } from 'containers/Agency/Quotes/utils';
import { BriefCard } from 'containers/Talent/Briefs/styles';
import containerMessage from 'containers/messages';
import { ToastifyMessage, H4, Badge } from 'components';
import { showNoRecordFound } from 'containers/Client/Briefs/utils';
import ArchiveQuoteModal from './ArchiveQuoteModal';
export class QuotesListing extends React.Component {
  constructor(props) {
    super(props);

    const getPageNumber = StorageService.get('quotePage');
    const updatedPageNumber = JSON.parse(getPageNumber) || 1;
    this.state = {
      showArchiveQuoteModal: false,
      pageNum: updatedPageNumber,
      isListLoading: false,
    };
  }

  componentDidMount() {
    const { pageNum } = this.state;
    this.loadQuotes(pageNum);
  }

  componentDidUpdate(prevProps) {
    const { pageNum } = this.state;
    const { search, statusFilter } = this.props;
    if (search !== prevProps.search || statusFilter !== prevProps.statusFilter) {
      this.loadQuotes(pageNum);
    }
  }

  loadQuotes = pageNum => {
    const { search, statusFilter } = this.props;
    StorageService.set('quotePage', JSON.stringify(pageNum));
    this.setState({ isListLoading: true, pageNum });

    const status = get(statusFilter, 'value', -1);

    const data = { method: 'GET' };
    let requestURL = `${API_URL}${QUOTE}${LIST}?page=${pageNum}&limit=${DEFAULT_PAGE_SIZE}`;

    // statusFilter
    requestURL += status !== -1 ? `&status=${encodeURIComponent(status)}` : '';

    // search
    requestURL += search ? `&q=${encodeURIComponent(search)}` : '';

    // apiCall;
    request(requestURL, data)
      .then(this.setQuoteData)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setQuoteData = response => {
    if (get(response, 'status')) {
      const paginationData = get(response, 'data');

      this.setState({ paginationData, isListLoading: false });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  handleArchiveQuoteOpenModal = (e, quoteId) => {
    e.preventDefault();
    this.setState({ showArchiveQuoteModal: true, quoteId });
  };

  handleArchiveQuoteCloseModal = () => this.setState({ showArchiveQuoteModal: false });

  handleQuoteArchived = () => {
    const { pageNum } = this.state;
    this.setState({ showArchiveQuoteModal: false }, () => this.loadQuotes(pageNum));
  };

  quoteCard = (quote, index) => {
    const id = get(quote, '_id', '');
    const plainTextDescription = get(quote, 'description', '-').replace(/<[^>]*>?/gm, '');

    return (
      <BriefCard key={index} to={`/admin/quote-detail/${id}`}>
        <div className="d-flex justify-content-between flex-column flex-md-row">
          <div>
            <div className="d-flex align-items-start">
              <H4>{get(quote, 'name')}</H4>
              {get(quote, 'isArchived') && <Badge className="light ms-3">Archived</Badge>}
            </div>

            {/* projectName */}
            <p className="title opacity-100 list-view-title">{containerMessage.projectTitle.defaultMessage}</p>
            <p className="mb-4">{get(quote, 'projectName', '-')}</p>

            <p className="title opacity-100 list-view-title">{containerMessage.labelDescription.defaultMessage}</p>
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
                {parse(get(quote, 'description', ''))}
              </ShowMoreText>
            </div>

            <p className="title opacity-100 list-view-title">{containerMessage.labelAttachment.defaultMessage}</p>
            <Attachment className="d-flex align-items-center">
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
          <div className="d-flex">
            {!get(quote, 'isArchived') && (
              <OutlineButton onClick={e => this.handleArchiveQuoteOpenModal(e, get(quote, '_id'))}>
                <span>{containerMessage.btnArchive.defaultMessage}</span>
              </OutlineButton>
            )}
          </div>
        </div>
      </BriefCard>
    );
  };

  renderQuoteCards = () => {
    const { isListLoading, paginationData, pageNum, search, noFilterApplied } = this.state;
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
      const totalDocs = get(paginationData, 'totalDocs');
      if (totalDocs === 0) {
        output = showNoRecordFound(search, noFilterApplied);
      } else {
        output = (
          <React.Fragment>
            {get(paginationData, 'docs', []).map((quote, index) => this.quoteCard(quote, index))}
            {paginationComponent(paginationData, DEFAULT_PAGE_SIZE, this.loadQuotes, pageNum)}
          </React.Fragment>
        );
      }
    }
    return output;
  };

  render() {
    const { quoteId, showArchiveQuoteModal } = this.state;
    return (
      <React.Fragment>
        {this.renderQuoteCards()}
        <ArchiveQuoteModal
          quoteId={quoteId}
          showArchiveQuoteModal={showArchiveQuoteModal}
          handleArchiveQuoteCloseModal={this.handleArchiveQuoteCloseModal}
          handleQuoteArchived={this.handleQuoteArchived}
        />
      </React.Fragment>
    );
  }
}

QuotesListing.defaultProps = defaultProps;
QuotesListing.propTypes = propTypes;

export default QuotesListing;
