import React, {Component, PropTypes} from 'react';

export default class ShowMore extends Component {
  render() {
    if (!this.props.isShown || !this.props.hiddenElements || !this.props.hiddenElements.length) {
      return null;
    }

    return (
      <div className="Tabs__showMore" role="navigation" ariaHaspopup="true" tabIndex="0">
        <span>...</span>
        <div className="Tabs__showMoreList" ariaHidden="true" role="menu">
          {this.props.hiddenElements}
        </div>
      </div>
    );
  }
}

ShowMore.propTypes = {
  isShown: PropTypes.bool,
  hiddenElements: PropTypes.array,
};
