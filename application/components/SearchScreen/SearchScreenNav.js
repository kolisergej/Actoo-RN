import React from 'react';
import { TouchableHighlight, Image, View } from 'react-native';

import SearchScreen from './SearchScreen';
import db from '../../database';
import styles from './styles';

SearchScreen.navigationOptions = ({ navigation }) => {
  if (navigation.state.params) {
    const { fromLng, toLng } = navigation.state.params;
    const languageSettings = db.objects('LanguageSettings')[0];
    const headerRight = <View style={styles.headerRight}>
      <TouchableHighlight
        onPress={() => {
          let fromFlags = [];
          for (const direction of languageSettings.directions) {
            if ([fromLng, toLng].indexOf(direction.from) === -1) {
              fromFlags.push(direction.from);
            }
          }
          navigation.navigate('Flags', { flags: fromFlags });
        }}
        underlayColor="#f2f2f2"
      >
        <Image source={{uri: fromLng}} style={styles.image} />
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {
          db.write(() => {
            const tmp = fromLng;
            languageSettings.fromLng = toLng;
            languageSettings.toLng = tmp;
          });
          navigation.setParams({ fromLng: toLng, toLng: fromLng });
        }}
        underlayColor="#f2f2f2"
      >
        <Image source={require('../../../assets/switch.png')} style={styles.switchButton} />
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {
          let toFlags = [];
          for (const direction of languageSettings.directions) {
            if (direction.from === fromLng) {
              console.log('direction.from', direction.from);
              for (const toObj of direction.to) {
                if ([fromLng, toLng].indexOf(toObj.value) === -1) {
                  toFlags.push(toObj.value);
                }
              }
              break;
            }
          }
          navigation.navigate('Flags', { flags: toFlags });
        }}
        underlayColor="#f2f2f2"
      >
        <Image source={{uri: toLng}} style={styles.image} />
      </TouchableHighlight>
    </View>;

    return {
      title: 'Search',
      headerRight: headerRight
    }
  }
}

export default SearchScreen;
