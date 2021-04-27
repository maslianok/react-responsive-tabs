import React, { Component, createRef } from 'react';
import ResizeDetector from 'react-resize-detector/build/withPolyfill';
import cs from 'classnames';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';
import ShowMore from './components/ShowMore';
import Tab from './components/Tab';
import TabPanel from './components/TabPanel';
import InkBar from './components/InkBar';

const tabPrefix = 'tab-';
const panelPrefix = 'panel-';

export default class Tabs extends Component {
  constructor(props) {
    super(props);

    this.tabRefs = {};
    this.tabsWrapper = createRef();
    this.selectedTabKeyProp = props.selectedTabKey;

    this.state = {
      tabDimensions: {},
      blockWidth: 0,
      tabsTotalWidth: 0,
      showMoreWidth: 40,
      selectedTabKey: props.selectedTabKey,
      focusedTabKey: null,
    };

    this.onResizeThrottled = throttle(this.onResize, props.resizeThrottle, { trailing: true });
  }

  componentDidMount() {
    this.setTabsDimensions();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { selectedTabKey, tabsTotalWidth, blockWidth, showMoreWidth } = this.state;
    const { items, transform, showMore, showInkBar, allowRemove, removeActiveOnly, uid } = this.props;

    return (
      items !== nextProps.items ||
      nextProps.uid !== uid ||
      nextProps.transform !== transform ||
      nextProps.showMore !== showMore ||
      nextProps.showInkBar !== showInkBar ||
      nextProps.allowRemove !== allowRemove ||
      nextProps.removeActiveOnly !== removeActiveOnly ||
      nextState.tabsTotalWidth !== tabsTotalWidth ||
      nextState.blockWidth !== blockWidth ||
      nextState.showMoreWidth !== showMoreWidth ||
      nextProps.selectedTabKey !== this.selectedTabKeyProp ||
      nextState.selectedTabKey !== selectedTabKey
    );
  }

