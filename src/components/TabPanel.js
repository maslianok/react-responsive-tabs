import React, { PureComponent, PropTypes } from 'react';

export default class TabPanel extends PureComponent {
  shouldComponentUpdate(nextProps) {
    return this.props.children !== nextProps.children ||
      this.props.classNames !== nextProps.classNames ||
      this.props.selected !== nextProps.selected;
  }

  render() {
    const { classNames, id, tabId, selected, children, getContent } = this.props;

    return (
      <div
        className={classNames}
        role="tabpanel"
        id={id}
        aria-labelledby={tabId}
        aria-hidden={selected ? 'false' : 'true'}
      >
        {selected && getContent && getContent()}
        {!getContent && children}
      </div>
    );
  }
}

TabPanel.propTypes = {
  getContent: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
  ]),
  id: PropTypes.string.isRequired,

  // generic props
  classNames: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  tabId: PropTypes.string.isRequired,
};

TabPanel.defaultProps = {
  getContent: undefined,
  children: undefined,
};
