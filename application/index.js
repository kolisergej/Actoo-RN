import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SearchScreen from './components/SearchScreen';
import TrainingScreen from './components/TrainingScreen';
import DictionaryScreen from './components/DictionaryScreen';

SearchScreen.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ tintColor }) => {
    return <Feather
      name='search'
      size={25}
      style={{'color': tintColor}}
    />;
  }
};

TrainingScreen.navigationOptions = {
  tabBarLabel: 'Training',
  tabBarIcon: ({ tintColor }) => {
    return <Feather
      name='repeat'
      size={25}
      style={{'color': tintColor}}
    />;
  }
};

DictionaryScreen.navigationOptions = {
  tabBarLabel: 'Dictionary',
  tabBarIcon: ({ tintColor }) => {
    return <MaterialCommunityIcons
      name='book-open-page-variant'
      size={25}
      style={{'color': tintColor}}
    />;
  }
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
}, {
  tabBarOptions: {
    showIcon: true
  }
});
