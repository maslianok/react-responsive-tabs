#React responsive tabs

### Your feedback is highly appreciated! 

Please, file an issue if something went wrong or let me know via Twitter @maslianok

---

#### Responsive
* Move tabs to 'Show more' list on medium screen size
* Transform tabs to accordion on small screen size

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
```
git clone https://github.com/maslianok/react-responsive-tabs.git
cd react-responsive-tabs/example
npm install && npm start
```


## Example

```javascript
import React, {Component} from 'react';
import {render} from 'react-dom';
import Tabs from 'react-responsive-tabs';

const presidents = [
  {name: 'George Washington', biography: '...'},
  {name: 'Theodore Roosevelt', biography: '...'},
];

function getTabs() {
  return presidents.map(president => ({
    key: index, // Optional. Equals to tab index if this property is omitted
    title: president.name,
    content: president.biography,
  }));
}

const App = () => <Tabs items={getTabs()} />;

render(<App />, document.getElementById('root'));
```

## API

#### items
(Array) Tabs data

#### selectedTabKey
(Number|String) Tab with this key will be selected by default.

#### showMore
(Bool) Show `Show more` list. Default: `true`.

#### transform
(Bool) Transform to accordion if element width less than `transformWidth`. Default: `true`.

#### transformWidth
(Number) Transform to accordion if wrapper width less than this value. Default: 800

#### wrapperClass
(String) Wrapper class

#### tabClass
(String) Tab class

#### panelClass
(String) Tab panel class

### License
MIT
