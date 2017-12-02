import React, { Component } from 'react';
import {
  View,
  Platform,
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
  tabBarLabel: 'Glossary',
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
      banner: (width < height) ? 'p' : 'l'
    }
  }

  onDimensionChanged = () => {
    const { width, height } = Dimensions.get('window');
    this.setState({ banner: null });
    setImmediate(() => {
      this.setState({ banner: (width < height) ? 'p' : 'l' });
    });
  }

  componentWillMount() {
    Dimensions.addEventListener('change', this.onDimensionChanged);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onDimensionChanged);
  }

  render() {
    let banner = null;
    if (this.state.banner === 'p') {
      banner = <AdMobBanner
        adSize={Platform.OS === 'ios' ? 'smartBannerPortrait' : 'smartBanner'}
        adUnitID='ca-app-pub-1452163748623078/4582540864'
        testDevices={[AdMobBanner.simulatorId]}
        onAdFailedToLoad={error => {console.warn('error port', error);}}
      />;
    } else if (this.state.banner === 'l') {
      banner = <AdMobBanner
        adSize={Platform.OS === 'ios' ? 'smartBannerLandscape' : 'smartBanner'}
        adUnitID='ca-app-pub-1452163748623078/4582540864'
        testDevices={[AdMobBanner.simulatorId]}
        onAdFailedToLoad={error => {console.warn('error land', error);}}
      />;
    }

    return <View style={{flex: 1}}>
      <App />
      { banner }
    </View>
  }
}


