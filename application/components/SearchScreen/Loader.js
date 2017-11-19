import React from 'react';
import {
  Modal,
  ActivityIndicator,
  Text,
  View
} from 'react-native';

import styles from './styles';

export default () =>
  <Modal
    animationType='fade'
    supportedOrientations={['portrait', 'landscape']}
    transparent
    onRequestClose={() => {}}
  >
    <View style={styles.modalContainer}>
      <ActivityIndicator animating size='large' />
    </View>
  </Modal>
