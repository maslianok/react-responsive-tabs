import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class ShowMore extends Component {
  constructor() {
    super();

    this.state = {
      isFocused: false,
      isHidden: true,
    };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.close = this.close.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('click', this.close);
      window.addEventListener('keydown', this.onKeyDown);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.children.length !== nextProps.children.length ||
      this.props.isShown !== nextProps.isShown ||
      this.state !== nextState;
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('click', this.close);
      window.removeEventListener('keydown', this.onKeyDown);
    }
  }

  onFocus() {
    this.setState({ isFocused: true });
  }

  onBlur() {
    this.setState({ isFocused: false });
  }

  onKeyDown(event) {
    const { isFocused, isHidden } = this.state;
    if (event.keyCode === 13) {
      if (isFocused) {
        this.setState({ isHidden: !this.state.isHidden });
      } else if (!isHidden) {
        this.setState({ isHidden: true });
      }
    }
  }

  close() {
    if (!this.state.isHidden) {
      this.setState({ isHidden: true });
    }
  }

  toggleVisibility(event) {
    event.stopPropagation();
    this.setState({ isHidden: !this.state.isHidden });
  }

  render() {
    if (!this.props.isShown || !this.props.children || !this.props.children.length) {
      return null;
    }

    const isListHidden = this.state.isHidden;
    const listStyles = classNames({
      'Tabs__show-more-list': true,
      'Tabs__show-more-list--opened': !isListHidden,
    });

    const showMoreLabelStyles = classNames({
      'Tabs__show-more-label': true,
      'Tabs__show-more-label--selected': !isListHidden,
    });

    return (
      <div
        ref={el => (this.showMore = el)}
        className="Tabs__show-more"
        role="navigation"
        tabIndex="0"
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onClick={this.toggleVisibility}
      >
        <div className={showMoreLabelStyles}>...</div>
        <div className={listStyles} aria-hidden={isListHidden} role="menu">
          {this.props.children}
        </div>
      </div>
    );
  }
}

ShowMore.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
  ]),
  isShown: PropTypes.bool.isRequired,
};
