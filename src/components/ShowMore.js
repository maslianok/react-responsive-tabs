/* eslint jsx-a11y/no-noninteractive-element-interactions: 0, jsx-a11y/no-noninteractive-tabindex: 0 */

import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class ShowMore extends Component {
  constructor() {
    super();

    this.state = {
      isFocused: false,
      isHidden: true
    };
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('click', this.close);
      window.addEventListener('keydown', this.onKeyDown);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.children.length !== nextProps.children.length ||
      this.props.isShown !== nextProps.isShown ||
      this.props.hasChildSelected !== nextProps.hasChildSelected ||
      this.state !== nextState
    );
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('click', this.close);
      window.removeEventListener('keydown', this.onKeyDown);
    }
  }

  onFocus = () => this.setState({ isFocused: true });

  onBlur = () => this.setState({ isFocused: false });

  onKeyDown = event => {
    const { isFocused, isHidden } = this.state;
    if (event.keyCode === 13) {
      if (isFocused) {
        this.setState({ isHidden: !this.state.isHidden });
      } else if (!isHidden) {
        this.setState({ isHidden: true });
      }
    }
  };

  close = () => {
    if (!this.state.isHidden) {
      this.setState({ isHidden: true });
    }
  };

  toggleVisibility = event => {
    event.stopPropagation();
    this.setState({ isHidden: !this.state.isHidden });
  };

  render() {
    const { isShown, children, onShowMoreChanged, hasChildSelected, label } = this.props;
    if (!isShown || !children || !children.length) {
      return null;
    }

    const isListHidden = this.state.isHidden;
    const showMoreStyles = classNames({
      RRT__showmore: true,
      'RRT__showmore--selected': hasChildSelected
    });

    const listStyles = classNames({
      'RRT__showmore-list': true,
      'RRT__showmore-list--opened': !isListHidden
    });

    const showMoreLabelStyles = classNames({
      'RRT__showmore-label': true,
      'RRT__showmore-label--selected': !isListHidden
    });

    return (
      <div
        ref={onShowMoreChanged}
        className={showMoreStyles}
        role="navigation"
        tabIndex="0"
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onClick={this.toggleVisibility}
      >
        <div className={showMoreLabelStyles}>{label}</div>
        <div className={listStyles} aria-hidden={isListHidden} role="menu">
          {children}
        </div>
      </div>
    );
  }
}

ShowMore.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
  hasChildSelected: PropTypes.bool,
  isShown: PropTypes.bool.isRequired,
  onShowMoreChanged: PropTypes.func,
  label: PropTypes.string
};

ShowMore.defaultProps = {
  children: undefined,
  hasChildSelected: false,
  label: '...',
  onShowMoreChanged: () => null
};
