import React from 'react';
import PropTypes from 'prop-types';

export const InkBar = ({ left, width }) => (
  <div className="RRT__inkbar-wrapper">
    <div className="RRT__inkbar" style={{ left, width }} />
  </div>
);

export default InkBar;

InkBar.propTypes = {
  left: PropTypes.number,
  width: PropTypes.number
};

InkBar.defaultProps = {
  left: 0,
  width: 0
};
