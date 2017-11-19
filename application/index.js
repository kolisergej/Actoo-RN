import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

import SearchScreen from './components/SearchScreen';
import TrainingScreen from './components/TrainingScreen';
import DictionaryScreen from './components/DictionaryScreen';


SearchScreen.navigationOptions = () => {
  return {
    title: 'Search'
  };
};

TrainingScreen.navigationOptions = () => {
  return {
    title: 'Training'
  };
}

DictionaryScreen.navigationOptions = () => {
  return {
    title: 'Dictionary'
  };
}

export default TabNavigator({
  Search: {
    screen: SearchScreen
  },
  Training: {
    screen: TrainingScreen
  },
  Dictionary: {
    screen: DictionaryScreen
  }
});
