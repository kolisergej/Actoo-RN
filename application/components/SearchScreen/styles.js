import { StyleSheet, PixelRatio } from 'react-native';


export default StyleSheet.create({
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 10,
    alignItems: 'center'
  },
  flagIcon: {
    width: PixelRatio.getPixelSizeForLayoutSize(20),
    height: PixelRatio.getPixelSizeForLayoutSize(15),
    borderColor: 'black',
    borderWidth: 1,
  },
  switchButton: {
    tintColor: '#0E7AFE',
    width: PixelRatio.getPixelSizeForLayoutSize(15),
    height: PixelRatio.getPixelSizeForLayoutSize(15),
    marginHorizontal: 5
  },
  flagImage: {
    width: PixelRatio.getPixelSizeForLayoutSize(40),
    height: PixelRatio.getPixelSizeForLayoutSize(25),
    borderColor: 'black',
    borderWidth: 1
  },
  flagScreenContainer: {
    flex: 1
  },
  flatListAlign: {
    flex: 5
  },
  flatListContainer: {
    flex: 90,
  },
  translateTextContainer: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: '5%',
    textAlign: 'center'
  },
  flatListContent: {
    marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10)
  },
  flatListColumn: {
    justifyContent: 'space-between'
  },
  languageSign: {
    textAlign: 'center'
  },
  searchScreenContainer: {
    flex: 1
  },
  searchScreenAlign: {
    flex: 10
  },
  searchArea: {
    flex: 85
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    opacity: 0.85
  },
  messageBox: {
    marginTop: -30,
    width: '85%',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 10,
    borderRadius: 10,
  },
  messageBoxTitleText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  messageBoxBodyText: {
    fontSize: 15,
    marginBottom: 10,
  },
  messageBoxHr: {
    height: 0.5,
    width: '100%',
    marginTop: 7,
    borderWidth: 0.5,
    borderColor: '#cccccc',
  },
  messageBoxButton: {
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  messageBoxButtonText: {
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 6,
    fontSize: 19,
    color: '#0E7AFE',
  },
});
