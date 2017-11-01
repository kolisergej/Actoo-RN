import React from 'react';
import { TouchableHighlight, Image, View } from 'react-native';

import SearchScreen from './SearchScreen';
import db from '../../database';
import styles from './styles';


SearchScreen.navigationOptions = ({ navigation }) => {
  if (navigation.state.params) {
    let { fromLng, toLng, direction } = navigation.state.params;
    const languageSettings = db.objects('LanguageSettings')[0];

    if (direction === 'from') {
      const fromDirection = languageSettings.directions.find(item => item.from === fromLng);
      const toValue = fromDirection.to.find(item => item.value === toLng);
      if (!toValue) {
        toLng = fromDirection.to[0].value;
      }
    }

    db.write(() => {
      languageSettings.fromLng = fromLng;
      languageSettings.toLng = toLng;
    });

    onBack = (fromLng, toLng, direction) => {
      // hack
      setTimeout(() => {
        navigation.setParams({ fromLng, toLng, direction });
      }, 10);
    };

    const headerRight = <View style={styles.headerRight}>
      <TouchableHighlight
        onPress={() => {
          let flags = [];
          for (const direction of languageSettings.directions) {
            if ([fromLng, toLng, 'tt', 'mhr', 'mrj'].indexOf(direction.from) === -1) {
              flags.push(direction.from);
            }
          }
          navigation.navigate('Flags', { flags, fromLng, toLng, direction: 'from', onBack });
        }}
        underlayColor="#f2f2f2"
      >
        <Image resizeMode='stretch' source={{uri: fromLng}} style={styles.flagIcon} />
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
          let flags = [];
          for (const direction of languageSettings.directions) {
            if (direction.from === fromLng) {
              for (const toObj of direction.to) {
                if ([fromLng, toLng, 'tt', 'mhr', 'mrj'].indexOf(toObj.value) === -1) {
                  flags.push(toObj.value);
                }
              }
              break;
            }
          }
          navigation.navigate('Flags', { flags, fromLng, toLng, direction: 'to', onBack });
        }}
        underlayColor="#f2f2f2"
      >
        <Image source={{uri: toLng}} style={styles.flagIcon} />
      </TouchableHighlight>
    </View>;

    return {
      title: 'Search',
      headerRight: headerRight
    }
  }
}

export default SearchScreen;