  componentDidUpdate(prevProps) {
    const { uid, items, selectedTabKey } = this.props;

    if (this.selectedTabKeyProp !== selectedTabKey) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ selectedTabKey });
    }

    if (
      uid !== prevProps.uid ||
      items.length !== prevProps.items.length ||
      items.every((item, i) => item.title !== prevProps.items[i].title)
    ) {
      this.setTabsDimensions();
    }

    this.selectedTabKeyProp = selectedTabKey;
  }

  onResize = () => {
    if (this.tabsWrapper.current) {
      const currentIsCollapsed = this.getIsCollapsed();
      this.setState({ blockWidth: this.tabsWrapper.current.offsetWidth }, () => {
        const { items } = this.props;
        const { selectedTabKey } = this.state;
        const nextIsCollapsed = this.getIsCollapsed();
        if (currentIsCollapsed && !nextIsCollapsed && selectedTabKey === -1 && items && items.length) {
          const firstTabKey = items[0].key || 0;
          this.setState({ selectedTabKey: firstTabKey });
        }
      });
    }
  };

  onChangeTab = (nextTabKey, evt) => {
    const { beforeChange, onChange } = this.props;
    const { selectedTabKey } = this.state;

    if (typeof beforeChange === 'function') {
      const beforeChangeRes = beforeChange({ selectedTabKey, nextTabKey });
      if (beforeChangeRes === false) {
        evt.preventDefault();
        return;
      }
    }

    const isCollapsed = this.getIsCollapsed();
    if (isCollapsed && selectedTabKey === nextTabKey) {
      // hide on mobile
      this.setState({ selectedTabKey: -1 });
    } else {
      // change active tab
      this.setState({ selectedTabKey: nextTabKey });
    }

    if (onChange) {
      onChange(nextTabKey);
    }
  };

  onFocusTab = focusedTabKey => () => this.setState({ focusedTabKey });

  onBlurTab = () => this.setState({ focusedTabKey: null });

  onKeyDown = event => {
    const { focusedTabKey } = this.state;
    if (event.keyCode === 13 && focusedTabKey !== null) {
      this.setState({ selectedTabKey: focusedTabKey });
    }
  };

  setTabsDimensions = () => {
    if (!this.tabsWrapper.current) {
      // it shouldn't happen ever. Just a paranoic check
      return;
    }

    const { tabDimensions } = this.state;

    // initial wrapper width calculation
    const blockWidth = this.tabsWrapper.current.offsetWidth;

    // calculate width and offset for each tab
    let tabsTotalWidth = 0;
    const tabDimensionsNext = {};
    Object.keys(this.tabRefs).forEach(key => {
      if (this.tabRefs[key]) {
        const tabKey = key.replace(tabPrefix, '');
        const width = this.tabRefs[key].tab.offsetWidth;
        if (width) {
          tabDimensionsNext[tabKey] = { width, offset: tabsTotalWidth };
        } else {
          tabDimensionsNext[tabKey] = tabDimensions[tabKey];
        }

        tabsTotalWidth += tabDimensionsNext[tabKey].width;
      }
    });

    this.setState({ tabDimensions, tabsTotalWidth, blockWidth });
  };

  getTabs = () => {
    const { showMore, transform, transformWidth, items, allowRemove, removeActiveOnly, onRemove } = this.props;
    const { blockWidth, tabsTotalWidth, tabDimensions, showMoreWidth } = this.state;
    const selectedTabKey = this.getSelectedTabKey();
    const collapsed = blockWidth && transform && blockWidth < transformWidth;

    let tabIndex = 0;
    let availableWidth = blockWidth - (tabsTotalWidth > blockWidth ? showMoreWidth : 0);

    return items.reduce(
      (result, item, index) => {
        const { key = index, title, content, getContent, disabled, tabClassName, panelClassName } = item;

        const selected = selectedTabKey === key;
        const payload = { tabIndex, collapsed, selected, disabled, key };
        const tabPayload = {
          ...payload,
          title,
          onRemove: evt => {
            if (typeof onRemove === 'function') {
              onRemove(key, evt);
            }
          },
          allowRemove: allowRemove && (!removeActiveOnly || selected),
          className: tabClassName,
        };

        const panelPayload = {
          ...payload,
          content,
          getContent,
          className: panelClassName,
        };

        const tabWidth = tabDimensions[key] ? tabDimensions[key].width : 0;

        tabIndex += 1;

        /* eslint-disable no-param-reassign */
        if (
          // don't need to `Show more` button
          !showMore ||
          // initial call
          !blockWidth ||
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
          if (selected) result.isSelectedTabHidden = true;
        }
        /* eslint-enable no-param-reassign */

        result.panels[key] = panelPayload; // eslint-disable-line no-param-reassign
        availableWidth -= tabWidth;

        return result;
      },
      { tabsVisible: [], tabsHidden: [], panels: {}, isSelectedTabHidden: false },
    );
  };

  getTabProps = ({ title, key, selected, collapsed, tabIndex, disabled, className, onRemove, allowRemove }) => ({
    selected,
    allowRemove,
    children: title,
    key: tabPrefix + key,
    id: tabPrefix + key,
    ref: e => (this.tabRefs[tabPrefix + key] = e),
    originalKey: key,
    onClick: this.onChangeTab,
    onFocus: this.onFocusTab,
    onBlur: this.onBlurTab,
    onRemove,
    panelId: panelPrefix + key,
    classNames: this.getClassNamesFor('tab', {
      selected,
      collapsed,
      tabIndex,
      disabled,
      className,
    }),
  });

  getPanelProps = ({ key, content, getContent, className }, isHidden) => ({
    getContent,
    children: content,
    key: panelPrefix + key,
    id: panelPrefix + key,
    tabId: tabPrefix + key,
    classNames: this.getClassNamesFor('panel', { className, isHidden }),
    isHidden,
  });

  getShowMoreProps = (isShown, isSelectedTabHidden, showMoreLabel) => ({
    onShowMoreChanged: this.showMoreChanged,
    isShown,
    label: showMoreLabel,
    hasChildSelected: isSelectedTabHidden,
  });

  getClassNamesFor = (type, { selected, collapsed, tabIndex, disabled, className = '', isHidden }) => {
    const { tabClass, panelClass } = this.props;
    switch (type) {
      case 'tab':
        return cs('RRT__tab', className, tabClass, {
          'RRT__tab--first': !tabIndex,
          'RRT__tab--selected': selected,
          'RRT__tab--disabled': disabled,
          'RRT__tab--collapsed': collapsed,
        });
      case 'panel':
        return cs('RRT__panel', className, panelClass, { 'RRT__panel--hidden': isHidden });
      default:
        return '';
    }
  };

  getSelectedTabKey = () => {
    const { items } = this.props;
    const { selectedTabKey } = this.state;

    if (typeof selectedTabKey === 'undefined') {
      if (!items[0]) {
        return undefined;
      }

      return items[0].key || 0;
    }

    return selectedTabKey;
  };

  getIsCollapsed = () => {
    const { transform, transformWidth } = this.props;
    const { blockWidth } = this.state;
    return blockWidth && transform && blockWidth < transformWidth;
  };

  showMoreChanged = element => {
    if (!element) {
      return;
    }

    const { showMoreWidth } = this.state;
    const { offsetWidth } = element;
    if (showMoreWidth === offsetWidth) {
      return;
    }

    this.setState({
      showMoreWidth: offsetWidth,
    });
  };

  getExpandedTabs = (panels, selectedTabKey, isCollapsed) => {
    const { unmountOnExit } = this.props;
    if (isCollapsed) {
      return undefined;
    }

    if (!unmountOnExit) {
      // render all tabs if unmountOnExit === false (inactive are hidden)
      return Object.keys(panels).map(key => (
        <TabPanel {...this.getPanelProps(panels[key], `${selectedTabKey}` !== `${key}`)} />
      ));
    }

    if (panels[selectedTabKey]) {
      // render only active tab if unmountOnExit === true
      return <TabPanel {...this.getPanelProps(panels[selectedTabKey])} />;
    }

    return undefined;
  };

  render() {
    const {
      showInkBar,
      containerClass,
      tabsWrapperClass,
      showMore,
      transform,
      showMoreLabel,
      unmountOnExit,
    } = this.props;
    const { tabDimensions } = this.state;
    const { tabsVisible, tabsHidden, panels, isSelectedTabHidden } = this.getTabs();
    const isCollapsed = this.getIsCollapsed();
    const selectedTabKey = this.getSelectedTabKey();
    const selectedTabDimensions = tabDimensions[selectedTabKey] || {};

    const containerClasses = cs('RRT__container', containerClass);
    const tabsClasses = cs('RRT__tabs', tabsWrapperClass, { RRT__accordion: isCollapsed });

    const handleResize = showMore || transform;

    return (
      <ResizeDetector
        handleWidth={handleResize}
        handleHeight={false}
        targetRef={this.tabsWrapper}
        onResize={this.onResizeThrottled}
      >
        {() => (
          <div className={containerClasses} ref={this.tabsWrapper} onKeyDown={this.onKeyDown}>
            <div className={tabsClasses}>
              {tabsVisible.reduce((result, tab) => {
                result.push(<Tab {...this.getTabProps(tab)} />);

                if (isCollapsed && (!unmountOnExit || selectedTabKey === tab.key)) {
                  result.push(<TabPanel {...this.getPanelProps(panels[tab.key], selectedTabKey !== tab.key)} />);
                }
                return result;
              }, [])}

              {!isCollapsed && (
                <ShowMore {...this.getShowMoreProps(showMore, isSelectedTabHidden, showMoreLabel)}>
                  {tabsHidden.map(tab => (
                    <Tab {...this.getTabProps(tab)} />
                  ))}
                </ShowMore>
              )}
            </div>

            {showInkBar && !isCollapsed && !isSelectedTabHidden && (
              <InkBar left={selectedTabDimensions.offset || 0} width={selectedTabDimensions.width || 0} />
            )}

            {this.getExpandedTabs(panels, selectedTabKey, isCollapsed)}
          </div>
        )}
      </ResizeDetector>
    );
  }
}

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
  // beforeChange callback: return false to prevent tab change
  beforeChange: PropTypes.func,
  // onChange active tab callback
  onChange: PropTypes.func,
  // onRemove callback
  onRemove: PropTypes.func,
  // frequency of onResize recalculation fires
  resizeThrottle: PropTypes.number,
  // unmounts the tab when it gets inactive (unselected)
  unmountOnExit: PropTypes.bool,
  // classnames
  containerClass: PropTypes.string,
  tabsWrapperClass: PropTypes.string,
  tabClass: PropTypes.string,
  panelClass: PropTypes.string,
  // optional external id. Force rerender when it changes
  // eslint-disable-next-line react/forbid-prop-types
  uid: PropTypes.any,
  // labels
  showMoreLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

Tabs.defaultProps = {
  items: [],
  uid: undefined,
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
  unmountOnExit: true,
  beforeChange: undefined,
  onChange: () => null,
  onRemove: () => null,
};
