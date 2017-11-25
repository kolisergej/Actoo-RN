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
      const deleteItem = db.objects('Word').filtered('id = $0', this.props.item.id);
      if (deleteItem) {
        db.write(() => {
          db.delete(deleteItem);
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
    return <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{flex: 14}}>
        { this.props.children }
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={this.onPress}>
          <MaterialIcons
            name='more-vert'
            size={30}
            color='grey'
            ref={icon => this.icon = icon}
          />
        </TouchableOpacity>
      </View>
    </View>;
  }
}
