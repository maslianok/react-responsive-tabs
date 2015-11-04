import React, { Component, PropTypes } from 'react'
import {Tabs, Tab, TabPanel} from 'react-responsive-tabs';

class App extends Component {
  render() {
    return (
      <div>

        <Tabs>

          <Tab key="1" className="">Lorem ipsum dolor sit amet 1</Tab>
          <TabPanel key="1" className="">Lorem ipsum dolor sit amet 1</TabPanel>

          <Tab key="2" className="">Lorem ipsum dolor sit amet 2</Tab>
          <TabPanel key="2" className="">Lorem ipsum dolor sit amet 2</TabPanel>

          <Tab key="3" className="">Lorem ipsum dolor sit amet 3</Tab>
          <TabPanel key="3" className="">Lorem ipsum dolor sit amet 3</TabPanel>

          <Tab key="4" className="">Lorem ipsum dolor sit amet 4</Tab>
          <TabPanel key="4" className="">Lorem ipsum dolor sit amet 4</TabPanel>

          <Tab key="5" className="">Lorem ipsum dolor sit amet 5</Tab>
          <TabPanel key="5" className="">Lorem ipsum dolor sit amet 5</TabPanel>

        </Tabs>
        
      </div>
    )
  }
}

export default App;