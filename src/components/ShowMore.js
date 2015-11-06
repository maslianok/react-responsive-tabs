import React, {Component} from 'react';

export default class ShowMore extends Component {
  render() {
    if (!this.props.isShown || !this.props.hiddenElements || !this.props.hiddenElements.length) {
      return null;

    }

    return (
      <div className="Tabs__show-more" role="navigation" ariaHaspopup="true" tabIndex="0">
        <span>...</span>
        <div className="Tabs__show-more-list" ariaHidden="true" role="menu">
          {this.props.hiddenElements}
        </div>
      </div>
    );
  }
}
