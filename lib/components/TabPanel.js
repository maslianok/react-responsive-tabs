"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TabPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(TabPanel, _Component);

  function TabPanel() {
    _classCallCheck(this, TabPanel);

    return _possibleConstructorReturn(this, _getPrototypeOf(TabPanel).apply(this, arguments));
  }

  _createClass(TabPanel, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var _this$props = this.props,
          children = _this$props.children,
          getContent = _this$props.getContent,
          classNames = _this$props.classNames;
      return getContent !== nextProps.getContent || children !== nextProps.children || classNames !== nextProps.classNames;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          classNames = _this$props2.classNames,
          id = _this$props2.id,
          tabId = _this$props2.tabId,
          children = _this$props2.children,
          getContent = _this$props2.getContent;
      return _react["default"].createElement("div", {
        className: classNames,
        role: "tabpanel",
        id: id,
        "aria-labelledby": tabId,
        "aria-hidden": "false"
      }, getContent && getContent(), !getContent && children);
    }
  }]);

  return TabPanel;
}(_react.Component);

exports["default"] = TabPanel;
TabPanel.propTypes = {
  getContent: _propTypes["default"].func,
  children: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].object, _propTypes["default"].string]),
  id: _propTypes["default"].string.isRequired,
  // generic props
  classNames: _propTypes["default"].string.isRequired,
  tabId: _propTypes["default"].string.isRequired
};
TabPanel.defaultProps = {
  getContent: undefined,
  children: undefined
};