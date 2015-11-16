import React, {PropTypes, Component} from 'react';

export default class TabPanel extends Component {
  render() {
    const props = this.props;

    return (
      <div
        className={props.classNames}
        role="tabpanel"
        id={props.key}
        aria-labeledby={props.tabId}
        aria-hidden={props.selected ? 'false' : 'true'}
      >
        {props.children}
      </div>
    );
  }
}

TabPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ]),
  key: PropTypes.string,
  style: PropTypes.object,

  //generic props
  classNames: PropTypes.string,
  selected: PropTypes.bool,
  tabId: PropTypes.string
};

