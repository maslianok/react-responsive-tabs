import React, { PropTypes } from 'react';

const TabPanel = ({ classNames, key, tabId, selected, children }) => (
  <div
    className={classNames}
    role="tabpanel"
    id={key}
    aria-labeledby={tabId}
    aria-hidden={selected ? 'false' : 'true'}
  >
    {children}
  </div>
);

export default TabPanel;

TabPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
  ]),
  key: PropTypes.string,

  // generic props
  classNames: PropTypes.string,
  selected: PropTypes.bool,
  tabId: PropTypes.string,
};

