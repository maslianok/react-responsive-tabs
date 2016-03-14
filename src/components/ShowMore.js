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
  }

  _onClick() {
    this.setState({ isHidden: !this.state.isHidden });
  }

  _onKeyDown(event) {
    if (event.keyCode === 13 && event.target === this.refs.showMore && this.state.isFocused) {
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
    if (!this.props.isShown || !this.props.hiddenTabs || !this.props.hiddenTabs.length) {
      return null;
    }

    const isListHidden = this.state.isHidden;

    const styles = this.props.styles;

    const listStyles = classNames({
      [styles['Tabs__show-more-list']]: true,
      [styles['Tabs__show-more-list--opened']]: !isListHidden,
    });

    const showMoreLabelStyles = classNames({
      [styles['Tabs__show-more-label']]: true,
      [styles['Tabs__show-more-label--selected']]: !isListHidden,
    });

    return (
      <div
        ref="showMore"
        className={styles['Tabs__show-more']}
        role="navigation"
        ariaHaspopup="true"
        tabIndex="0"
        onKeyDown={this._onKeyDown}
        onFocus={this._onFocus}
        onBlur={this._onBlur}
      >
        <div className={showMoreLabelStyles} onClick={this._onClick}>...</div>
        <div className={listStyles} aria-hidden={isListHidden} role="menu">
          {this.props.hiddenTabs}
        </div>
      </div>
    );
  }
}

ShowMore.propTypes = {
  isShown: PropTypes.bool.isRequired,
  hiddenTabs: PropTypes.array,
  styles: PropTypes.object.isRequired,
};
