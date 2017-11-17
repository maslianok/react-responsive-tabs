import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

function onTabClick(selected, onClick, originalKey) {
  return () => !selected && onClick(originalKey);
}

export default class Tab extends PureComponent {
  shouldComponentUpdate(nextProps) {
    return this.props.children !== nextProps.children ||
      this.props.selected !== nextProps.selected ||
      this.props.classNames !== nextProps.classNames;
  }

  _renderRemovableTab = (children, onRemove) => (
    <div className="RRT__removable">
      <div className="RRT__removable-text">{children}</div>
      <div className="RRT__removable-icon" onClick={onRemove()}>x</div>
    </div>
  );

  _renderTabs = (selected, children, onRemove, allowRemove, removeActiveOnly) => {
    if (allowRemove && !removeActiveOnly) this._renderRemovableTab(children, onRemove);

    if (allowRemove && removeActiveOnly) {
      return (
        selected ?
          this._renderRemovableTab(children, onRemove) :
          children
      );
    }

    return (children);
  };

  render() {
    const {
      id,
      classNames,
      selected,
      disabled,
      panelId,
      onClick,
      onFocus,
      onBlur,
      originalKey,
      children,
      onRemove,
      allowRemove,
      removeActiveOnly
    } = this.props;

    return (
      <div
        ref={e => this.tab = e}
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
        {this._renderTabs(
          selected,
          children,
          onRemove,
          allowRemove,
          removeActiveOnly
        )}
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
  removeActiveOnly: PropTypes.bool,
  id: PropTypes.string.isRequired,
  originalKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  classNames: PropTypes.string.isRequired,
};

Tab.defaultProps = {
  children: undefined,
  onRemove: () => {},
  allowRemove: false,
  removeActiveOnly: false,
  disabled: false,
};
