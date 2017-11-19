import React from 'react';
import { StackNavigator } from 'react-navigation';

import DictionaryScreenNav from './DictionaryScreenNav';

export default StackNavigator({
  Dictionary: {
    screen: DictionaryScreenNav
  }
});
