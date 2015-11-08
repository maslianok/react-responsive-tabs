import React, {PropTypes, Component} from 'react';

export default class ResizeDetector extends Component {

  attachEvent() {
    return document.attachEvent;
  }

  _getRequestFrame() {
    let raf = window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      (fn => window.setTimeout(fn, 20));
    return fn => raf(fn);
  }

  _getCancelFrame() {
    let cancel = window.cancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.clearTimeout;
    return id => cancel(id);
  }

  _resetTriggers(element) {
    let triggers = element.__resizeTriggers__;
    let expand = triggers.firstElementChild;
    let contract = triggers.lastElementChild;
    let expandChild = expand.firstElementChild;

    contract.scrollLeft = contract.scrollWidth;
    contract.scrollTop = contract.scrollHeight;
    expandChild.style.width = expand.offsetWidth + 1 + 'px';
    expandChild.style.height = expand.offsetHeight + 1 + 'px';
    expand.scrollLeft = expand.scrollWidth;
    expand.scrollTop = expand.scrollHeight;
  }

  _checkTriggers(element) {
    //TODO Check only width?
    return element.offsetWidth !== element.__resizeLast__.width ||
      element.offsetHeight !== element.__resizeLast__.height;
  }

  _getScrollListener() {
    const requestFrame = this._getRequestFrame();
    const cancelFrame = this._getCancelFrame();
    const resetTriggers = this._resetTriggers;
    const checkTriggers = this._checkTriggers;

    return e => {
      let element = this;
      resetTriggers(this);

      if (this.__resizeRAF__) {
        cancelFrame(this.__resizeRAF__);
      }

      this.__resizeRAF__ = requestFrame(function() {
        if (checkTriggers(element)) {
          element.__resizeLast__.width = element.offsetWidth;
          element.__resizeLast__.height = element.offsetHeight;
          element.__resizeListeners__.forEach(function(fn) {
            fn.call(element, e);
          });
        }
      });
    };
  }


  componentDidMount() {
    const fn = this.props._onResize;
    const element = this.refs.resizeTriggers.parentNode;

    if (this.attachEvent()) {
      element.attachEvent('onresize', fn);
    } else {
      if (!element.__resizeTriggers__) {
        if (getComputedStyle(element).position === 'static') {
          element.style.position = 'relative';
        }
        element.__resizeLast__ = {};
        element.__resizeListeners__ = [];
        element.__resizeTriggers__ = element.getElementsByClassName('resize-triggers')[0];

        this._resetTriggers(element);

        element.addEventListener('scroll', this._getScrollListener(), true);
      }
      element.__resizeListeners__.push(fn);
    }
  }

  componentWillUnmount() {
    const fn = this.props._onResize;
    const element = this.refs.resizeTriggers.parentNode;

    if (this.attachEvent()) {
      element.detachEvent('onresize', fn);
    } else {
      element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
      if (!element.__resizeListeners__.length) {
        element.removeEventListener('scroll', this._getScrollListener());
        element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__);
      }
    }
  }

  render() {
    return (
      <div ref="resizeTriggers" className="resize-triggers">
        <div className="expand-trigger">
          <div></div>
        </div>
        <div className="contract-trigger"></div>
      </div>
    );
  }
}

ResizeDetector.propTypes = {
  _onResize: PropTypes.func
};
