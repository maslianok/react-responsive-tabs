# React responsive tabs

#### [Live demo](http://maslianok.github.io/react-responsive-tabs/)

### Your feedback is highly appreciated!

Please, file an issue if something went wrong or let me know via Twitter @maslianok

#### Responsive

- Hide tabs under the 'Show more' option when they don't fit into the screen
- Transform tabs into the accordion when the wrapper width reaches the `transformWidth` value

![Responsive tabs](https://cloud.githubusercontent.com/assets/3485490/11324577/f6536f2c-913d-11e5-80b0-8755a2ec11cb.gif)

#### Accessible

The component outputs HTML code that follows accessibility principles (aka [WAI-ARIA](https://en.wikipedia.org/wiki/WAI-ARIA)) and uses ARIA attributes such as `role`, `aria-selected`, `aria-controls`, `aria-labeledby` etc.

![Accessible tabs](https://cloud.githubusercontent.com/assets/3485490/11324576/f4775a4c-913d-11e5-9ec2-f13beb8bd578.gif)

#### Fast

We are using [`react-resize-detector`](https://github.com/maslianok/react-resize-detector). No timers. Just pure event-based element resize detection.

## Installation

`npm install react-responsive-tabs`

## Demo

#### [Live demo](http://maslianok.github.io/react-responsive-tabs/)

Local demo

```sh
# 1. clone the repository
git clone https://github.com/maslianok/react-responsive-tabs.git

# 2. Install react-responsive-tabs dependencies. You must do it because we use raw library code in the example
cd react-responsive-tabs
npm install

# 3. Install dependencies to run the example
cd examples
npm install

# 4. Finally run the example
npm start
```

## Example

```javascript
import React, { Component } from 'react';
import { render } from 'react-dom';
import Tabs from 'react-responsive-tabs';

// IMPORTANT you need to include the default styles
import 'react-responsive-tabs/styles.css';

const presidents = [
  { name: 'George Washington', biography: '...' },
  { name: 'Theodore Roosevelt', biography: '...' },
];

function getTabs() {
  return presidents.map((president, index) => ({
    title: president.name,
    getContent: () => president.biography,
    /* Optional parameters */
    key: index,
    tabClassName: 'tab',
    tabSelectedClassName: 'tab--selected',
    panelClassName: 'panel',
  }));
}

const App = () => <Tabs items={getTabs()} />;

render(<App />, document.getElementById('root'));
```

## API

All entities listed below should be used as props to the `Tabs` component.

| Prop                 | Type          | Description                                                                  | Default         |
| ----------------     | ------------- | ---------------------------------------------------------------------------- | --------------- |
| items                | Array         | Tabs data                                                                    | [Item](#Item)[] |
| beforeChange         | Function      | Fires right before a tab changes. Return `false` to prevent the tab change   | undefined       |
| onChange             | Function      | onChange callback                                                            | undefined       |
| selectedTabKey       | Number/String | Selected tab                                                                 | undefined       |
| showMore             | Bool          | Whether to show `Show more` or not                                           | `true`          |
| showMoreLabel        | String/Node   | `Show more` tab name                                                         | `...`           |
| transform            | Bool          | Transform to accordion when the wrapper width is less than `transformWidth`. | `true`          |
| transformWidth       | Number        | Transform width.                                                             | 800             |
| unmountOnExit        | Bool          | Whether to unmount inactive tabs from DOM tree or not                        | `true`          |
| tabsWrapperClass     | String        | Wrapper class                                                                | undefined       |
| tabClassName         | String        | Tab class                                                                    | undefined       |
| tabSelectedClassName | String        | Tab class for selected item                                                  | undefined       |
| panelClassName       | String        | Tab panel class                                                              | undefined       |
| allowRemove          | Bool          | Allows tabs removal.                                                         | `false`         |
| removeActiveOnly     | Bool          | Only active tab has removal option                                           | `false`         |
| showInkBar           | Bool          | Add MaterialUI InkBar effect                                                 | `false`         |
| uid                  | any           | An optional external id. The component rerenders when it changes             | undefined       |

#### Item

| Prop           | Type     | Description                                                                                                                                                      |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title                  | String   | Tab title                                                                                                                                                        |
| getContent             | Function | A function that returns data that will be rendered when tab become active                                                                                        |
| content                | String   | Use this prop insted of getContent. This is a sync version of `getContent`. The data will be always rendered in a hidden div. Sometimes it may be useful for SEO |
| key                    | Number   | A uniq tab id                                                                                                                                                    |
| tabClassName           | String   | Tab class name                                                                                                                                                   |
| tabSelectedClassName   | String   | Tab class name for selected item                                                                                                                                 |
| panelClassName         | String   | Panel class name                                                                                                                                                 |

### License

MIT
