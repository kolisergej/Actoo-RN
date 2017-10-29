import React from 'react';
import { StackNavigator } from 'react-navigation';

import SearchScreenNav from './SearchScreenNav';
import FlagsScreenNav from './FlagsScreenNav';


export default StackNavigator({
  Search: {
    screen: SearchScreenNav
  },
  Flags: {
    screen: FlagsScreenNav
  }
});
