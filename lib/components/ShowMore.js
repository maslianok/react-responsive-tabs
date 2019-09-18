"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ShowMore =
/*#__PURE__*/
function (_Component) {
  _inherits(ShowMore, _Component);

  function ShowMore() {
    var _this;

    _classCallCheck(this, ShowMore);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ShowMore).call(this));

    _defineProperty(_assertThisInitialized(_this), "onFocus", function () {
      return _this.setState({
        isFocused: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
      return _this.setState({
        isFocused: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (event) {
      var _this$state = _this.state,
          isFocused = _this$state.isFocused,
          isHidden = _this$state.isHidden;

      if (event.keyCode === 13) {
        if (isFocused) {
          _this.setState({
            isHidden: !isHidden
          });
        } else if (!isHidden) {
          _this.setState({
            isHidden: true
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "close", function () {
      var isHidden = _this.state.isHidden;

      if (!isHidden) {
        _this.setState({
          isHidden: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "toggleVisibility", function (event) {
      var isHidden = _this.state.isHidden;
      event.stopPropagation();

      _this.setState({
        isHidden: !isHidden
      });
    });

    _this.state = {
      isFocused: false,
      isHidden: true
    };
    return _this;
  }

  _createClass(ShowMore, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (typeof window !== 'undefined') {
        window.addEventListener('click', this.close);
        window.addEventListener('keydown', this.onKeyDown);
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var _this$props = this.props,
          children = _this$props.children,
          isShown = _this$props.isShown,
          hasChildSelected = _this$props.hasChildSelected;
      return children.length !== nextProps.children.length || isShown !== nextProps.isShown || hasChildSelected !== nextProps.hasChildSelected || this.state !== nextState;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (typeof window !== 'undefined') {
        window.removeEventListener('click', this.close);
        window.removeEventListener('keydown', this.onKeyDown);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          isShown = _this$props2.isShown,
          children = _this$props2.children,
          onShowMoreChanged = _this$props2.onShowMoreChanged,
          hasChildSelected = _this$props2.hasChildSelected,
          label = _this$props2.label;
      var isHidden = this.state.isHidden;

      if (!isShown || !children || !children.length) {
        return null;
      }

      var isListHidden = isHidden;
      var showMoreStyles = (0, _classnames["default"])({
        RRT__showmore: true,
        'RRT__showmore--selected': hasChildSelected
      });
      var listStyles = (0, _classnames["default"])({
        'RRT__showmore-list': true,
        'RRT__showmore-list--opened': !isListHidden
      });
      var showMoreLabelStyles = (0, _classnames["default"])({
        'RRT__showmore-label': true,
        'RRT__showmore-label--selected': !isListHidden
      });
      return _react["default"].createElement("div", {
        ref: onShowMoreChanged,
        className: showMoreStyles,
        role: "navigation",
        tabIndex: "0",
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onClick: this.toggleVisibility
      }, _react["default"].createElement("div", {
        className: showMoreLabelStyles
      }, label), _react["default"].createElement("div", {
        className: listStyles,
        "aria-hidden": isListHidden,
        role: "menu"
      }, children));
    }
  }]);

  return ShowMore;
}(_react.Component);

exports["default"] = ShowMore;
ShowMore.propTypes = {
  children: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].object, _propTypes["default"].string]),
  hasChildSelected: _propTypes["default"].bool,
  isShown: _propTypes["default"].bool.isRequired,
  onShowMoreChanged: _propTypes["default"].func,
  label: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node])
};
ShowMore.defaultProps = {
  children: undefined,
  hasChildSelected: false,
  label: '...',
  onShowMoreChanged: function onShowMoreChanged() {
    return null;
  }
};