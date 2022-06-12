import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { LinkButtonMod } from 'components';
import Truncate from './Truncate';

class ShowMoreText extends Component {
  isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      truncated: false,
      noMore: false,
    };
    this.textInput = React.createRef();
  }

  static defaultProps = {
    lines: 3,
    more: 'Show more',
    less: 'Show less',
    anchorClass: '',
    onClick: undefined,
    expanded: false,
    width: 0,
  };

  static propTypes = {
    children: PropTypes.node,
    lines: PropTypes.number,
    more: PropTypes.node,
    less: PropTypes.node,
    anchorClass: PropTypes.string,
    onClick: PropTypes.func,
    expanded: PropTypes.bool,
    width: PropTypes.number,
  };

  componentDidMount() {
    this.isMounted = true;

    const { expanded } = this.props;
    if (this.isMounted) {
      this.setState({ expanded });
      this.checkLines();
    }
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-underscore-dangle
    this.isMounted = false;
  }

  calculate = () => {
    const height = this.textInput.current.offsetHeight;
    return height / 24;
  };

  checkLines = () => {
    const { lines } = this.props;

    const textLines = this.calculate();
    if (textLines <= lines) {
      this.setState({ noMore: true });
    }
  };

  handleTruncate = truncated => {
    const { truncated: stateTruncated } = this.state;
    if (this.isMounted && truncated !== stateTruncated) {
      this.setState({
        truncated,
      });
      if (truncated) {
        this.truncateRef.onResize();
      }
    }
  };

  toggleLines = event => {
    event.preventDefault();

    const { onClick } = this.props;
    if (this.isMounted) {
      const { expanded } = this.state;
      this.setState(
        {
          expanded: !expanded,
        },
        () => {
          if (onClick) {
            onClick(expanded);
          }
        },
      );
    }
  };

  render() {
    const { children, more, less, lines, anchorClass, width } = this.props;

    const { noMore, expanded, truncated } = this.state;

    return (
      <div ref={this.textInput}>
        {!noMore && (
          <Truncate
            width={width}
            lines={!expanded && lines}
            ellipsis={
              <span>
                ...
                <LinkButtonMod className={`${anchorClass} mb-0 ms-1`} color="link" onClick={this.toggleLines}>
                  {more}
                </LinkButtonMod>
              </span>
            }
            onTruncate={this.handleTruncate}
            ref={ref => (this.truncateRef = ref)}
          >
            {children}
          </Truncate>
        )}
        {noMore && children}
        {!truncated && expanded && (
          <span>
            <LinkButtonMod className={`${anchorClass} mb-0 ms-1`} color="link" onClick={this.toggleLines}>
              {less}
            </LinkButtonMod>
          </span>
        )}
      </div>
    );
  }
}

export default ShowMoreText;
