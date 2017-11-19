import {
  StyleSheet,
  PixelRatio
} from 'react-native';

export default StyleSheet.create({
  dictionaryScreenContainer: {
    flex: 1
  },
  dictionaryAlign: {
    flex: 5
  },
  dictionaryInfo: {
    flex: 85,
    marginHorizontal: '5%'
  },
  dictionaryRow: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 7
  },
  flagsArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagImage: {
    width: PixelRatio.getPixelSizeForLayoutSize(20),
    height: PixelRatio.getPixelSizeForLayoutSize(12),
    borderColor: 'black',
    borderWidth: 1
  },
  switchButton: {
    width: PixelRatio.getPixelSizeForLayoutSize(10),
    height: PixelRatio.getPixelSizeForLayoutSize(10),
    marginHorizontal: 3
  },
  separator: {
    height: 1,
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#cccccc',
  },
  dictionaryContent: {
    paddingRight: 10
  },
  dictionaryText: {
    fontSize: 16,
    textAlign: 'center'
  }
});
