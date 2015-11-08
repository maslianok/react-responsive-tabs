//use resize sensor to handle block resize
//use accessibility principles
//responsive layout

//IdleCallback?
//react router

import React, {PropTypes, Component, cloneElement} from 'react';
import {findDOMNode} from 'react-dom';

import ShowMore from './ShowMore';
// import ResizeDetector from './ResizeDetector';

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

    // this._onResize = this._onResize.bind(this);
    this._clone = this._clone.bind(this);
    this._updateTabsWidth = this._updateTabsWidth.bind(this);
    this._getElements = this._getElements.bind(this);
  }

  componentDidMount() {
    this._updateTabsWidth(true);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this._updateTabsWidth();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props ||
      nextState.elements !== this.state.elements ||
      nextState.blockWidth !== this.state.blockWidth ||
      nextState.selectedKey !== this.state.selectedKey;
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
      </div>
    );

    // <ResizeDetector onResize={this._onResize} />
  }

  _updateTabsWidth(initialCall) {
    let tabRefs = this.tabRefs;
    let tabsTotalWidth = 0;
    let tabsWidth = {};

    Object.keys(tabRefs).forEach((key) => {
      const width = findDOMNode(tabRefs[key]).offsetWidth;
      tabsWidth[key] = width;
      tabsTotalWidth += width;
    });

    let newState = {tabsWidth, tabsTotalWidth};

    if (initialCall) {
      let showMore = findDOMNode(this.refs.tabsShowMore);
      if (showMore) {
        newState.showMoreWidth = showMore.offsetWidth;
      }
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
    const {showMore, transformWidth} = this.props.showMore;
    const {blockWidth, tabsTotalWidth, tabsWidth} = state;
    const collapsed = blockWidth < transformWidth;

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
        availableWidth - tabsWidth[key] > 0
      ) {
        result.visible.push(Tab);
      } else {
        result.hidden.push(Tab);
      }
      result.visible.push(Panel);
      availableWidth -= tabsWidth[key];

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
    this.setState({blockWidth: tabpanel.offsetWidth});
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
