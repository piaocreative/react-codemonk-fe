/** Quotes
 * This is the Quotes page
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import Content from 'components/Content';
import debounce from 'lodash/debounce';
import Selects from 'components/Selects';
import { reduxForm, Field } from 'redux-form/immutable';
import containerMessage from 'containers/messages';
import SearchComponent from 'components/SearchComponent';
import { defaultProps, propTypes } from 'containers/proptypes';
import { H4, PrivateGrid } from 'components';
import { BriefCardHeader } from 'containers/Talent/Briefs/styles';
import AddQuote from 'containers/Quotes/AddQuote';
import QuotesListing from 'containers/Quotes/QuotesListing';
import { key, quotesFilter } from './constants';
import messages from './messages';

export class Quotes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      statusFilter: { label: 'All', value: -1 },
    };
  }

  handleTimesheetSearchChange = value => {
    this.setState({ search: value });
  };

  debounceFn = debounce(value => this.handleTimesheetSearchChange(value), 500);

  handleStatusFilter = e => {
    this.setState({ statusFilter: e });
  };

  render() {
    const { search, statusFilter } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <Content>
          <PrivateGrid>
            <BriefCardHeader className="d-flex align-items-xl-center justify-content-between table-header flex-column flex-xl-row">
              <div className="d-flex align-items-md-center flex-column flex-md-row">
                <div className="d-flex align-items-center">
                  <H4 className="text-start my-0">
                    <FormattedMessage {...messages.quoteHeading} />
                  </H4>
                </div>
                <AddQuote type="add" />
              </div>
              <div className="d-flex align-items-center input-sm me-auto me-md-0 ms-md-auto mt-4 mt-xl-0">
                <SearchComponent handleSearchChange={this.debounceFn} placeholder={containerMessage.searchPlaceholder.defaultMessage} />
                <Field
                  name="statusFilter"
                  type="text"
                  component={Selects}
                  className="ms-4"
                  defaultValue={statusFilter}
                  searchable={false}
                  options={quotesFilter.map(item => ({
                    label: `${item.label}`,
                    value: item.value,
                  }))}
                  onChange={e => this.handleStatusFilter(e)}
                />
              </div>
            </BriefCardHeader>
            <hr className="m-0" />
            <QuotesListing search={search} statusFilter={statusFilter} />
          </PrivateGrid>
        </Content>
      </React.Fragment>
    );
  }
}

Quotes.defaultProps = defaultProps;
Quotes.propTypes = propTypes;

export default compose(
  reduxForm({
    form: key,
    touchOnChange: true,
  }),
)(Quotes);
