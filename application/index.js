import React, { Component } from 'react';
import {
  View,
  Dimensions
} from 'react-native';
import { TabNavigator } from 'react-navigation';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AdMobBanner } from 'react-native-admob';

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

const App = TabNavigator({
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

export default class Application extends Component {
  constructor() {
    super();
    const { width, height } = Dimensions.get('window');
    this.state = {
      banner: height > width ? 'smartBannerPortrait' : 'smartBannerLandscape'
    };
  }

  onDimensionChanged = () => {
    const { width, height } = Dimensions.get('window');
    this.setState({
      banner: height > width ? 'smartBannerPortrait' : 'smartBannerLandscape'
    });
  }

  componentDidMount() {
    Dimensions.addEventListener('change', this.onDimensionChanged);
  }

  render() {
    return <View style={{flex: 1}}>
      <App />
      <AdMobBanner
        adSize={this.state.banner}
        adUnitID='ca-app-pub-1452163748623078/4582540864'
        testDevices={[AdMobBanner.simulatorId]}
        onAdFailedToLoad={error => console.error(error)}
      />
    </View>
  }
}


