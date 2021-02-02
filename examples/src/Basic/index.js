/* eslint-disable */
import React, { PureComponent } from 'react';
import Tabs from 'react-responsive-tabs';

import dummyData from '../dummyData';

import './styles.css';

export class Basic extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showMore: true,
      transform: true,
      showInkBar: false,
      items: this.getSimpleTabs(),
      selectedTabKey: 0,
      unmountOnExit: true,
    };
  }

  onChangeProp = propsName => evt => {
    this.setState({ [propsName]: evt.target.type === 'checkbox' ? evt.target.checked : +evt.target.value });
  };

  getSimpleTabs = () =>
    dummyData.map(({ name, biography }, index) => ({
      key: index,
      title: name,
      getContent: () => biography,
    }));

  render() {
    const { showMore, transform, showInkBar, selectedTabKey, unmountOnExit } = this.state;

    return (
      <div className="basic__wrapper">
        <div className="basic__props">
          <div className="basic__prop">
            <label>
              <input type="checkbox" onChange={this.onChangeProp('showMore')} checked={showMore} />{' '}
              <span>showMore</span>
            </label>
          </div>
          <div className="basic__prop">
            <label>
              <input type="checkbox" onChange={this.onChangeProp('transform')} checked={transform} />{' '}
              <span>transform to accordion when width {'<'} 800px</span>
            </label>
          </div>
          <div className="basic__prop">
            <label>
              <input type="checkbox" onChange={this.onChangeProp('showInkBar')} checked={showInkBar} />{' '}
              <span>showInkBar</span>
            </label>
          </div>
          <div className="basic__prop">
            <label>
              <input type="checkbox" onChange={this.onChangeProp('unmountOnExit')} checked={unmountOnExit} />{' '}
              <span>unmount inactive tabs</span>
            </label>
          </div>
          <div className="basic__prop">
            <label>
              <input
                type="number"
                min={0}
                onChange={this.onChangeProp('selectedTabKey')}
                className="basic__input"
                value={selectedTabKey}
              />{' '}
              <span>selected tab</span>
            </label>
          </div>
        </div>
        <div className="basic__tabs">
          <Tabs {...this.state} />
        </div>
      </div>
    );
  }
}

export default Basic;
