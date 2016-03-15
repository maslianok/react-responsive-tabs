// TODO react router
import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import ResizeDetector from 'react-resize-detector';
import jss from 'js-stylesheet';
import cs from 'classnames';

import ShowMore from './ShowMore';
import Tab from './Tab';
import TabPanel from './TabPanel';
import styles from '../styles/style';

const tabPrefix = 'tab-';
const panelPrefix = 'panel-';

if (typeof window !== 'undefined') {
  jss(styles);
}

export default class Tabs extends Component {
  constructor(props) {
    super(props);

    this.tabRefs = {};

    this.state = {
      tabsWidth: {},
      blockWidth: 0,
      tabsTotalWidth: 0,
      showMoreWidth: 40,
      selectedTabKey: props.selectedTabKey,
      focusedTabKey: null,
    };

    this._setTabsWidth = this._setTabsWidth.bind(this);
    this._getTabs = this._getTabs.bind(this);
    this._getTabProps = this._getTabProps.bind(this);
    this._getPanelProps = this._getPanelProps.bind(this);

    this._onChangeTab = this._onChangeTab.bind(this);
    this._onResize = this._onResize.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onFocusTab = this._onFocusTab.bind(this);
    this._onBlurTab = this._onBlurTab.bind(this);
  }

  componentDidMount() {
    setTimeout(this._setTabsWidth, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.items !== nextProps.items) {
      this.setState({ blockWidth: 0 });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.items !== nextProps.items ||
      nextState.blockWidth !== this.state.blockWidth ||
      nextState.selectedTabKey !== this.state.selectedTabKey;
  }

  componentDidUpdate() {
    if (!this.state.blockWidth) {
      this._setTabsWidth();
    }
  }

  _setTabsWidth() {
    const blockWidth = this.refs.tabsWrapper.offsetWidth;
    let tabsTotalWidth = 0;
    const tabsWidth = {};
    Object.keys(this.refs).filter(ref => ref.indexOf(tabPrefix) === 0).forEach(key => {
      const width = findDOMNode(this.refs[key]).offsetWidth;
      tabsWidth[key.replace(tabPrefix, '')] = width;
      tabsTotalWidth += width;
    });

    const newState = { tabsWidth, tabsTotalWidth, blockWidth };
    const showMore = findDOMNode(this.refs.tabsShowMore);

    if (showMore) {
      newState.showMoreWidth = showMore.offsetWidth;
    }

    this.setState(newState);
  }

  _getTabs() {
    const { showMore, transform, transformWidth, items } = this.props;
    const { blockWidth, tabsTotalWidth, tabsWidth, showMoreWidth, selectedTabKey } = this.state;
    const collapsed = blockWidth && transform && blockWidth < transformWidth;

    let tabIndex = 0;
    let availableWidth = blockWidth - (tabsTotalWidth > blockWidth ? showMoreWidth : 0);

    return items.reduce((result, item, index) => {
      const { key = index, title, content, disabled, tabClassName, panelClassName } = item;
      const selected = (!selectedTabKey && !tabIndex) || selectedTabKey === key;
      const payload = { tabIndex, collapsed, selected, disabled, key };
      const tabPayload = Object.assign({}, payload, { title, className: tabClassName });
      const panelPayload = Object.assign({}, payload, { content, className: panelClassName });
      const tabWidth = tabsWidth[key] || 0;

      tabIndex++;

      /* eslint-disable no-param-reassign */
      if (
        // don't need to `Show more` button
        !showMore ||
        // initial call
        !blockWidth || !tabsTotalWidth ||
        // collapsed mode
        collapsed ||
        // all tabs are fit into the block
        blockWidth > tabsTotalWidth ||
        // current tab fit into the block
        availableWidth - tabWidth > 0
      ) {
        result.tabsVisible[key] = tabPayload;
      } else {
        result.tabsHidden.push(tabPayload);
      }
      /* eslint-enable no-param-reassign */

      result.panels.push(panelPayload);
      availableWidth -= tabWidth;

      return result;
    }, { tabsVisible: {}, tabsHidden: [], panels: [] });
  }

  _getTabProps({ title, key, selected, collapsed, tabIndex, disabled, className }) {
    return {
      selected,
      children: title,
      key: tabPrefix + key,
      id: tabPrefix + key,
      ref: tabPrefix + key,
      originalKey: key,
      onClick: this._onChangeTab,
      onFocus: this._onFocusTab,
      onBlur: this._onBlurTab,
      panelId: panelPrefix + key,
      classNames: this._getClassNamesFor('tab', {
        selected,
        collapsed,
        tabIndex,
        disabled,
        className,
      }),
    };
  }

  _getPanelProps({ key, content, selected, collapsed, className }) {
    return {
      selected,
      children: content,
      key: panelPrefix + key,
      id: panelPrefix + key,
      tabId: tabPrefix + key,
      classNames: this._getClassNamesFor('panel', { selected, collapsed, className }),
    };
  }


  _getClassNamesFor(type, { selected, collapsed, tabIndex, disabled, className = '' }) {
    switch (type) {
      case 'tab':
        return cs('Tab', className, this.props.tabClass, {
          'Tab--first': !tabIndex,
          'Tab--selected': selected,
          'Tab--disabled': disabled,
          'Tab--collapsed': collapsed,
        });
      case 'panel':
        return cs('Tab-panel', className, this.props.panelClass, {
          'Tab-panel--selected': selected,
          'Tab-panel--collapsed': collapsed,
        });
      default:
        return '';
    }
  }

  _onResize() {
    this.setState({ blockWidth: this.refs.tabsWrapper.offsetWidth });
  }

  _onChangeTab(selectedTabKey) {
    this.setState({ selectedTabKey });
    if (this.props.onChange) {
      this.props.onChange(selectedTabKey);
    }
  }

  _onFocusTab(focusedTabKey) {
    return () => this.setState({ focusedTabKey });
  }

  _onBlurTab() {
    this.setState({ focusedTabKey: null });
  }

  _onKeyDown(event) {
    if (event.keyCode === 13 && this.state.focusedTabKey) {
      this.setState({ selectedTabKey: this.state.focusedTabKey });
    }
  }

  render() {
    const { tabsVisible, tabsHidden, panels, wrapperClass } = this._getTabs();
    const wrapperClasses = cs('Tabs__wrapper', wrapperClass);

    return (
      <div className={wrapperClasses} ref="tabsWrapper" onKeyDown={this._onKeyDown}>
        {panels.reduce((result, panel) => {
          if (tabsVisible[panel.key]) {
            result.push(<Tab {...this._getTabProps(tabsVisible[panel.key])} />);
          }
          result.push(<TabPanel {...this._getPanelProps(panel)} />);
          return result;
        }, [])}

        <ShowMore ref="tabsShowMore" isShown={this.props.showMore}>
          {tabsHidden.map(tab => <Tab {...this._getTabProps(tab)} />)}
        </ShowMore>

        {(this.props.showMore || this.props.transform) &&
          <ResizeDetector handleWidth onResize={this._onResize} />
        }
      </div>
    );
  }
}

Tabs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string,
    panelClassName: PropTypes.string,
    tabClassName: PropTypes.string,
    content: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string,
    ]),
  })),
  idPrefix: PropTypes.string,
  onSelect: PropTypes.func,
  selectedTabKey: PropTypes.any,
  showMore: PropTypes.bool,
  transform: PropTypes.bool,
  transformWidth: PropTypes.number,
  wrapperClass: PropTypes.string,
  tabClass: PropTypes.string,
  panelClass: PropTypes.string,
  onChange: PropTypes.func,
};

Tabs.defaultProps = {
  showMore: true,
  transform: true,
  transformWidth: 800,
  wrapperClass: '',
  tabClass: '',
  panelClass: '',
};
