//TODO IdleCallback
//TODO react router

//TODO click handler
//TODO show more handler

import React, {PropTypes, Component, cloneElement} from 'react';
import {findDOMNode} from 'react-dom';

import ShowMore from './ShowMore';
import ResizeDetector from './ResizeDetector';

import childrenPropType from '../helpers/childrenPropType';
import defaultStyles from '../helpers/tabStyles';

const tabPrefix = 'tab-';
const panelPrefix = 'panel-';

export default class Tabs extends Component {

  constructor(props) {
    super(props);

    this.tabRefs = {};

    this.state = {
      tabsWidth: {},
      blockWidth: 0,
      tabsTotalWidth: 0,
      showMoreWidth: 40,
      selectedKey: this.props.selectedKey
    };

    this._clone = this._clone.bind(this);
    this._onResize = this._onResize.bind(this);
    this._setTabsWidth = this._setTabsWidth.bind(this);
    this._getElements = this._getElements.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //TODO: how else can we check that Tab children has changed 
    //and we have to recalculate tabsWidth
    let updateTabs = false;
    const children = this.props.children;
    const nextChildren = nextProps.children;
    if (children.length != nextChildren.length) {
      updateTabs = true;
    } else {
      for (let i = 0; i < children.length; i++) {
        if (
          children[i].type.name == 'Tab' && 
          (children[i].key != nextChildren[i].key ||
          children[i].props.children != nextChildren[i].props.children)
        ) {
          updateTabs = true;
          break;
        }
      }
    }

    if (updateTabs) {
      console.log('Tabs has been updated! Start recalculating...');
      this.setState({blockWidth: 0});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props ||
      nextState.blockWidth !== this.state.blockWidth ||
      nextState.selectedKey !== this.state.selectedKey;
  }

  componentDidMount() {
    this._setTabsWidth();
  }

  componentDidUpdate() {
    if (!this.state.blockWidth) {
      this._setTabsWidth();
    }
  }

  render() {
    console.log('render Tabs');
    const styles = Object.assign({}, defaultStyles.tabsWrapper, this.props.styles);

    let {visible, hidden} = this._getElements();

    return (
      <div
        style = {styles}
        ref = "tabsWrapper"
        onKeyDown={this._handleKeyDown}>

        {visible}

        <ShowMore
          ref = "tabsShowMore"
          style = {defaultStyles.showMoreStyles}
          isShown = {this.props.showMore}
          hiddenTabs = {hidden}
        />

        <ResizeDetector handleWidth onResize={this._onResize} />
      </div>
    );
  }

  _setTabsWidth() {
    const tabRefs = this.tabRefs;
    const cachedWidth = this.state.tabsWidth;

    const blockWidth = this.refs.tabsWrapper.offsetWidth;

    let tabsTotalWidth = 0;
    let tabsWidth = {};
    Object.keys(tabRefs).forEach((key) => {
      const width = findDOMNode(tabRefs[key]).offsetWidth;
      tabsWidth[key] = width;
      tabsTotalWidth += width;
    });

    let newState = {tabsWidth, tabsTotalWidth, blockWidth};

    let showMore = findDOMNode(this.refs.tabsShowMore);
    if (showMore) {
      newState.showMoreWidth = showMore.offsetWidth;
    }

    this.setState(newState);
  }

  _getElements() {
    let elements = {};
    this.props.children.forEach((child) => {
      if (!elements[child.key]) {
        elements[child.key] = {};
      }

      elements[child.key][child.type.name] = child;
    });

    const state = this.state;
    const clone = this._clone;
    const {showMore, transformWidth} = this.props;
    const {blockWidth, tabsTotalWidth, tabsWidth} = state;
    const collapsed = blockWidth && blockWidth < transformWidth;

    let tabIndex = 0;
    let availableWidth = blockWidth - (tabsTotalWidth > blockWidth ? state.showMoreWidth : 0);

    return Object.keys(elements).reduce((result, key) => {
      const originalTab = elements[key].Tab;
      const originalPanel = elements[key].TabPanel;

      const selected = (!state.selectedKey && !tabIndex) || state.selectedKey === originalTab.key;
      const disabled = originalTab.props.disabled;
      const payload = {tabIndex, collapsed, selected, disabled};

      const Tab = clone(originalTab, payload);
      const Panel = clone(originalPanel, payload);

      const tabWidth = tabsWidth[key] || 0;

      tabIndex++;

      if (
        //don't need to `Show more` button
        !showMore ||
        //initial call
        !blockWidth || !tabsTotalWidth ||
        //collapsed mode
        collapsed ||
        //all tabs are fit into the block
        blockWidth > tabsTotalWidth ||
        //current tab fit into the block
        availableWidth - tabWidth > 0
      ) {
        result.visible.push(Tab);
      } else {
        result.hidden.push(Tab);
      }
      result.visible.push(Panel);
      availableWidth -= tabWidth;

      return {visible: result.visible, hidden: result.hidden};
    }, {visible: [], hidden: []});
  }

  _clone(element, payload) {
    const key = element.key;
    let props;
    switch (element.type.name) {
      case 'Tab':
        props = {
          key: tabPrefix + key,
          originalKey: key,
          ref: (tab) => {tab && (this.tabRefs[tab.props.originalKey] = tab)},
          panelId: panelPrefix + key, 
          selected: payload.selected, 
          tabStyle: this._getStylesFor(element, payload)
        };
        break;
      case 'TabPanel':
        props = {
          key: panelPrefix + key,
          tabId: tabPrefix + key,
          selected: payload.selected, 
          panelStyle: this._getStylesFor(element, payload)
        };
        break;
    }
    return cloneElement(element, props);
  }

  _getStylesFor(element, payload) {
    const {
      style = {}, 
      selectedStyle = {}, 
      disabledStyle = {}
    } = element.props;

    const {
      defaultStyle, 
      firstTabStyle, 
      defaultSelectedStyle, 
      defaultDisabledStyle, 
      defaultCollapsedStyle
    } = defaultStyles[element.type.name];

    switch (element.type.name) {
      case 'Tab':
        return Object.assign(
          {}, 
          defaultStyle, 
          style, 
          payload.tabIndex ? {} : firstTabStyle,
          payload.selected ? defaultSelectedStyle : {},
          payload.selected ? selectedStyle : {},
          payload.disabled ? defaultDisabledStyle : {},
          payload.disabled ? disabledStyle : {},
          payload.collapsed ? defaultCollapsedStyle : {}
        );
        break;
      case 'TabPanel':
        return Object.assign(
          {},
          defaultStyle,
          style,
          payload.selected ? defaultSelectedStyle : {display: 'none'},
          payload.collapsed ? defaultCollapsedStyle : {}
        );
        break;
    }
  }

  _onResize(tabpanel) {
    this.setState({blockWidth: this.refs.tabsWrapper.offsetWidth});
  }

}

Tabs.propTypes = {
  children: childrenPropType,
  idPrefix: PropTypes.string,
  onSelect: PropTypes.func,
  selectedKey: PropTypes.any,
  showMore: PropTypes.bool,
  styles: PropTypes.object,
  transform: PropTypes.bool,
  transformWidth: PropTypes.number
};

Tabs.defaultProps = {
  showMore: true,
  transform: true,
  transformWidth: 800,
  styles: {}
};
