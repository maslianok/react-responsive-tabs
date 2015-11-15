import React from 'react';
import Radium, {Style} from 'radium';

export default function Styles() {

  return (

    <Style
      rules={{
        '.Tabs__tab': {
          color: 'red',
        },
        '.Tabs__tab:hover': {
          color: 'blue',
          
        }
      }}
    />

  );

}
