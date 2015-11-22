//TODO IdleCallback
//TODO react router

//TODO show more handler

//TODO pass classNames or even styles

import React, {PropTypes, Component, cloneElement} from 'react';
import {findDOMNode} from 'react-dom';
import classNames from 'classnames';

import ShowMore from './ShowMore';
import ResizeDetector from 'react-resize-detector';

import childrenPropType from '../helpers/childrenPropType';

import styles from 'style!css?modules&localIdentName=[local]!../styles/style.css';

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
      selectedTabKey: this.props.selectedTabKey,
      focusedTabKey: null
    };

    this._clone = this._clone.bind(this);
    this._setTabsWidth = this._setTabsWidth.bind(this);
    this._getElements = this._getElements.bind(this);

    this._onChangeTab = this._onChangeTab.bind(this);
    this._onResize = this._onResize.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onFocusTab = this._onFocusTab.bind(this);
    this._onBlurTab = this._onBlurTab.bind(this);
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
      this.setState({blockWidth: 0});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props ||
      nextState.blockWidth !== this.state.blockWidth ||
      nextState.selectedTabKey !== this.state.selectedTabKey;
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
    let {visible, hidden} = this._getElements();

    return (
      <div
        className={styles.Tabs__wrapper}
        ref="tabsWrapper"
        onKeyDown={this._onKeyDown}>

        {visible}

        <ShowMore
          ref="tabsShowMore"
          styles={styles}
          isShown={this.props.showMore}
          hiddenTabs={hidden}
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

      const selected = (!state.selectedTabKey && !tabIndex) || state.selectedTabKey === originalTab.key;
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
          id: tabPrefix + key,
          originalKey: key,
          ref: (tab) => {tab && (this.tabRefs[tab.props.originalKey] = tab)},
          onClick: this._onChangeTab,
          onFocus: this._onFocusTab,
          onBlur: this._onBlurTab,
          panelId: panelPrefix + key, 
          selected: payload.selected, 
          classNames: this._getClassNamesFor(element, payload)
        };
        break;
      case 'TabPanel':
        props = {
          key: panelPrefix + key,
          id: panelPrefix + key,
          tabId: tabPrefix + key,
          selected: payload.selected, 
          classNames: this._getClassNamesFor(element, payload)
        };
        break;
    }
    return cloneElement(element, props);
  }

  _getClassNamesFor(element, payload) {
    switch (element.type.name) {
      case 'Tab':
        return classNames({
          [styles.Tab]: true,
          [styles['Tab--first']]: !payload.tabIndex,
          [styles['Tab--selected']]: payload.selected,
          [styles['Tab--disabled']]: payload.disabled,
          [styles['Tab--collapsed']]: payload.collapsed
        });
        break;
      case 'TabPanel':
        return classNames({
          [styles['Tab-panel']]: true,
          [styles['Tab-panel--selected']]: payload.selected,
          [styles['Tab-panel--collapsed']]: payload.collapsed
        });
        break;
    }
  }

  _onResize(tabpanel) {
    this.setState({blockWidth: this.refs.tabsWrapper.offsetWidth});
  }

  _onChangeTab(key) {
    this.setState({selectedTabKey: key});
  }

  _onFocusTab(key) {
    this.setState({focusedTabKey: key});
  }

  _onBlurTab() {
    this.setState({focusedTabKey: null});
  }

  _onKeyDown(event) {
    if (event.keyCode == 13 && this.state.focusedTabKey) {
      this.setState({selectedTabKey: this.state.focusedTabKey});
    }
  }

}

Tabs.propTypes = {
  children: childrenPropType,
  idPrefix: PropTypes.string,
  onSelect: PropTypes.func,
  selectedTabKey: PropTypes.any,
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
