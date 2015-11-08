
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
      background: '#eee',
      border: '1px solid #ddd',
      padding: '.7em 1em',
      cursor: 'pointer',
      zIndex: 1,
      whiteSpace: 'nowrap',
      marginLeft: '-1px'
    },
    firstTabStyle: {
      marginLeft: 0
    },
    defaultSelectedStyle: {
      background: '#fff',
      borderBottom: '1px solid #fff'
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
      border: '1px solid #ddd',
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
      background: '#eee',
      border: '1px solid #ddd',
      padding: '.7em 1em',
      cursor: 'pointer',
      zIndex: 1,
      whiteSpace: 'nowrap',
      position: 'relative',
      marginLeft: '-1px'
    },
    showMoreList: {
      position: 'absolute',
      right: '-1px',
      top: '100%'
    }
  }
};
