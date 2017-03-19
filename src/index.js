import React, { PropTypes, PureComponent } from 'react';
import ResizeDetector from 'react-resize-detector';
import cs from 'classnames';

import ShowMore from './components/ShowMore';
import Tab from './components/Tab';
import TabPanel from './components/TabPanel';
import InkBar from './components/InkBar';

const tabPrefix = 'tab-';
const panelPrefix = 'panel-';

export default class Tabs extends PureComponent {
  constructor(props) {
    super(props);

    this.tabRefs = {};

    this.state = {
      tabsWidth: {},
      tabsOffset: {},
      blockWidth: 0,
      tabsTotalWidth: 0,
      showMoreWidth: 40,
      selectedTabKey: props.selectedTabKey,
      focusedTabKey: null,
    };
  }

  componentDidMount() {
    setTimeout(this.setTabsWidth, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.items !== nextProps.items) {
      this.setState({ blockWidth: 0 });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.items !== nextProps.items ||
      nextState.blockWidth !== this.state.blockWidth ||
      nextState.showMoreWidth !== this.state.showMoreWidth ||
      nextState.selectedTabKey !== this.state.selectedTabKey;
  }

  componentDidUpdate() {
    if (!this.state.blockWidth) {
      this.setTabsWidth();
    }
  }

  onResize = () => this.setState({ blockWidth: this.tabsWrapper.offsetWidth });

  onChangeTab = selectedTabKey => {
    this.setState({ selectedTabKey });
    if (this.props.onChange) {
      this.props.onChange(selectedTabKey);
    }
  };

  onFocusTab = focusedTabKey => () => this.setState({ focusedTabKey });

  onBlurTab = () => this.setState({ focusedTabKey: null });

  onKeyDown = event => {
    if (event.keyCode === 13 && this.state.focusedTabKey !== null) {
      this.setState({ selectedTabKey: this.state.focusedTabKey });
    }
  };

  setTabsWidth = () => {
    if (!this.tabsWrapper) {
      return;
    }

    const blockWidth = this.tabsWrapper.offsetWidth;
    let tabsTotalWidth = 0;
    const tabsWidth = {};
    const tabsOffset = {};
    Object.keys(this.tabRefs).forEach(key => {
      const width = this.tabRefs[key].tab.offsetWidth;
      tabsWidth[key.replace(tabPrefix, '')] = width;
      tabsOffset[key.replace(tabPrefix, '')] = tabsTotalWidth;
      tabsTotalWidth += width;
    });

    this.setState({ tabsWidth, tabsOffset, tabsTotalWidth, blockWidth });
  };

  getTabs = () => {
    const { showMore, transform, transformWidth, items } = this.props;
    const {
      blockWidth,
      tabsTotalWidth,
      tabsWidth,
      showMoreWidth,
      selectedTabKey,
    } = this.state;
    const collapsed = blockWidth && transform && blockWidth < transformWidth;

    let tabIndex = 0;
    let availableWidth = blockWidth - (tabsTotalWidth > blockWidth ? showMoreWidth : 0);

    return items.reduce(
      (result, item, index) => {
        const {
          key = index,
          title,
          content,
          getContent,
          disabled,
          tabClassName,
          panelClassName,
        } = item;

        const selected = (!selectedTabKey && !tabIndex) || selectedTabKey === key;
        const payload = { tabIndex, collapsed, selected, disabled, key };
        const tabPayload = {
          ...payload,
          title,
          className: tabClassName,
        };

        const panelPayload = {
          ...payload,
          content,
          getContent,
          className: panelClassName,
        };

        const tabWidth = tabsWidth[key] || 0;

        tabIndex += 1;

        /* eslint-disable no-param-reassign */
        if (
          // don't need to `Show more` button
          !showMore ||
          // initial call
          !blockWidth ||
          !tabsTotalWidth ||
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
      },
      { tabsVisible: {}, tabsHidden: [], panels: [] }
    );
  };

  getTabProps = ({ title, key, selected, collapsed, tabIndex, disabled, className }) => ({
    selected,
    children: title,
    key: tabPrefix + key,
    id: tabPrefix + key,
    ref: e => this.tabRefs[tabPrefix + key] = e,
    originalKey: key,
    onClick: this.onChangeTab,
    onFocus: this.onFocusTab,
    onBlur: this.onBlurTab,
    panelId: panelPrefix + key,
    classNames: this.getClassNamesFor('tab', {
      selected,
      collapsed,
      tabIndex,
      disabled,
      className,
    }),
  });

  getPanelProps = ({ key, content, getContent, selected, collapsed, className }) => ({
    selected,
    getContent,
    children: content,
    key: panelPrefix + key,
    id: panelPrefix + key,
    tabId: tabPrefix + key,
    classNames: this.getClassNamesFor('panel', {
      selected,
      collapsed,
      className,
    }),
  });

  getClassNamesFor = (type, { selected, collapsed, tabIndex, disabled, className = '' }) => {
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
  };

  showMoreChanged = element => {
    if (!element || !element) {
      return;
    }

    const showMoreWidth = element.offsetWidth;
    if (this.state.showMoreWidth === showMoreWidth) {
      return;
    }

    this.setState({
      showMoreWidth,
    });
  };

  render() {
    const { showInkBar, wrapperClass, showMore, transform, transformWidth } = this.props;
    const { tabsOffset, tabsWidth, selectedTabKey, blockWidth } = this.state;
    const { tabsVisible, tabsHidden, panels } = this.getTabs();
    const wrapperClasses = cs('Tabs__wrapper', wrapperClass);
    const collapsed = blockWidth && transform && blockWidth < transformWidth;

    return (
      <div className={wrapperClasses} ref={e => this.tabsWrapper = e} onKeyDown={this.onKeyDown}>
        {panels.reduce(
          (result, panel) => {
            if (tabsVisible[panel.key]) {
              result.push(<Tab {...this.getTabProps(tabsVisible[panel.key])} />);
            }
            result.push(<TabPanel {...this.getPanelProps(panel)} />);
            return result;
          },
          []
        )}

        <ShowMore onShowMoreChanged={this.showMoreChanged} isShown={showMore}>
          {tabsHidden.map(tab => <Tab {...this.getTabProps(tab)} />)}
        </ShowMore>

        {showInkBar &&
          !collapsed &&
          <InkBar left={tabsOffset[selectedTabKey] || 0} width={tabsWidth[selectedTabKey] || 0} />}

        {(showMore || transform) && <ResizeDetector handleWidth onResize={this.onResize} />}
      </div>
    );
  }
}

Tabs.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  /* eslint-enable react/no-unused-prop-types */
  selectedTabKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  showMore: PropTypes.bool,
  showInkBar: PropTypes.bool,
  transform: PropTypes.bool,
  transformWidth: PropTypes.number,
  wrapperClass: PropTypes.string,
  tabClass: PropTypes.string,
  panelClass: PropTypes.string,
  onChange: PropTypes.func,
};

Tabs.defaultProps = {
  items: [],
  selectedTabKey: undefined,
  showMore: true,
  showInkBar: false,
  transform: true,
  transformWidth: 800,
  wrapperClass: '',
  tabClass: '',
  panelClass: '',
  onChange: () => null,
};
