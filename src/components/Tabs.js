// TODO IdleCallback
// TODO react router
// TODO show more handler
// TODO pass classNames or even styles

// TODO debounce

import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

import ShowMore from './ShowMore';
import Tab from './Tab';
import TabPanel from './TabPanel';
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
    this._setTabsWidth();
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
    const tabRefs = this.tabRefs;
    const blockWidth = this.refs.tabsWrapper.offsetWidth;

    let tabsTotalWidth = 0;
    const tabsWidth = {};
    Object.keys(tabRefs).forEach(key => {
      const width = tabRefs[key].offsetWidth;
      tabsWidth[key] = width;
      tabsTotalWidth += width;
    });

    const newState = { tabsWidth, tabsTotalWidth, blockWidth };
    const showMore = this.refs.tabsShowMore;
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

    return items.reduce((result, item) => {
      const selected = (!selectedTabKey && !tabIndex) || selectedTabKey === item.key;
      const disabled = item.disabled;
      const payload = { tabIndex, collapsed, selected, disabled, key: item.key };
      const tabPayload = Object.assign({}, payload, { title: item.title });
      const panelPayload = Object.assign({}, payload, { content: item.content });
      const tabWidth = tabsWidth[item.key] || 0;

      tabIndex++;

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
        result.tabsVisible.push(tabPayload);
      } else {
        result.tabsHidden.push(tabPayload);
      }

      result.panels.push(panelPayload);
      availableWidth -= tabWidth;

      return result;
    }, { tabsVisible: [], tabsHidden: [], panels: [] });
  }

  _getTabProps({ title, key, selected, collapsed, tabIndex, disabled }) {
    return {
      selected,
      children: title,
      key: tabPrefix + key,
      id: tabPrefix + key,
      originalKey: key,
      ref: tab => {
        if (tab) {
          this.tabRefs[tab.props.originalKey] = tab;
        }
      },
      onClick: this._onChangeTab,
      onFocus: this._onFocusTab,
      onBlur: this._onBlurTab,
      panelId: panelPrefix + key,
      classNames: this._getClassNamesFor('tab', { selected, collapsed, tabIndex, disabled }),
    };
  }

  _getPanelProps({ key, content, selected, collapsed }) {
    return {
      selected,
      children: content,
      key: panelPrefix + key,
      id: panelPrefix + key,
      tabId: tabPrefix + key,
      classNames: this._getClassNamesFor('panel', { selected, collapsed }),
    };
  }


  _getClassNamesFor(type, { selected, collapsed, tabIndex, disabled }) {
    switch (type) {
      case 'tab':
        return classNames({
          [styles.Tab]: true,
          [styles['Tab--first']]: !tabIndex,
          [styles['Tab--selected']]: selected,
          [styles['Tab--disabled']]: disabled,
          [styles['Tab--collapsed']]: collapsed,
        });
      case 'panel':
        return classNames({
          [styles['Tab-panel']]: true,
          [styles['Tab-panel--selected']]: selected,
          [styles['Tab-panel--collapsed']]: collapsed,
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
  // <ShowMore
  //   ref="tabsShowMore"
  //   styles={styles}
  //   isShown={this.props.showMore}
  //   hiddenTabs={tabsHidden}
  // />
  render() {
    const { tabsVisible, tabsHidden, panels } = this._getTabs();

    return (
      <div className={styles.Tabs__wrapper} ref="tabsWrapper" onKeyDown={this._onKeyDown}>
        {panels.reduce((result, panel) => {
          if (tabsVisible[panel.key]) {
            result.push(<Tab {...this._getTabProps(tabsVisible[panel.key])} />);
          }
          result.push(<TabPanel {...this._getPanelProps(panel)} />);
          return result;
        }, [])}

        {(this.props.showMore || this.props.transform) &&
          <ResizeDetector handleWidth onResize={this._onResize} />
        }
      </div>
    );
  }

}

Tabs.propTypes = {
  items: childrenPropType,
  idPrefix: PropTypes.string,
  onSelect: PropTypes.func,
  selectedTabKey: PropTypes.any,
  showMore: PropTypes.bool,
  transform: PropTypes.bool,
  transformWidth: PropTypes.number,
};

Tabs.defaultProps = {
  showMore: true,
  transform: true,
  transformWidth: 800,
  styles: {},
};
