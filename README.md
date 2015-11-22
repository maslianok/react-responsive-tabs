#React responsive tabs

### Responsive
* Move tabs to 'Show more' list on medium screen size
* Transform tabs to accordion on small screen size

![Responsive tabs](https://cloud.githubusercontent.com/assets/3485490/11324577/f6536f2c-913d-11e5-80b0-8755a2ec11cb.gif)

### Accessible
The component outputs HTML code that follows accessibility principles (aka [WAI-ARIA](https://en.wikipedia.org/wiki/WAI-ARIA)) and uses ARIA attributes such as `role`, `aria-selected`, `aria-controls`, `aria-labeledby` etc.

![Accessible tabs](https://cloud.githubusercontent.com/assets/3485490/11324576/f4775a4c-913d-11e5-9ec2-f13beb8bd578.gif)

### Fast
We are using [`react-resize-detector`](https://github.com/maslianok/react-resize-detector). No timers. Just pure event-based element resize detection.


## Demo

#### [Live demo](http://maslianok.github.io/react-responsive-tabs/)

Local demo
```
git clone https://github.com/maslianok/react-responsive-tabs.git
cd react-responsive-tabs/example
npm install && npm start
```


## Example

#### Example 1
```javascript
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Tabs, Tab, TabPanel} from 'react-responsive-tabs';

class App extends Component {
  render() {
    return (
      <div>
        <Tabs>
          <Tab key="1">George Washington</Tab>
          <TabPanel key="1">...</TabPanel>

          <Tab key="2">Theodore Roosevelt</Tab>
          <TabPanel key="2">...</TabPanel>
        </Tabs>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
```

#### Example 2
```javascript
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Tabs, Tab, TabPanel} from 'react-responsive-tabs';

const presidents = [
  {name: 'George Washington', biography: '...'},
  {name: 'Theodore Roosevelt', biography: '...'},
];

class App extends Component {
  render() {
    return (
      <div>
        <Tabs>
          {presidents.reduce((result, president, i) => {
            result.push(<Tab key={i}>{president.name}</Tab>);
            result.push(<TabPanel key={i}>{president.biography}</TabPanel>);
            return result;
          }, [])}
        </Tabs>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
```


## Installation
`npm install react-responsive-tabs`


### License
MIT
