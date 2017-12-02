import React, { Component } from 'react';
import {
  View,
  UIManager,
  findNodeHandle,
  TouchableOpacity
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import db from '../../database';

import styles from './styles';


export default class Row extends Component {

  onPopupEvent = (eventName, index) => {
    if (eventName === 'itemSelected' && index === 0) {
      const deleteItem = db.objects('Word').filtered('id = $0', this.props.id);
      if (deleteItem) {
        db.write(() => {
          db.delete(deleteItem);
          // I think, it is hack for updating list
          this.props.onRowOpen();
        });
      }
    }
  }

  onPress = () => {
    UIManager.showPopupMenu(
      findNodeHandle(this.icon),
      ['Remove'],
      () => {},
      this.onPopupEvent
    );
  }

  render() {
    return <View style={styles.androidRow}>
      <View style={styles.androidRowChildren}>
        { this.props.children }
      </View>
      <TouchableOpacity
        onPress={this.onPress}
        style={styles.androidPopup}
      >
        <MaterialIcons
          name='more-vert'
          size={30}
          color='grey'
          ref={icon => this.icon = icon}
        />
      </TouchableOpacity>
    </View>;
  }
}
