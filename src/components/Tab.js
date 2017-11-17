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

  _renderTabs = (selected, tabs, onRemove, allowRemove, removeActiveOnly) => {
    if (allowRemove && !removeActiveOnly) {
      return (
        <div style={{ position: 'relative', background: 'red' }}>
          <div style={{ marginRight: '10px'}}>{tabs}</div>
          <div style={{ position: 'absolute', rigth: '10px', top: '10px' }} onClick={onRemove()}>x</div>
        </div>
      );

    } else if (allowRemove && removeActiveOnly) {
      return (
        selected ?
          (
            <div style={{ position: 'relative', background: 'red' }}>
              <div style={{ marginRight: '10px'}}>{tabs}</div>
              <div style={{ position: 'absolute', right: '10px', top: '10px' }} onClick={onRemove()}>x</div>
            </div>
          ) : <div>{tabs}</div>
      );
    }

    return (tabs);
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
  id: PropTypes.string.isRequired,
  originalKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  classNames: PropTypes.string.isRequired,
};

Tab.defaultProps = {
  children: undefined,
  onRemove: () => {
  },
  disabled: false,
};
