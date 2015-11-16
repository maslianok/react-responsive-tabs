import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

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

    const styles = this.props.styles;

    const listStyles = classNames({
      [styles['Tabs__show-more-list']]: true,
      [styles['Tabs__show-more-list--opened']]: !isListHidden
    });

    let showMoreLabelStyles = classNames({
      [styles['Tabs__show-more-label']]: true,
      [styles['Tabs__show-more-label--selected']]: !isListHidden
    });

    return (
      <div className={styles['Tabs__show-more']} role="navigation" ariaHaspopup="true" tabIndex="0">
        <div className={showMoreLabelStyles} onClick={this._onClick}>...</div>
        <div className={listStyles} aria-hidden={isListHidden} role="menu">
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
  styles: PropTypes.object.isRequired,
};
