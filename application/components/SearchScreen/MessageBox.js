import React from 'react';
import { ActivityIndicator,
  Text,
  Modal,
  View,
  TouchableHighlight
} from 'react-native';

import styles from './styles';


export default (props) => {
  const { title, translating, message } = props;
  const buttonText = translating ? 'Cancel' : 'OK';
  return <Modal
      animationType='fade'
      transparent
      visible
      supportedOrientations={['portrait', 'landscape']}
    >
      <View style={styles.modalContainer}>
        <View style={styles.messageBox}>
          <Text style={styles.messageBoxTitleText}>{title}</Text>
          { message && <Text style={styles.messageBoxBodyText}>{message}</Text>}
          { translating && <ActivityIndicator animating size="small" /> }
          <View style={styles.messageBoxHr} />
          <TouchableHighlight
            style={styles.messageBoxButton}
            onPress={props.onButtonPressed}
            underlayColor='#f2f2f2'
          >
            <Text style={styles.messageBoxButtonText}>
              {buttonText}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>;
}
