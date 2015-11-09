import React, {Component, PropTypes} from 'react';

export default class ShowMore extends Component {
  render() {
    if (!this.props.isShown || !this.props.hiddenTabs || !this.props.hiddenTabs.length) {
      return null;
    }

    return (
      <div style={this.props.style.showMoreTab} role="navigation" ariaHaspopup="true" tabIndex="0">
        <span>...</span>
        <div style={this.props.style.showMoreList} ariaHidden="true" role="menu">
          {this.props.hiddenTabs}
        </div>
      </div>
    );
  }
}

ShowMore.propTypes = {
  isShown: PropTypes.bool.isRequired,
  hiddenTabs: PropTypes.array,
  style: PropTypes.object.isRequired,
};
