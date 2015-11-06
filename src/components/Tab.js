import React, {PropTypes, Component} from 'react';
import cx from 'classnames';

export default class Tab extends Component {

  render() {
    return (
      <div
        className={cx(
          'Tabs__Tab',
          this.props.className,
          {
            'Tabs__Tab--selected': this.props.selected,
            'Tabs__Tab--disabled': this.props.disabled
          }
        )}
        role="tab"
        id={this.props.id}
        aria-selected={this.props.selected ? 'true' : 'false'}
        aria-expanded={this.props.selected ? 'true' : 'false'}
        aria-disabled={this.props.disabled ? 'true' : 'false'}
        aria-controls={this.props.panelId}
        tabIndex="0"
        onClick={this.props.onClick}
      >
        {this.props.children}
      </div>

    );
  }
}

Tab.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  panelId: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ])
};

Tab.defaultProps = {
  selected: false,
  panelId: null
};