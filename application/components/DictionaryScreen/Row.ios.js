import React from 'react';
import {
  View
} from 'react-native';

import Swipeout from 'react-native-swipeout';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import db from '../../database';

import styles from './styles';


export default ({ item, index, openIndex, onRowOpen, children }) => {
  const swipeSettings = {
    autoClose: true,
    backgroundColor: 'transparent',
    close: openIndex !== index,
    onOpen: (sectionID, rowId, direction) => {
      onRowOpen(index);
    },
    right: [
      {
        onPress: () => {
          const deleteItem = db.objects('Word').filtered('id = $0', item.id);
          if (deleteItem) {
            db.write(() => {
              db.delete(deleteItem);
            });
          }
        },
        component: <View style={styles.deleteButton}>
          <MaterialIcons name='delete' size={30} />
        </View>,
        underlayColor: '#ff4d4d'
      }
    ]
  };
  return <Swipeout {...swipeSettings}>
    { children }
  </Swipeout>;
}
