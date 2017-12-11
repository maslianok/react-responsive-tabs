import React, { PureComponent } from 'react';
import Tabs from 'react-responsive-tabs';

import dummyData from '../dummyData';

import './styles.css';

export class TabsRemoval extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: this.getTabs(),
    };
  }

  onChangeProp = propsName => evt => {
    this.setState({ [propsName]: evt.target.type === 'checkbox' ? evt.target.checked : +evt.target.value });
  };

  onRemoveTab = (key, evt) => {
    evt.stopPropagation();

    // current tabs
    const currentTabs = this.state.items;

    // find index to remove
    const indexToRemove = currentTabs.findIndex(tab => tab.key === key);

    // create a new array without [indexToRemove] item
    const newTabs = [...currentTabs.slice(0, indexToRemove), ...currentTabs.slice(indexToRemove + 1)];

    this.setState({ items: newTabs });
  };

  getTabs = () =>
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
    return (
      <div className="itemRemoval__wrapper">
        <Tabs items={this.state.items} selectedTabKey={0} allowRemove removeActiveOnly onRemove={this.onRemoveTab} />
      </div>
    );
  }
}

export default TabsRemoval;
