import React from 'react';
import { TouchableHighlight, Image, View, Platform } from 'react-native';

import SearchScreen from './SearchScreen';
import db from '../../database';
import styles from './styles';


SearchScreen.navigationOptions = ({ navigation }) => {
  if (navigation.state.params) {
    let { fromLng, toLng, direction } = navigation.state.params;
    const languageSettings = db.objects('LanguageSettings')[0];

    if (direction === 'from') {
      for (const i = 0; i < languageSettings.directions.length; ++i) {
        const direction = languageSettings.directions[i];
        if (direction.from === fromLng) {
          let found = false;
          for (const j = 0; j < direction.to.length; ++j) {
            const toValue = direction.to[j];
            if (toValue.value === toLng) {
              found = true;
              break;
            }
          }
          if (!found) {
            toLng = direction.to[0].value;
          }
          break;
        }
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
          for (let i = 0; i < languageSettings.directions.length; ++i) {
            const direction = languageSettings.directions[i];
            if ([fromLng, toLng, 'tt', 'mhr', 'mrj'].indexOf(direction.from) === -1) {
              flags.push(direction.from);
            }
          }
          navigation.navigate('Flags', { flags, fromLng, toLng, direction: 'from', onBack });
        }}
        underlayColor="#f2f2f2"
      >
        {
          Platform.OS === 'ios' ?
            // <Image resizeMode='stretch' source={{uri: fromLng}} style={styles.flagIcon} /> :
            // <Image resizeMode='stretch' source={{uri: `asset:/${fromLng}.png`}} style={styles.flagIcon} />
            // <Image source={require('../../../assets/switch.png')} style={styles.switchButton} />
            <Image source={{uri: `flags/small/${fromLng}`}} /> :
            <Image source={{uri: `asset:/flags/small/${fromLng}.png`}} />
        }
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
      {
        Platform.OS === 'ios' ?
          // <Image source={require('icons/exchange')} /> :
          // <Image source={require('asset:/icons/exchange.png')} />
          <View /> :
          <View />
      }
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {
          let flags = [];
          for (const i = 0; i < languageSettings.directions.length; ++i) {
            const direction = languageSettings.directions[i];
            if (direction.from === fromLng) {
              for (const j = 0; j < direction.to.length; ++j) {
                const toObj = direction.to[j];
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
        {
          Platform.OS === 'ios' ?
            // <Image resizeMode='stretch' source={{uri: toLng}} style={styles.flagIcon} /> :
            // <Image resizeMode='stretch' source={{uri: `asset:/${toLng}.png`}} style={styles.flagIcon} />
            <Image source={{uri: `flags/small/${toLng}`}} /> :
            <Image source={{uri: `asset:/flags/small/${toLng}.png`}} />
        }
      </TouchableHighlight>
    </View>;

    return { headerRight };
  }
}

export default SearchScreen;
