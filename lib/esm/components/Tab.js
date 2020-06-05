function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

var Tab = /*#__PURE__*/function (_Component) {
  _inherits(Tab, _Component);

  var _super = _createSuper(Tab);

  function Tab() {
    var _this;

    _classCallCheck(this, Tab);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "onTabClick", function () {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          originalKey = _this$props.originalKey;
      onClick(originalKey);
    });

    _defineProperty(_assertThisInitialized(_this), "renderRemovableTab", function () {
      var _this$props2 = _this.props,
          children = _this$props2.children,
          onRemove = _this$props2.onRemove;
      return /*#__PURE__*/React.createElement("div", {
        className: "RRT__removable"
      }, /*#__PURE__*/React.createElement("div", {
        className: "RRT__removable-text"
      }, children), /*#__PURE__*/React.createElement("div", {
        className: "RRT__removable-icon",
        onClick: onRemove
      }, "x"));
    });

    _defineProperty(_assertThisInitialized(_this), "renderTab", function () {
      var _this$props3 = _this.props,
          children = _this$props3.children,
          allowRemove = _this$props3.allowRemove;

      if (allowRemove) {
        return _this.renderRemovableTab();
      }

      return children;
    });

    return _this;
  }

  _createClass(Tab, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var _this$props4 = this.props,
          children = _this$props4.children,
          selected = _this$props4.selected,
          classNames = _this$props4.classNames;
      return children !== nextProps.children || selected !== nextProps.selected || classNames !== nextProps.classNames;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props5 = this.props,
          id = _this$props5.id,
          classNames = _this$props5.classNames,
          selected = _this$props5.selected,
          disabled = _this$props5.disabled,
          panelId = _this$props5.panelId,
          onFocus = _this$props5.onFocus,
          onBlur = _this$props5.onBlur,
          originalKey = _this$props5.originalKey;
      return /*#__PURE__*/React.createElement("div", {
        ref: function ref(e) {
          return _this2.tab = e;
        },
        role: "tab",
        className: classNames,
        id: id,
        "aria-selected": selected ? 'true' : 'false',
        "aria-expanded": selected ? 'true' : 'false',
        "aria-disabled": disabled ? 'true' : 'false',
        "aria-controls": panelId,
        tabIndex: "0",
        onClick: this.onTabClick,
        onFocus: onFocus(originalKey),
        onBlur: onBlur
      }, this.renderTab());
    }
  }]);

  return Tab;
}(Component);

export { Tab as default };
Tab.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
  disabled: PropTypes.bool,
  // generic props
  panelId: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  allowRemove: PropTypes.bool,
  id: PropTypes.string.isRequired,
  originalKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  classNames: PropTypes.string.isRequired
};
Tab.defaultProps = {
  children: undefined,
  onRemove: function onRemove() {},
  allowRemove: false,
  disabled: false
};