import React, {PropTypes, Component} from 'react';
import cx from 'classnames';

export default class TabPanel extends Component {
  render() {

    return (
      <div
        className={cx(
          'Tabs__TabPanel',
          this.props.className,
          {
            'Tabs__TabPanel--selected': this.props.selected
          }
        )}
        role="tabpanel"
        id={this.props.id}
        aria-labeledby={this.props.tabId}
        aria-hidden={this.props.selected ? 'false' : 'true'}
        style={{display: this.props.selected ? null : 'none'}}
      >
        {this.props.children}
      </div>
    );
  }
}

TabPanel.propTypes = {
  className: PropTypes.string,
  selected: PropTypes.bool,
  tabId: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ])
};

TabPanel.defaultProps = {
  selected: false,
  tabId: null
};
