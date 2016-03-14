import React from 'react';
import Tab from '../components/Tab';
import TabPanel from '../components/TabPanel';

export default function childrenPropTypes(props, propName) {
  let error;
  const children = props[propName];
  const tabsKeys = [];
  const panelsKeys = [];

  React.Children.forEach(children, child => {
    if (child.type === Tab) {
      if (tabsKeys.indexOf(child.key) !== -1) {
        error = new Error(
          `Duplicated key entry '${child.key}' for Tab`
        );
      }
      tabsKeys.push(child.key);
    } else if (child.type === TabPanel) {
      if (panelsKeys.indexOf(child.key) !== -1) {
        error = new Error(
          `Duplicated key entry ${child.key} for TabPanel`
        );
      }
      panelsKeys.push(child.key);
    } else {
      error = new Error(
        `Expected Tab or TabPanel but found ${child.type.displayName || child.type}`
      );
    }
  });

  if (error) {
    return error;
  }

  if (panelsKeys.length !== tabsKeys.length) {
    error = new Error(
      `There should be an equal number of Tabs and TabPanels.
      Received ${tabsKeys.length} Tabs and ${panelsKeys.length} TabPanels.`
    );
  }

  if (error) {
    return error;
  }

  for (let i = 0; i < tabsKeys.length; i++) {
    if (panelsKeys.indexOf(tabsKeys[i]) === -1) {
      error = new Error(
        `Cant find TabPanel for Tab with key ${tabsKeys[i]}`
      );
      break;
    }
  }

  return error;
}
