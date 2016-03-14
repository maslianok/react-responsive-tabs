import React, { Component, PropTypes } from 'react';

function onTabClick(selected, onClick, originalKey) {
  return () => !selected && onClick(originalKey);
}

export default class Tab extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.children !== nextProps.children ||
      this.props.selected !== nextProps.selected ||
      this.props.classNames !== nextProps.classNames;
  }

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
    } = this.props;

    return (
      <div
        className={classNames}
        role="tab"
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
        {children}
      </div>
    );
  }
}

Tab.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
  ]),
  disabled: PropTypes.bool,

  // generic props
  panelId: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  id: PropTypes.string,
  originalKey: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  classNames: PropTypes.string,
};
