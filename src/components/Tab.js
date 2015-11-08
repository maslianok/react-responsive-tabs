import React, {PropTypes, Component} from 'react';

export default class Tab extends Component {

  render() {
    let props = this.props;

    return (
      <div
        style={props.tabStyle}
        role="tab"
        id={props.key}
        aria-selected={props.selected ? 'true' : 'false'}
        aria-expanded={props.selected ? 'true' : 'false'}
        aria-disabled={props.disabled ? 'true' : 'false'}
        aria-controls={props.panelId}
        tabIndex="0"
        onClick={props.onClick}
      >
        {props.children}
      </div>

    );
  }
}

Tab.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ]),
  disabled: PropTypes.bool,
  key: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  selectedStyle: PropTypes.object,
  disabledStyle: PropTypes.object,
  
  //generic props
  panelId: PropTypes.string,
  selected: PropTypes.bool,
  tabStyle: PropTypes.object
};

Tab.defaultProps = {
};
