import React, {PropTypes, Component} from 'react';

export default class Tab extends Component {

  render() {
    let props = this.props;

    return (
      <div
        className={props.classNames}
        role="tab"
        id={props.id}
        aria-selected={props.selected ? 'true' : 'false'}
        aria-expanded={props.selected ? 'true' : 'false'}
        aria-disabled={props.disabled ? 'true' : 'false'}
        aria-controls={props.panelId}
        tabIndex="0"
        onClick={this._onClick.bind(this)}
      >
        {props.children}
      </div>

    );
  }

  _onClick() {
    if (this.props.selected) {
      return false;
    }

    this.props.onClick(this.props.originalKey);
  }
}

Tab.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ]),
  disabled: PropTypes.bool,
  
  //generic props
  panelId: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  id: PropTypes.string,
  originalKey: PropTypes.string,

  classNames: PropTypes.string
};
