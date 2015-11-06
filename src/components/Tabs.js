//use resize sensor to handle block resize
//use accessibility principles
//responsive layout

//IdleCallback?
//react router

import React, {PropTypes, Component, cloneElement} from 'react';
import {findDOMNode} from 'react-dom';
import cx from 'classnames';

import ShowMore from './ShowMore';
import ResizeDetector from './ResizeDetector';

import childrenPropType from '../helpers/childrenPropType';

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
    let classes = {
      'Tabs__List': true,
      'Tabs__collapsed': this.props.blockWidth < this.props.transformWidth,
      [this.props.className]: true
    };

    let {visibleElements, hiddenElements} = this._getElements();

    return (
      <div
        // ref="tabList"
        className={cx(classes)}
        onKeyDown={this._handleKeyDown}>

        {visibleElements}

        <ShowMore
          // ref = "show-more"
          isShown={this.props.showMore}
          hiddenTabs={hiddenElements}
        />


      </div>
    );

    // <ResizeDetector onResize={this._onResize} />
  }

  _updateElements() {
    let elements = {};
    const children = this.props.children;

    React.Children.forEach(children, (child) => {
      const selected = this.state.selectedKey === child.key;

      if (!elements[child.key]) {
        elements[child.key] = {};
      }
      if (child.type.name === 'Tab') {
        const id = tabPrefix + child.key;
        const panelId = panelPrefix + child.key;
        elements[child.key].tabElement = cloneElement(child, {key: id, id, panelId, selected});
      } else if (child.type.name === 'TabPanel') {
        const id = panelPrefix + child.key;
        const tabId = tabPrefix + child.key;
        elements[child.key].panelElement = cloneElement(child, {key: id, id, tabId, selected});
      }
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
      newState.showMoreWidth = findDOMNode(this.refs['show-more']).offsetWidth;
    }

    this.setState(newState);
  }

  _getElements() {
    const state = this.state;
    const {showMore, transformWidth} = this.props.showMore;
    const {blockWidth, tabsTotalWidth, elements, tabsWidth} = state;


    if (
      //don't need to `Show more` button
      !showMore ||
      //initial call
      !blockWidth || !tabsTotalWidth ||
      //collapsed mode
      blockWidth < transformWidth ||
      //all tabs are fit into the block
      blockWidth > tabsTotalWidth) {

      return Object.keys(elements).reduce(function(result, key) {
        Array.prototype.push.apply(result.visibleElements,
          [elements[key].tabElement, elements[key].panelElement]
        );
        return {
          visibleElements: result.visibleElements,
          hiddenElements: []
        };
      }, {visibleElements: [], hiddenElements: []});

    }

    let availableWidth = blockWidth - (tabsTotalWidth > blockWidth ? state.showMoreWidth : 0);

    return Object.keys(elements).reduce(function(result, key) {
      if (availableWidth - tabsWidth[key] > 0) {
        Array.prototype.push.apply(result.visibleElements,
          [elements[key].tabElement, elements[key].panelElement]
        );
      } else {
        result.hiddenElements.push(elements[key].tabElement);
        result.visibleElements.push(elements[key].panelElement);
      }

      availableWidth -= tabsWidth[key];

      return {
        visibleElements: result.visibleElements,
        hiddenElements: result.hiddenElements
      };
    }, {visibleElements: [], hiddenElements: []});
  }

  _onResize(tabpanel) {
    this.setState({blockWidth: tabpanel.offsetWidth});
  }

}

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
