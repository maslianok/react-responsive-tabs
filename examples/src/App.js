import React, { PureComponent } from 'react';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import cs from 'classnames';

import 'react-responsive-tabs/styles.css';
import './index.css';

import BasicExample from './Basic';
import TabsRemovalExample from './TabsRemoval';

ReactGA.initialize('UA-94085609-1');
ReactGA.set({ page: window.location.pathname });
ReactGA.pageview(window.location.pathname);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: 'basic',
    };
  }

  onChangeExample = type => () => this.setState({ active: type });

  render() {
    const { active } = this.state;
    return (
      <div className="container">
        <Helmet
          title="React tabs"
          script={[
            {
              src: 'https://buttons.github.io/buttons.js',
              async: true,
              defer: true,
            },
          ]}
          meta={[
            { name: 'description', content: 'React responsive tabs' },
            {
              property: 'keywords',
              content: 'react, tabs, responsive, accordion',
            },
          ]}
        />
        <div className="jumbotron">
          <div>react-responsive-tabs</div>
          <div className="github-link">
            <a
              className="github-button"
              href="https://github.com/maslianok/react-responsive-tabs"
              data-icon="octicon-star"
              data-style="mega"
              data-count-href="/maslianok/react-responsive-tabs/stargazers"
              data-count-api="/repos/maslianok/react-responsive-tabs#stargazers_count"
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star maslianok/react-responsive-tabs on GitHub"
            >
              Star
            </a>
          </div>
        </div>
        <div className="menu">
          <div
            className={cs('menu-item', {
              'menu-item--active': active === 'basic',
            })}
            onClick={this.onChangeExample('basic')}
          >
            basic usage
          </div>
          <div
            className={cs('menu-item', {
              'menu-item--active': active === 'removal',
            })}
            onClick={this.onChangeExample('removal')}
          >
            tabs removal
          </div>
        </div>

        {active === 'basic' && <BasicExample />}
        {active === 'removal' && <TabsRemovalExample />}
      </div>
    );
  }
}

export default App;
