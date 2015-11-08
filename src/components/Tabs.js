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

    this.state = {
      elements: {},
      tabsWidth: {},
      blockWidth: 0,
      tabsTotalWidth: 0,
      showMoreWidth: 0,
      selectedKey: this.props.selectedKey
    };

    // this._onResize = this._onResize.bind(this);
    this._clone = this._clone.bind(this);
    this._updateElements = this._updateElements.bind(this);
    this._updateTabsWidth = this._updateTabsWidth.bind(this);
    this._getElements = this._getElements.bind(this);
  }

  componentWillMount() {
    this._updateElements();
  }

  componentWillReceiveProps() {
    this._updateElements();
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
    const styles = Object.assign({}, defaultStyles.tabsWrapper, this.props.styles);

    let {visible, hidden} = this._getElements();

    console.log(visible, hidden);

    return (
      <div
        styles={styles}
        onKeyDown={this._handleKeyDown}>

        {visible}

        <ShowMore
          ref = "Tabs__showMore"
          styles = {defaultStyles.showMoreStyles}
          isShown = {this.props.showMore}
          hiddenTabs = {hidden}
        />


      </div>
    );

    // <ResizeDetector onResize={this._onResize} />
  }

  _updateElements() {
    const children = this.props.children;
    let elements = {};

    React.Children.forEach(children, (child) => {
      if (!elements[child.key]) {
        elements[child.key] = {};
      }

      elements[child.key][child.type.name] = child;
    });

    this.setState({elements});
  }

  _updateTabsWidth(initialCall) {
    let elements = this.state.elements;
    let tabsTotalWidth = 0;
    let tabsWidth = {};

    Object.keys(elements).forEach(function(key) {
      const width = findDOMNode(elements[key].tabElement).offsetWidth;
      tabsWidth[key] = width;
      tabsTotalWidth += width;
    });

    let newState = {tabsWidth, tabsTotalWidth};

    if (initialCall) {
      newState.showMoreWidth = findDOMNode(this.refs.Tabs__showMore).offsetWidth;
    }

    this.setState(newState);
  }

  _getElements() {
    const state = this.state;
    const clone = this._clone;
    const {showMore, transformWidth} = this.props.showMore;
    const {blockWidth, tabsTotalWidth, elements, tabsWidth} = state;
    const collapsed = blockWidth < transformWidth;

    let availableWidth = blockWidth - (tabsTotalWidth > blockWidth ? state.showMoreWidth : 0);

    let tabIndex = 0;

    return Object.keys(elements).reduce(function(result, key) {
      const TabOriginal = elements[key].Tab;
      const TabPanelOriginal = elements[key].TabPanel;
      const selected = state.selectedKey === TabOriginal.key;
      const disabled = TabOriginal.disabled;
      const payload = {tabIndex, collapsed, selected, disabled};

      const Tab = clone(TabOriginal, payload);
      const TabPanel = clone(TabPanelOriginal, payload);

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
      result.visible.push(TabPanel);
      availableWidth -= tabsWidth[key];
      tabIndex++;
      return {visible: result.visible, hidden: result.hidden};
    }, {visible: [], hidden: []});
  }

  _clone(element, payload) {
    let props;
    switch (element.type.name) {
      case 'Tab':
        props = {
          key: tabPrefix + element.key, 
          panelId: panelPrefix + element.key, 
          selected: payload.selected, 
          tabStyle: this._getStylesFor(element, payload)
        };
        break;
      case 'TabPanel':
        props = {
          key: panelPrefix + element.key, 
          tabId: tabPrefix + element.key, 
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
    } = element;

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
