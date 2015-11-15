const defaultColor = '#eee';
const activeColor = '#fff';
const borderColor = '#ddd';

export default {
  tabsWrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  hidden: {
    display: 'none'
  },


  Tab: {
    defaultStyle: {
      background: defaultColor,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: borderColor,
      padding: '.7em 1em',
      cursor: 'pointer',
      zIndex: 1,
      whiteSpace: 'nowrap',
      marginLeft: '-1px',
      ':focus': {
        'zIndex': 2
      }
    },
    firstTabStyle: {
      marginLeft: 0
    },
    defaultSelectedStyle: {
      background: activeColor,
      borderColor: borderColor + ' ' + borderColor + ' ' + activeColor,
    },
    defaultDisabledStyle: {
      
    },
    defaultCollapsedStyle: {
      width: '100%'
    }
  },


  TabPanel: {
    defaultStyle: {
      width: '100%',
      marginTop: '-1px',
      padding: '1em',
      border: '1px solid ' + borderColor,
      order: 1,
      display: 'none'
    },
    defaultSelectedStyle: {
      display: 'block'
    },
    defaultCollapsedStyle: {
      order: 0
    }
  },


  showMoreStyles: {
    showMoreTab: {
      background: defaultColor,
      border: '1px solid ' + borderColor,
      cursor: 'pointer',
      zIndex: 1,
      whiteSpace: 'nowrap',
      position: 'relative',
      marginLeft: '-1px'
    },
    showMoreLabel: {
      padding: '.7em 1em',
      position: 'relative',
      bottom: '-1px',
      'zIndex': 1,
    },
    showMoreSelectedLabel: {
      'backgroundColor': defaultColor,
    },
    showMoreList: {
      position: 'absolute',
      right: '-1px',
      top: '100%'
    }
  }
};
