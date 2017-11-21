import React, { PureComponent } from 'react';
import Tabs from 'react-responsive-tabs';
import dummyData from '../dummyData';
import './styles.css';

let tabsData = dummyData;

export class TabsRemoval extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: this.getTabs(),
      selectedTabKey: 0,
      allowRemove: true,
      removeActiveOnly: true,
      showMore: false
    };
  }

  onChangeProp = propsName =>
    evt => {
      this.setState({ [propsName]: evt.target.type === 'checkbox' ? evt.target.checked : +evt.target.value });
    };

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

  render() {
    return (
      <div className="itemRemoval__wrapper">
        <Tabs {...this.state} />
      </div>
    );
  }
}

export default TabsRemoval;
