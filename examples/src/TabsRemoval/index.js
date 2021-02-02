import React, { PureComponent } from 'react';
import Tabs from 'react-responsive-tabs';

import dummyData from '../dummyData';

import './styles.css';

export class TabsRemoval extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: this.getTabs(),
      selectedTabKey: 0,
    };
  }

  onChangeProp = propsName => evt => {
    this.setState({ [propsName]: evt.target.type === 'checkbox' ? evt.target.checked : +evt.target.value });
  };

  onRemoveTab = (key, evt) => {
    evt.stopPropagation();

    // current tabs
    const { items } = this.state;

    // find index to remove
    const indexToRemove = items.findIndex(tab => tab.key === key);

    // create a new array without [indexToRemove] item
    const newTabs = [...items.slice(0, indexToRemove), ...items.slice(indexToRemove + 1)];

    const nextSelectedIndex = newTabs[indexToRemove] ? indexToRemove : indexToRemove - 1;
    if (!newTabs[nextSelectedIndex]) {
      alert('You can not delete the last tab!');
      return;
    }

    this.setState({ items: newTabs, selectedTabKey: newTabs[nextSelectedIndex].key });
  };

  getTabs = () =>
    // eslint-disable-next-line
    dummyData.map(({ name, biography }, i) => ({
      key: i,
      title: (
        <div className="tab-container">
          <div className="tab-name">{name}</div>
        </div>
      ),
      getContent: () => biography,
      tabClassName: 'tab-wrapper',
    }));

  render() {
    const { items, selectedTabKey } = this.state;
    return (
      <div className="itemRemoval__wrapper">
        <Tabs items={items} selectedTabKey={selectedTabKey} allowRemove removeActiveOnly onRemove={this.onRemoveTab} />
      </div>
    );
  }
}

export default TabsRemoval;
