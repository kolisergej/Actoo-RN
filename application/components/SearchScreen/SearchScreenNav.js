import React from 'react';
import { TouchableHighlight, Image, View } from 'react-native';

import SearchScreen from './SearchScreen';
import db from '../../database';
import styles from './styles';


SearchScreen.navigationOptions = ({ navigation }) => {
  const languageSettings = db.objects('LanguageSettings')[0];
  if (languageSettings) {
    const { directions, direction } = languageSettings;
    console.log(this.props);

    const headerRight = <View style={styles.headerRight}>
      <TouchableHighlight
        onPress={() => {
          db.write(() => {
            languageSettings.direction = 'from';
          });
          navigation.navigate('Flags');
        }}
        underlayColor="#f2f2f2"
      >
        <Image resizeMode='stretch' source={{uri: languageSettings.fromLng}} style={styles.flagIcon} />
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {
          db.write(() => {
            const tmp = languageSettings.fromLng;
            languageSettings.fromLng = languageSettings.toLng;
            languageSettings.toLng = tmp;
          });
          console.log('!!!!!!!');
          // navigation.setParams();
        }}
        underlayColor="#f2f2f2"
      >
        <Image source={require('../../../assets/switch.png')} style={styles.switchButton} />
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {
          db.write(() => {
            languageSettings.direction = 'to';
          });
          navigation.navigate('Flags');
        }}
        underlayColor="#f2f2f2"
      >
        <Image source={{uri: languageSettings.toLng}} style={styles.flagIcon} />
      </TouchableHighlight>
    </View>;

    return {
      title: 'Search',
      headerRight: headerRight
    }
  }
}

export default SearchScreen;
