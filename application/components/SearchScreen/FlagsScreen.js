import React, { Component } from 'react';
import { FlatList, TouchableHighlight, Image, Text, View } from 'react-native';

import styles from './styles';


export default class FlagsScreen extends Component {
  onPress = ({ item }) => {
    console.log('pressed', item);
  }

  keyExtractor = (item, index) => {
    return item;
  }

  renderItem = ({ item }) => {
    const { direction, fromLng, toLng } = this.props.navigation.state.params;
    return <TouchableHighlight
      onPress={() => {
        if (direction === 'from') {
          this.props.navigation.goBack();
        } else {
          this.props.navigation.goBack();
        }
      }}
    >
      <View>
        <Image resizeMode='stretch' source={{uri: item}} style={styles.flagImage} />
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
