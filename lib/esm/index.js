function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import ResizeDetector from 'react-resize-detector';
import cs from 'classnames';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';
import ShowMore from "./components/ShowMore";
import Tab from "./components/Tab";
import TabPanel from "./components/TabPanel";
import InkBar from "./components/InkBar";
var tabPrefix = 'tab-';
var panelPrefix = 'panel-';

var Tabs =
/*#__PURE__*/
function (_Component) {
  _inherits(Tabs, _Component);

  function Tabs(props) {
    var _this;

    _classCallCheck(this, Tabs);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tabs).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onResize", function () {
      if (_this.tabsWrapper) {
        var currentIsCollapsed = _this.getIsCollapsed();

        _this.setState({
          blockWidth: _this.tabsWrapper.offsetWidth
        }, function () {
          var items = _this.props.items;
          var selectedTabKey = _this.state.selectedTabKey;

          var nextIsCollapsed = _this.getIsCollapsed();

          if (currentIsCollapsed && !nextIsCollapsed && selectedTabKey === -1 && items && items.length) {
            var firstTabKey = items[0].key || 0;

            _this.setState({
              selectedTabKey: firstTabKey
            });
          }
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeTab", function (nextTabKey) {
      var onChange = _this.props.onChange;
      var selectedTabKey = _this.state.selectedTabKey;

      var isCollapsed = _this.getIsCollapsed();

      if (isCollapsed && selectedTabKey === nextTabKey) {
        // hide on mobile
        _this.setState({
          selectedTabKey: -1
        });
      } else {
        // change active tab
        _this.setState({
          selectedTabKey: nextTabKey
        });
      }

      if (onChange) {
        onChange(nextTabKey);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onFocusTab", function (focusedTabKey) {
      return function () {
        return _this.setState({
          focusedTabKey: focusedTabKey
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onBlurTab", function () {
      return _this.setState({
        focusedTabKey: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (event) {
      var focusedTabKey = _this.state.focusedTabKey;

      if (event.keyCode === 13 && focusedTabKey !== null) {
        _this.setState({
          selectedTabKey: focusedTabKey
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setTabsDimensions", function () {
      if (!_this.tabsWrapper) {
        // it shouldn't happens evern. Just paranoic check
        return;
      } // initial wrapper width calculation


      var blockWidth = _this.tabsWrapper.offsetWidth; // calculate width and offset for each tab

      var tabsTotalWidth = 0;
      var tabDimensions = {};
      Object.keys(_this.tabRefs).forEach(function (key) {
        if (_this.tabRefs[key]) {
          var width = _this.tabRefs[key].tab.offsetWidth;
          tabDimensions[key.replace(tabPrefix, '')] = {
            width: width,
            offset: tabsTotalWidth
          };
          tabsTotalWidth += width;
        }
      });

      _this.setState({
        tabDimensions: tabDimensions,
        tabsTotalWidth: tabsTotalWidth,
        blockWidth: blockWidth
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getTabs", function () {
      var _this$props = _this.props,
          showMore = _this$props.showMore,
          transform = _this$props.transform,
          transformWidth = _this$props.transformWidth,
          items = _this$props.items,
          allowRemove = _this$props.allowRemove,
          removeActiveOnly = _this$props.removeActiveOnly,
          _onRemove = _this$props.onRemove;
      var _this$state = _this.state,
          blockWidth = _this$state.blockWidth,
          tabsTotalWidth = _this$state.tabsTotalWidth,
          tabDimensions = _this$state.tabDimensions,
          showMoreWidth = _this$state.showMoreWidth;

      var selectedTabKey = _this.getSelectedTabKey();

      var collapsed = blockWidth && transform && blockWidth < transformWidth;
      var tabIndex = 0;
      var availableWidth = blockWidth - (tabsTotalWidth > blockWidth ? showMoreWidth : 0);
      return items.reduce(function (result, item, index) {
        var _item$key = item.key,
            key = _item$key === void 0 ? index : _item$key,
            title = item.title,
            content = item.content,
            getContent = item.getContent,
            disabled = item.disabled,
            tabClassName = item.tabClassName,
            panelClassName = item.panelClassName;
        var selected = selectedTabKey === key;
        var payload = {
          tabIndex: tabIndex,
          collapsed: collapsed,
          selected: selected,
          disabled: disabled,
          key: key
        };

        var tabPayload = _objectSpread({}, payload, {
          title: title,
          onRemove: function onRemove(evt) {
            if (typeof _onRemove === 'function') {
              _onRemove(key, evt);
            }
          },
          allowRemove: allowRemove && (!removeActiveOnly || selected),
          className: tabClassName
        });

        var panelPayload = _objectSpread({}, payload, {
          content: content,
          getContent: getContent,
          className: panelClassName
        });

        var tabWidth = tabDimensions[key] ? tabDimensions[key].width : 0;
        tabIndex += 1;
        /* eslint-disable no-param-reassign */

        if ( // don't need to `Show more` button
        !showMore || // initial call
        !blockWidth || // collapsed mode
        collapsed || // all tabs are fit into the block
        blockWidth > tabsTotalWidth || // current tab fit into the block
        availableWidth - tabWidth > 0) {
          result.tabsVisible.push(tabPayload);
        } else {
          result.tabsHidden.push(tabPayload);
          if (selected) result.isSelectedTabHidden = true;
        }
        /* eslint-enable no-param-reassign */


        result.panels[key] = panelPayload; // eslint-disable-line no-param-reassign

        availableWidth -= tabWidth;
        return result;
      }, {
        tabsVisible: [],
        tabsHidden: [],
        panels: {},
        isSelectedTabHidden: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getTabProps", function (_ref) {
      var title = _ref.title,
          key = _ref.key,
          selected = _ref.selected,
          collapsed = _ref.collapsed,
          tabIndex = _ref.tabIndex,
          disabled = _ref.disabled,
          className = _ref.className,
          onRemove = _ref.onRemove,
          allowRemove = _ref.allowRemove;
      return {
        selected: selected,
        allowRemove: allowRemove,
        children: title,
        key: tabPrefix + key,
        id: tabPrefix + key,
        ref: function ref(e) {
          return _this.tabRefs[tabPrefix + key] = e;
        },
        originalKey: key,
        onClick: _this.onChangeTab,
        onFocus: _this.onFocusTab,
        onBlur: _this.onBlurTab,
        onRemove: onRemove,
        panelId: panelPrefix + key,
        classNames: _this.getClassNamesFor('tab', {
          selected: selected,
          collapsed: collapsed,
          tabIndex: tabIndex,
          disabled: disabled,
          className: className
        })
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getPanelProps", function (_ref2) {
      var key = _ref2.key,
          content = _ref2.content,
          getContent = _ref2.getContent,
          className = _ref2.className;
      return {
        getContent: getContent,
        children: content,
        key: panelPrefix + key,
        id: panelPrefix + key,
        tabId: tabPrefix + key,
        classNames: _this.getClassNamesFor('panel', {
          className: className
        })
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getShowMoreProps", function (isShown, isSelectedTabHidden, showMoreLabel) {
      return {
        onShowMoreChanged: _this.showMoreChanged,
        isShown: isShown,
        label: showMoreLabel,
        hasChildSelected: isSelectedTabHidden
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getClassNamesFor", function (type, _ref3) {
      var selected = _ref3.selected,
          collapsed = _ref3.collapsed,
          tabIndex = _ref3.tabIndex,
          disabled = _ref3.disabled,
          _ref3$className = _ref3.className,
          className = _ref3$className === void 0 ? '' : _ref3$className;
      var _this$props2 = _this.props,
          tabClass = _this$props2.tabClass,
          panelClass = _this$props2.panelClass;

      switch (type) {
        case 'tab':
          return cs('RRT__tab', className, tabClass, {
            'RRT__tab--first': !tabIndex,
            'RRT__tab--selected': selected,
            'RRT__tab--disabled': disabled,
            'RRT__tab--collapsed': collapsed
          });

        case 'panel':
          return cs('RRT__panel', className, panelClass);

        default:
          return '';
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getSelectedTabKey", function () {
      var items = _this.props.items;
      var selectedTabKey = _this.state.selectedTabKey;

      if (typeof selectedTabKey === 'undefined') {
        if (!items[0]) {
          return undefined;
        }

        return items[0].key || 0;
      }

      return selectedTabKey;
    });

    _defineProperty(_assertThisInitialized(_this), "getIsCollapsed", function () {
      var _this$props3 = _this.props,
          transform = _this$props3.transform,
          transformWidth = _this$props3.transformWidth;
      var blockWidth = _this.state.blockWidth;
      return blockWidth && transform && blockWidth < transformWidth;
    });

    _defineProperty(_assertThisInitialized(_this), "showMoreChanged", function (element) {
      if (!element) {
        return;
      }

      var showMoreWidth = _this.state.showMoreWidth;
      var offsetWidth = element.offsetWidth;

      if (showMoreWidth === offsetWidth) {
        return;
      }

      _this.setState({
        showMoreWidth: offsetWidth
      });
    });

    _this.tabRefs = {};
    _this.selectedTabKeyProp = props.selectedTabKey;
    _this.state = {
      tabDimensions: {},
      blockWidth: 0,
      tabsTotalWidth: 0,
      showMoreWidth: 40,
      selectedTabKey: props.selectedTabKey,
      focusedTabKey: null
    };
    _this.onResizeThrottled = throttle(_this.onResize, props.resizeThrottle, {
      trailing: true
    });
    return _this;
  }

  _createClass(Tabs, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setTabsDimensions();
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var _this$state2 = this.state,
          selectedTabKey = _this$state2.selectedTabKey,
          blockWidth = _this$state2.blockWidth,
          showMoreWidth = _this$state2.showMoreWidth;
      var _this$props4 = this.props,
          items = _this$props4.items,
          transform = _this$props4.transform,
          showMore = _this$props4.showMore,
          showInkBar = _this$props4.showInkBar,
          allowRemove = _this$props4.allowRemove,
          removeActiveOnly = _this$props4.removeActiveOnly;
      return items !== nextProps.items || nextProps.transform !== transform || nextProps.showMore !== showMore || nextProps.showInkBar !== showInkBar || nextProps.allowRemove !== allowRemove || nextProps.removeActiveOnly !== removeActiveOnly || nextState.blockWidth !== blockWidth || nextState.showMoreWidth !== showMoreWidth || nextProps.selectedTabKey !== this.selectedTabKeyProp || nextState.selectedTabKey !== selectedTabKey;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props5 = this.props,
          items = _this$props5.items,
          selectedTabKey = _this$props5.selectedTabKey;

      if (this.selectedTabKeyProp !== selectedTabKey) {
        this.setState({
          selectedTabKey: selectedTabKey
        });
      }

      if (items !== prevProps.items) {
        this.setTabsDimensions();
      }

      this.selectedTabKeyProp = selectedTabKey;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props6 = this.props,
          showInkBar = _this$props6.showInkBar,
          containerClass = _this$props6.containerClass,
          tabsWrapperClass = _this$props6.tabsWrapperClass,
          showMore = _this$props6.showMore,
          transform = _this$props6.transform,
          showMoreLabel = _this$props6.showMoreLabel;
      var tabDimensions = this.state.tabDimensions;

      var _this$getTabs = this.getTabs(),
          tabsVisible = _this$getTabs.tabsVisible,
          tabsHidden = _this$getTabs.tabsHidden,
          panels = _this$getTabs.panels,
          isSelectedTabHidden = _this$getTabs.isSelectedTabHidden;

      var isCollapsed = this.getIsCollapsed();
      var selectedTabKey = this.getSelectedTabKey();
      var selectedTabDimensions = tabDimensions[selectedTabKey] || {};
      var containerClasses = cs('RRT__container', containerClass);
      var tabsClasses = cs('RRT__tabs', tabsWrapperClass, {
        RRT__accordion: isCollapsed
      });
      return React.createElement("div", {
        className: containerClasses,
        ref: function ref(e) {
          return _this2.tabsWrapper = e;
        },
        onKeyDown: this.onKeyDown
      }, React.createElement("div", {
        className: tabsClasses
      }, tabsVisible.reduce(function (result, tab) {
        result.push(React.createElement(Tab, _this2.getTabProps(tab)));

        if (isCollapsed && selectedTabKey === tab.key) {
          result.push(React.createElement(TabPanel, _this2.getPanelProps(panels[tab.key])));
        }

        return result;
      }, []), !isCollapsed && React.createElement(ShowMore, this.getShowMoreProps(showMore, isSelectedTabHidden, showMoreLabel), tabsHidden.map(function (tab) {
        return React.createElement(Tab, _this2.getTabProps(tab));
      }))), showInkBar && !isCollapsed && !isSelectedTabHidden && React.createElement(InkBar, {
        left: selectedTabDimensions.offset || 0,
        width: selectedTabDimensions.width || 0
      }), !isCollapsed && panels[selectedTabKey] && React.createElement(TabPanel, this.getPanelProps(panels[selectedTabKey])), (showMore || transform) && React.createElement(ResizeDetector, {
        handleWidth: true,
        onResize: this.onResizeThrottled
      }));
    }
  }]);

  return Tabs;
}(Component);

export { Tabs as default };
Tabs.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  // list of tabs
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),

  /* eslint-enable react/no-unused-prop-types */
  // selected tab key
  selectedTabKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // show 'X' and remove tab
  allowRemove: PropTypes.bool,
  // show 'X' closing element only for active tab
  removeActiveOnly: PropTypes.bool,
  // move tabs to the special `Show more` tab if they don't fit into a screen
  showMore: PropTypes.bool,
  // materialUI-like rail under the selected tab
  showInkBar: PropTypes.bool,
  // transform to the accordion on small screens
  transform: PropTypes.bool,
  // tabs will be transformed to accodrion for screen sizes below `transformWidth`px
  transformWidth: PropTypes.number,
  // onChange active tab callback
  onChange: PropTypes.func,
  // onRemove callback
  onRemove: PropTypes.func,
  // frequency of onResize recalculation fires
  resizeThrottle: PropTypes.number,
  // classnames
  containerClass: PropTypes.string,
  tabsWrapperClass: PropTypes.string,
  tabClass: PropTypes.string,
  panelClass: PropTypes.string,
  // labels
  showMoreLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};
Tabs.defaultProps = {
  items: [],
  selectedTabKey: undefined,
  showMore: true,
  showInkBar: false,
  allowRemove: false,
  removeActiveOnly: false,
  transform: true,
  transformWidth: 800,
  resizeThrottle: 100,
  containerClass: undefined,
  tabsWrapperClass: undefined,
  tabClass: undefined,
  panelClass: undefined,
  showMoreLabel: '...',
  onChange: function onChange() {
    return null;
  },
  onRemove: function onRemove() {
    return null;
  }
};