import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  dictionaryScreenContainer: {
    flex: 1,
    backgroundColor: '#E9E9EF'
  },
  dictionaryAlign: {
    flex: 5
  },
  dictionaryInfo: {
    flex: 85,
    marginLeft: '5%'
  },
  dictionaryRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 7
  },
  dictionaryText: {
    flex: 1,
    fontSize: 16,
    marginRight: 5
  },
  flagsArea: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 3
  },
  flagImage: {
    borderColor: 'black',
    borderWidth: 1,
  },
  switchButton: {
    tintColor: '#0E7AFE',
    marginHorizontal: 3
  },
  separator: {
    height: 1,
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#cccccc',
  },
  dictionaryContent: {
    paddingRight: 5
  },
  deleteButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff3232'
  },
  androidRow: {
    flex: 1,
    flexDirection: 'row'
  },
  androidRowChildren: {
    flex: 9
  },
  androidPopup: {
    justifyContent: 'center',
    marginVertical: 5
  },

});
