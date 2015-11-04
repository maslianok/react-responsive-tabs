import React, {PropTypes, Component} from 'react';
import cx from 'classnames';

export default class Tabs extends Component {


  componentWillMount() {

  },

  componentWillReceiveProps(newProps) {

  },

  render() {

    const isShown = this.props.isShown;

    if (!isShown) {
      return;
    }

    return (
      <div className="Tabs__show-more" role="navigation" ariaHaspopup="true" tabIndex="0">
        <span>...</span>
        <div className="Tabs__show-more-list" ariaHidden="true" role="menu"></div>
      </div> 
    );
  }