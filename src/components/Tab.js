import React, { Component } from 'react';
import PropTypes from 'prop-types';

function onTabClick(selected, onClick, originalKey) {
  return () => !selected && onClick(originalKey);
}

export default class Tab extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.children !== nextProps.children ||
      this.props.selected !== nextProps.selected ||
      this.props.classNames !== nextProps.classNames
    );
  }

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
    const { id, classNames, selected, disabled, panelId, onClick, onFocus, onBlur, originalKey } = this.props;

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
        onClick={onTabClick(selected, onClick, originalKey)}
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
