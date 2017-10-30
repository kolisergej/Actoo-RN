import { StyleSheet } from 'react-native';

import { scale, verticalScale } from '../../lib/helpers';

export default StyleSheet.create({
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 10,
    alignItems: 'center'
  },
  flagIcon: {
    width: scale(42),
    height: verticalScale(32),
    borderColor: 'black',
    borderWidth: 1,
  },
  switchButton: {
    tintColor: '#0E7AFE',
    width: scale(32),
    height: verticalScale(30),
    marginHorizontal: 5
  },
  flagImage: {
    width: scale(85),
    height: verticalScale(55),
    borderColor: 'black',
    borderWidth: 1
  }
});
