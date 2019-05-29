import React from 'react';
import PropTypes from 'prop-types';
export var InkBar = function InkBar(_ref) {
  var left = _ref.left,
      width = _ref.width;
  return React.createElement("div", {
    className: "RRT__inkbar-wrapper"
  }, React.createElement("div", {
    className: "RRT__inkbar",
    style: {
      left: left,
      width: width
    }
  }));
};
export default InkBar;
InkBar.propTypes = {
  left: PropTypes.number,
  width: PropTypes.number
};
InkBar.defaultProps = {
  left: 0,
  width: 0
};