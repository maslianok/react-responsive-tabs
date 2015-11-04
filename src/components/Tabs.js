import React, {PropTypes, Component} from 'react';
import cx from 'classnames';

import childrenPropType from '../helpers/childrenPropType';
import Tab from './components/Tab';
import TabPanel from './components/TabPanel';

export default class Tabs extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tabsList: [],
      blockWidth: 0,
      tabsWidth: 0,
      showMoreWidth: 0,
      selectedKey: this.props.selectedKey,
    };

    // this._onResize = this._onResize.bind(this);
  }

  // componentWillMount() {
  //   this._setTabsData();
  // }

  // componentWillReceiveProps() {
  //   this._setTabsData();
  // }


  // componentDidMount() {
  //   this._setTabsData();
  // }

  // componentDidUpdate() {
  //   this._setTabsData();
  // }

  render() {

    const className = cx(
      'tab-list',
      this.props.className
    );

    return (
      <div ref="tabList" className={className} onKeyDown={this._handleKeyDown}>

        {this._getChildren()}

        <ShowMore 
          isShown={this.props.showMore} 
          hiddenTabs={this._getHiddenTabs()} 
          blockWidth={this.state.blockWidth} 
        />

        <ResizeDetector onResize={this._onResize} />

      </div>
    );
  }


  _onResize(tabpanel) {
    this.setState({blockWidth: tabpanel.offsetWidth});
  }

  // _handleKeyDown(e) {

  // }

  // _getTabElements() {
  //   return this.refs.tabList.getElementsByClassName('Tabs__Tab');
  // }

  _getChildren() {
    const children = this.props.children;

    return React.Children.map(children, (child) => {
      const selected = this.state.selectedKey === child.key;

      if (child.type.displayName === 'Tab') {
        const id = 'tab-' + child.key;
        const panelId = 'panel-' + child.key;

        return cloneElement(child, {id, panelId, selected});

      } else if (child.type.displayName === 'TabPanel') {
        const id = 'panel-' + child.key;
        const tabId = 'tab-' + child.key;

        result = cloneElement(child, {id, tabId, selected});

      }
      return result;
    });
  }

  _getVisibleTabs() {

    if (this.state.blockWidth && this.state.tabsWidth) {

    }

  }

  _getHiddenTabs() {

  }

  // _mapPanelsToTabs() {

  // }

  // _setTabsWidth() {
  //   const tabElements = this._getTabElements();
  //   let tabsData = [];
  //   let tabsWidth = 0;

  //   for (var i = 0; i < tabElements.length; i++) {
  //     tabWidth = tabElements[i].offsetWidth;
  //     tabsWidth += tabWidth;
  //     tabsData.push({
  //       width: tabWidth,
  //       showMoreBlock: false
  //     });
  //   }

  //   this.setState({
  //     tabsWidth,
  //     tabs
  //   });
  // }
};

Tabs.propTypes = {
  className: PropTypes.string,
  selectedKey: PropTypes.any,
  onSelect: PropTypes.func,
  children: childrenPropType,
  showMore: PropTypes.bool,
  transform: PropTypes.bool,
  idPrefix: PropTypes.string,
  transformWidth: PropTypes.number
};

Tabs.defaultProps = {
  showMore: true,
  transform: true,
  transformWidth: 800
};
