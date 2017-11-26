import React from 'react';

import FlagsScreen from './FlagsScreen';

FlagsScreen.navigationOptions = ({ navigation }) => {
  const title = navigation.state.params.direction === 'from' ?
    'Source language' :
    'Target language';
  return {
    title,
    tabBarVisible: false,
    headerTitleStyle: {
      fontSize: 15,
      width: '100%'
    }
  }
}

export default FlagsScreen;
