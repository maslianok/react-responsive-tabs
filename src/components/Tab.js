import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Tab extends Component {
  shouldComponentUpdate(nextProps) {
    const { children, selected, classNames } = this.props;
    return children !== nextProps.children || selected !== nextProps.selected || classNames !== nextProps.classNames;
  }

  onTabClick = evt => {
    const { onClick, originalKey } = this.props;
    onClick(originalKey, evt);
  };

  renderRemovableTab = () => {
    const { children, onRemove } = this.props;
    return (
      <div className="RRT__removable">
        <div className="RRT__removable-text">{children}</div>
        <div className="RRT__removable-icon" onClick={onRemove}>
          x
        </div>
      </div>
    );
  };

  renderTab = () => {
    const { children, allowRemove } = this.props;

    if (allowRemove) {
      return this.renderRemovableTab();
    }

    return children;
  };

  render() {
    const { id, classNames, selected, disabled, panelId, onFocus, onBlur, originalKey } = this.props;

    return (
      <div
        ref={e => (this.tab = e)}
        role="tab"
        className={classNames}
        id={id}
        aria-selected={selected ? 'true' : 'false'}
        aria-expanded={selected ? 'true' : 'false'}
        aria-disabled={disabled ? 'true' : 'false'}
        aria-controls={panelId}
        tabIndex="0"
        onClick={this.onTabClick}
        onFocus={onFocus(originalKey)}
        onBlur={onBlur}
      >
        {this.renderTab()}
      </div>
    );
  }
}

Tab.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
  disabled: PropTypes.bool,

  // generic props
  panelId: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  allowRemove: PropTypes.bool,
  id: PropTypes.string.isRequired,
  originalKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  classNames: PropTypes.string.isRequired,
};

Tab.defaultProps = {
  children: undefined,
  onRemove: () => {},
  allowRemove: false,
  disabled: false,
};
