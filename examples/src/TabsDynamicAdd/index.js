import React, { PureComponent } from 'react';
import Tabs from 'react-responsive-tabs';
import { tabs, newTab } from '../dummyData';
import './styles.css';

let tabsData = tabs;

export class TabsRemoval extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: this.getTabs(),
      addTab: this.addTab,
      selectedTabKey: 0,
      allowAdd: true,
      allowRemove: true,
      tabAddButton: this.renderTabAddButton(),
      tabRemoveButton: this.renderTabRemoveButton(),
      removeActiveOnly: true,
      showMore: false
    };
  }

  onRemoveTab = key =>
    evt => {
      evt.stopPropagation();

      // current tabs
      const currentTabs = this.state.items;

      // find index to remove
      const indexToRemove = currentTabs.findIndex(tab => tab.key === key);

      // create a new array without [indexToRemove] item
      tabsData = [
        ...tabsData.slice(0, indexToRemove),
        ...tabsData.slice(indexToRemove + 1)
      ];

      this.updateOnRemove(tabsData, indexToRemove);
    };

  onAddTab = () => {
    tabsData.push(newTab);

    this.setState({
      items: this.getTabs(tabsData)
    });
  };

  getTabs = (data = tabsData) =>
    data.map(({ name, biography }, i) => ({
      key: i,
      title: (
        <div className="tab-container">
          <div className="tab-name">{i} - {name}</div>
        </div>
      ),
      getContent: () => biography,
      onRemove: () => this.onRemoveTab(i),
      tabClassName: 'tab-wrapper',
    }));

  updateOnRemove = (newTabs, removedIndex) => {
    const next = removedIndex;
    const prev = removedIndex - 1;

    if (newTabs[next]) {
      this.setState({
        items: this.getTabs(newTabs)
      });
    } else if (newTabs[prev]) {
      this.setState({
        items: this.getTabs(newTabs),
        selectedTabKey: prev
      });
    }
    else {
      alert('You deleting last tab!');
    }
  };

  renderTabAddButton = () => <div onClick={this.onAddTab} className="tab-add-btn"> + </div>;

  renderTabRemoveButton = () => <div className="tab-remove-btn"> X </div>;

  render() {
    return (
      <div className="itemRemoval__wrapper">
        <Tabs {...this.state} />
      </div>
    );
  }
}

export default TabsRemoval;
