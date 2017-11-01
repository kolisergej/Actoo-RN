import React, { Component } from 'react';
import { FlatList, TouchableHighlight, Image, Text, View, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';

import styles from './styles';


export default class FlagsScreen extends Component {
  onPress = ({ item }) => {
    console.log('pressed', item);
  }

  keyExtractor = (item, index) => {
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
        <Text>{item}</Text>
      </View>
    </TouchableHighlight>;
  }

  render() {
    const { flags } = this.props.navigation.state.params;
    return <FlatList
      data={flags}
      keyExtractor={this.keyExtractor}
      renderItem={this.renderItem}
    />;
  }
}
