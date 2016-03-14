import React, { PropTypes } from 'react';

function onTabClick(selected, onClick, originalKey) {
  return () => !selected && onClick(originalKey);
}

const Tab = ({
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
}) => (
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

export default Tab;

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
  originalKey: PropTypes.string,

  classNames: PropTypes.string,
};
