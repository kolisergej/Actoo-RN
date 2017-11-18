import React, { Component } from 'react';
import { FlatList,
  TouchableHighlight,
  Image,
  Text,
  View,
  Platform,
  Dimensions
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import { isPortrait, isLandscape, isTablet, isPhone } from '../../lib/helpers';

import styles from './styles';

function getNumColumns() {
  let numColumns = 3; // by default phone, portrait
  if (isPhone() && isLandscape()) {
    numColumns = 4;
  } else if (isTablet()) {
    if (isPortrait()) {
      numColumns = 5;
    } else if (isLandscape()) {
      numColumns = 6;
    }
  }
  return numColumns;
}


export default class FlagsScreen extends Component {
  constructor() {
    super();
    const numColumns = getNumColumns();
    this.state = {
      numColumns
    };
    Dimensions.addEventListener('change', () => {
      const numColumns = getNumColumns();
      this.setState({ numColumns });
    });
  }

  keyExtractor = (item) => {
    return item;
  }

  renderItem = ({ item }) => {
    const { direction, fromLng, toLng, onBack } = this.props.navigation.state.params;
    return <TouchableHighlight
      onPress={() => {
        if (direction === 'from') {
          this.props.navigation.goBack();
          onBack(item, toLng, direction);
        } else {
          this.props.navigation.goBack();
          onBack(fromLng, item, direction);
        }
      }}
    >
      <View>
        {
          Platform.OS === 'ios' ?
            <Image resizeMode='stretch' source={{uri: item}} style={styles.flagImage} /> :
            <Image resizeMode='stretch' source={{uri: `asset:/${item}.png`}} style={styles.flagImage} />
        }
        <Text style={styles.languageSign}>{item}</Text>
      </View>
    </TouchableHighlight>;
  }

  render() {
    const { flags } = this.props.navigation.state.params;
    const key = (this.state.numColumns === 3 || this.state.numColumns === 5) ? 'p' : 'l';
    return <View style={styles.flagScreenContainer}>
      <View style={styles.flatListAlign} />
      <View style={styles.flatListContainer} >
        <FlatList
          key={key}
          numColumns={this.state.numColumns}
          columnWrapperStyle={styles.flatListColumn}
          contentContainerStyle={styles.flatListContent}
          data={flags}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
      <View style={styles.flatListAlign} />
    </View>;
  }
}
