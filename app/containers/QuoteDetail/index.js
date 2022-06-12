/** QuoteDetail
 * This is the Projects page for the Talent, at the '/talent/brief-detail' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import Emitter from 'utils/emitter';
import ShowMoreText from 'components/ShowMore/ShowMoreText';
import parse from 'html-react-parser';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';
import SVG from 'react-inlinesvg';
import { API_URL, QUOTE, attachIcon } from 'containers/App/constants';
import Content from 'components/Content';
import { PrivateGrid, H4, Card, ToastifyMessage, Badge } from 'components';
import { redirectTo } from 'containers/App/utils';
import { DownloadLink } from 'containers/Auth/Talent/AddTalentsPage/styles';
import { CardHeader, CardBody, BackLink } from 'containers/MyProfilePage/styles';
import containerMessage from 'containers/messages';
import { defaultProps, propTypes } from 'containers/proptypes';
import { Attachment } from 'containers/Agency/Quotes/styles';
import AddQuote from 'containers/Quotes/AddQuote';
import { downloadAttachment } from 'containers/Agency/Quotes/utils';
import messages from './messages';

export class QuoteDetail extends React.Component {
  constructor(props) {
    super(props);
    const {
      match: { params },
    } = props;
    const quoteID = get(params, 'quoteID', '');
    this.state = {
      quoteID,
    };
  }

  componentDidMount() {
    Emitter.on('quoteAdded', quoteAdded => {
      if (quoteAdded) {
        this.loadQuoteData(1);
      }
    });
    this.loadQuoteData();
  }

  componentWillUnmount() {
    Emitter.off('quoteAdded');
  }

  loadQuoteData = () => {
    const { quoteID } = this.state;
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${QUOTE}/${quoteID}`;

    request(requestURL, data)
      .then(this.setQuoteData)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setQuoteData = response => {
    if (get(response, 'status')) {
      const { data } = response;

      const id = get(data, '_id');

      const quoteData = {
        id,
        name: get(data, 'name', ''),
        description: get(data, 'description', ''),
        isApplied: get(data, 'isApplied'),
        projectId: get(data, 'projectId'),
        quoteUrl: get(data, 'quoteUrl'),
      };

      const projectObj = {
        id,
        quoteTitle: get(data, 'name'),
        quoteDescription: get(data, 'description', ''),
        quoteFile: get(data, 'quoteUrl'),
      };
      this.setState({ quoteData, projectObj });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  render() {
    const { history } = this.props;
    const { quoteData, projectObj } = this.state;
    const textDescription = get(quoteData, 'description', '-').replace(/<[^>]*>?/gm, '');

    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <Content>
          <PrivateGrid>
            <BackLink onClick={() => redirectTo(history, '/admin/quotes')}>{messages.btnBackToQuotes.defaultMessage}</BackLink>
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <div className="d-flex align-items-start">
                  <H4 className="m-0">{get(quoteData, 'name')}</H4>
                  {get(quoteData, 'isApplied') && <Badge className="success ms-3">{containerMessage.badgeSubmitted.defaultMessage}</Badge>}
                </div>
                <AddQuote type="edit" projectObj={projectObj} />
              </CardHeader>
              <CardBody>
                {get(quoteData, 'description') && (
                  <React.Fragment>
                    <p className="title opacity-100 list-view-title">{messages.description.defaultMessage}</p>
                    <div className="read-more-less-content">
                      <ShowMoreText
                        lines={5}
                        more="more"
                        less=""
                        anchorClass="links"
                        onClick={this.executeOnClick}
                        expanded={false}
                        plainText={textDescription}
                      >
                        {parse(get(quoteData, 'description'))}
                      </ShowMoreText>
                    </div>
                    <Attachment>
                      <SVG src={attachIcon} />
                      <DownloadLink
                        href={get(quoteData, 'quoteUrl')}
                        className="btn-link ms-2"
                        download
                        onClick={e => {
                          downloadAttachment(e, get(quoteData, 'quoteUrl'));
                        }}
                      >
                        {containerMessage.labelDownloadAttachment.defaultMessage}
                      </DownloadLink>
                    </Attachment>
                  </React.Fragment>
                )}
              </CardBody>
            </Card>
          </PrivateGrid>
        </Content>
      </React.Fragment>
    );
  }
}

QuoteDetail.defaultProps = defaultProps;
QuoteDetail.propTypes = propTypes;

export default QuoteDetail;
