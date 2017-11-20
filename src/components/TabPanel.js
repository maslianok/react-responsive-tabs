import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TabPanel extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.getContent !== nextProps.getContent ||
      this.props.children !== nextProps.children ||
      this.props.classNames !== nextProps.classNames;
  }

  render() {
    const {
      classNames,
      id,
      tabId,
      children,
      getContent,
    } = this.props;

    return (
      <div className={classNames} role="tabpanel" id={id} aria-labelledby={tabId} aria-hidden="false">
        {getContent && getContent()}
        {!getContent && children}
      </div>
    );
  }
}

TabPanel.propTypes = {
  getContent: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
  id: PropTypes.string.isRequired,

  // generic props
  classNames: PropTypes.string.isRequired,
  tabId: PropTypes.string.isRequired,
};

TabPanel.defaultProps = {
  getContent: undefined,
  children: undefined,
};
