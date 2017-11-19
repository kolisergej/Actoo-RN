import React from 'react';
import {
  Text,
  View
} from 'react-native';

import { emptyTrainingMessage } from './constants';
import styles from './styles';

export default () => {
  return <View style={styles.emptyDictionary}>
    <Text style={styles.emptyTrainingMessage}>{ emptyTrainingMessage }</Text>
  </View>;
}
