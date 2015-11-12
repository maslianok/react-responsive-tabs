import React, {Component, PropTypes} from 'react';

export default class ShowMore extends Component {
  constructor() {
    super();

    this.state = {
      isHidden: true
    }

    this._onClick = this._onClick.bind(this);
  }

  render() {
    if (!this.props.isShown || !this.props.hiddenTabs || !this.props.hiddenTabs.length) {
      return null;
    }

    const isListHidden = this.state.isHidden;

    let listStyles = {
      ...this.props.style.showMoreList,
      display: isListHidden ? 'none' : 'block'
    };

    return (
      <div style={this.props.style.showMoreTab} role="navigation" ariaHaspopup="true" tabIndex="0">
        <span style={this.props.style.showMoreLabel} onClick={this._onClick}>...</span>
        <div style={listStyles} aria-hidden={isListHidden} role="menu">
          {this.props.hiddenTabs}
        </div>
      </div>
    );
  }

  _onClick() {
    this.setState({isHidden: !this.state.isHidden});
  }

}

ShowMore.propTypes = {
  isShown: PropTypes.bool.isRequired,
  hiddenTabs: PropTypes.array,
  style: PropTypes.object.isRequired,
};
