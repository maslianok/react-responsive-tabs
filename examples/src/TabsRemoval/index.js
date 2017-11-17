import React, {PureComponent} from 'react';
import Tabs from 'react-responsive-tabs';

import dummyData from '../dummyData';

import './styles.css';

export class TabsRemoval extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: this.getTabs(),
      tabOptions: {
        selectedTabKey: 0,
        allowRemove: true,
        removeActiveOnly: true
      }
    };
  }

  onChangeProp = propsName =>
    evt => {
      this.setState({[propsName]: evt.target.type === 'checkbox' ? evt.target.checked : +evt.target.value});
    };

  onRemoveTab = key =>
    evt => {
      evt.stopPropagation();

      // current tabs
      const currentTabs = this.state.items;

      // find index to remove
      const indexToRemove = currentTabs.findIndex(tab => tab.key === key);

      // create a new array without [indexToRemove] item
      const newTabs = [...currentTabs.slice(0, indexToRemove), ...currentTabs.slice(indexToRemove + 1)];

      this.setState({items: newTabs});
    };

  getTabs = () =>
    dummyData.map(({name, biography}, i) => ({
      key: i,
      title: (
        <div className="tab-container">
          <div className="tab-name">{name}</div>
        </div>
      ),
      getContent: () => biography,
      onRemove: () => this.onRemoveTab(i),
      tabClassName: 'tab-wrapper',
    }));

  render() {
    return (
      <div className="itemRemoval__wrapper">
        <Tabs
          items={this.state.items}
          {...this.state.tabOptions}
        />
      </div>
    );
  }
}

export default TabsRemoval;
