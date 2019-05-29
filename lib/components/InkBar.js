"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.InkBar = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var InkBar = function InkBar(_ref) {
  var left = _ref.left,
      width = _ref.width;
  return _react["default"].createElement("div", {
    className: "RRT__inkbar-wrapper"
  }, _react["default"].createElement("div", {
    className: "RRT__inkbar",
    style: {
      left: left,
      width: width
    }
  }));
};

exports.InkBar = InkBar;
var _default = InkBar;
exports["default"] = _default;
InkBar.propTypes = {
  left: _propTypes["default"].number,
  width: _propTypes["default"].number
};
InkBar.defaultProps = {
  left: 0,
  width: 0
};