import React from 'react';

import FlagsScreen from './FlagsScreen';

FlagsScreen.navigationOptions = ({ navigation }) => {
  const title = navigation.state.params.direction === 'from' ?
    'Choose source language' :
    'Choose target language';
  return {
    title,
    tabBarVisible: false
  }
}

export default FlagsScreen;
