import React from 'react';

import FlagsScreen from './FlagsScreen';

FlagsScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Choose language',
    tabBarVisible: false
  }
}

export default FlagsScreen;
