import { StyleSheet } from 'react-native';

import { scale, verticalScale } from '../../lib/helpers';

export default StyleSheet.create({
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 10,
    alignItems: 'center'
  },
  image: {
    width: scale(38),
    height: verticalScale(33),
    borderColor: 'black',
    borderWidth: 1,
  },
  switchButton: {
    tintColor: '#0E7AFE',
    width: scale(32),
    height: verticalScale(30),
    marginHorizontal: 5
  }
});
