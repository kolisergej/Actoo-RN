import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

import SearchScreen from './components/SearchScreen';
import TrainingScreen from './components/TrainingScreen';


SearchScreen.navigationOptions = (props) => {
  return {
    title: 'Search'
  };
};

TrainingScreen.navigationOptions = (props) => {
  return {
    title: 'Training'
  };
}

export default TabNavigator({
  Search: {
    screen: SearchScreen
  },
  Training: {
    screen: TrainingScreen
  },
  // Dictionary: {
  //   screen: DictionaryScreen
  // }
});
