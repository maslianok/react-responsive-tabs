import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class ShowMore extends Component {
  constructor() {
    super();

    this.state = {
      isFocused: false,
      isHidden: true,
    };

    this._onClick = this._onClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.children.length !== nextProps.children.length ||
      this.props.isShown !== nextProps.isShown ||
      this.state !== nextState;
  }

  _onClick() {
    this.setState({ isHidden: !this.state.isHidden });
  }

  _onKeyDown(event) {
    if (event.keyCode === 13 && event.target === this.showMore && this.state.isFocused) {
      this.setState({ isHidden: !this.state.isHidden });
    }
  }

  _onFocus() {
    this.setState({ isFocused: true });
  }

  _onBlur() {
    this.setState({ isFocused: false });
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
        ariaHasPopup="true"
        tabIndex="0"
        onKeyDown={this._onKeyDown}
        onFocus={this._onFocus}
        onBlur={this._onBlur}
      >
        <div className={showMoreLabelStyles} onClick={this._onClick}>...</div>
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
