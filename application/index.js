import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SearchScreen from './components/SearchScreen';
import TrainingScreen from './components/TrainingScreen';
import DictionaryScreen from './components/DictionaryScreen';

SearchScreen.navigationOptions = () => {
  return {
    tabBarLabel: 'Search',
    tabBarIcon: ({ tintColor }) => {
      return <Feather name={'search'} size={30} style={{'color': tintColor, paddingRight: 0}}/>;
    }
  };
};

TrainingScreen.navigationOptions = () => {
  return {
    tabBarLabel: 'Training',
    tabBarIcon: ({ tintColor }) => {
      return <Feather name={'repeat'} size={30} style={{'color': tintColor, paddingRight: 0}}/>;
    }
  };
}

DictionaryScreen.navigationOptions = () => {
  return {
    tabBarLabel: 'Dictionary',
    tabBarIcon: ({ tintColor }) => {
      return <MaterialCommunityIcons name={'book-open-page-variant'} size={30} style={{'color': tintColor, paddingRight: 0}}/>;
    }
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
