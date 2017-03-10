import React, { PropTypes, Component, PureComponent } from 'react';

// Transitions
const easeOutFunction = 'cubic-bezier(0.23, 1, 0.32, 1)'
const easeInOutFunction = 'cubic-bezier(0.445, 0.05, 0.55, 0.95)'

function easeOut(duration, property, delay, easeFunction) {
    easeFunction = easeFunction || easeOutFunction;

    if (property && Object.prototype.toString.call(property) === '[object Array]') {
        let transitions = '';
        for (let i = 0; i < property.length; i++) {
            if (transitions) transitions += ',';
            transitions += create(duration, property[i], delay, easeFunction);
        }

        return transitions;
    } else {
        return create(duration, property, delay, easeFunction);
    }
}

function create(duration, property, delay, easeFunction) {
    duration = duration || '450ms';
    property = property || 'all';
    delay = delay || '0ms';
    easeFunction = easeFunction || 'linear';

    return `${property} ${duration} ${easeFunction} ${delay}`;
}

export default class InkBar extends Component {

    static propTypes = {
        color: PropTypes.string,
        left: PropTypes.number.isRequired,
        /**
         * Override the inline-styles of the root element.
         */
        style: PropTypes.object,
        width: PropTypes.number.isRequired,
    };

    render() {
        const { left, width, color, style } = this.props;

        const baseStyle = {
            root: {
                left: left || 0,
                width: width || 0,
                bottom: 0,
                display: 'block',
                backgroundColor: color || 'deepskyblue',
                height: 2,
                marginTop: -2,
                position: 'relative',
                transition: easeOut('1s', 'left'),
            }
        };

        return (
            <div style={Object.assign(baseStyle.root, style)} />
        );
    }
}

