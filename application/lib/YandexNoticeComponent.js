import React from 'react';
import { Text, View } from 'react-native';

import { yandexApiText } from './constants';
import styles from './styles';

export default () =>
  <View style={styles.yandexProviderNotice}>
    <Text style={styles.label}>{ yandexApiText }</Text>
  </View>
