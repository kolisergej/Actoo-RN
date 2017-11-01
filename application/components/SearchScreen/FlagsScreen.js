import React, { Component } from 'react';
import { FlatList, TouchableHighlight, Image, Text, View } from 'react-native';

import db from '../../database';
import styles from './styles';


export default class FlagsScreen extends Component {
  constructor() {
    super();
    this.languageSettings = db.objects('LanguageSettings')[0];
  }

  onPress = ({ item }) => {
    console.log('pressed', item);
  }

  keyExtractor = (item, index) => {
    return item;
  }

  renderItem = ({ item }) => {
    const { directions, direction } = this.languageSettings;
    // fromLng, languageSettings.toLng, 'tt', 'mhr', 'mrj'
    return <TouchableHighlight
      onPress={() => {
        console.warn(direction);
        if (direction === 'from') {
          const fromDirection = directions.find(directionItem => directionItem.from === this.languageSettings.fromLng);
          const toValue = fromDirection.to.find(directionItem => directionItem.value === this.languageSettings.toLng);
          if (!toValue) {
            db.write(() => {
              this.languageSettings.toLng = fromDirection.to[0].value;
            });
          }
          db.write(() => {
            this.languageSettings.fromLng = item;
          });
          this.props.navigation.goBack();
        } else if (direction === 'to') {
          db.write(() => {
            this.languageSettings.toLng = item;
          });
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
    const { directions, direction } = this.languageSettings;
    let flags = [];
    if (direction === 'from') {
      for (const fromDirection of directions) {
        if ([this.languageSettings.toLng, this.languageSettings.fromLng, 'tt', 'mhr', 'mrj'].indexOf(fromDirection.from) === -1) {
          flags.push(fromDirection.from);
        }
      }
    } else if (direction === 'to') {
      const fromDirection = directions.find(dir => dir.from === this.languageSettings.fromLng);
      for (const toDirection of fromDirection.to) {
        if ([this.languageSettings.toLng, this.languageSettings.fromLng, 'tt', 'mhr', 'mrj'].indexOf(toDirection.value) === -1) {
          flags.push(toDirection.value);
        }
      }
    }

    return <FlatList
      data={flags}
      keyExtractor={this.keyExtractor}
      renderItem={this.renderItem}
    />;
  }
}
