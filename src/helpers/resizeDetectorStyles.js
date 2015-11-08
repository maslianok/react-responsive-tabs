let commonStyles = {
  content: ' ',
  display: 'block',
  position: 'absolute',
  top: '0',
  left: '0',
  height: '100%',
  width: '100%',
  overflow: 'hidden'
};

export default {
  resizeTriggers: {
    extend: commonStyles,
    visibility: 'hidden',
    opacity: 0
  },
  resizeTrigger: {
    extend: commonStyles,
    background: '#eee',
    overflow: 'auto'
  },
  contractTrigger: {
    '&:before': {
      extend: commonStyles,
      width: '200%',
      height: '200%'
    }
  }
};
