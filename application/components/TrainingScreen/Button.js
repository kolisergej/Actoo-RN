import React from 'react';
import {
  TouchableHighlight,
  Text,
  View
} from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import styles from './styles';


export default (props) =>
  <TouchableHighlight
    style={styles.buttonStyle}
    onPress={props.onPressed}
    underlayColor="#f2f2f2"
  >
    <View style={styles.buttonView}>
      <View style={styles.buttonIcon}>
        <SimpleLineIcons name={props.icon} size={30} />
      </View>
      <Text style={styles.buttonText}>{props.text}</Text>
    </View>
  </TouchableHighlight>
