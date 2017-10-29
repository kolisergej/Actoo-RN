import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

import SearchScreen from './components/SearchScreen';


SearchScreen.navigationOptions = (props) => {
  return {
    title: 'Search'
  };
};

export default TabNavigator({
  Search: {
    screen: SearchScreen
  },
  // Reminder: {
  //   screen: ReminderScreen
  // }
});
