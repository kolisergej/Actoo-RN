import {
  PixelRatio,
  StyleSheet
} from 'react-native';


export default StyleSheet.create({
  trainingContainer: {
    flex: 1,
  },
  trainingScreenAlign: {
    flex: 4
  },
  trainingMainArea: {
    flex: 60,
    width: '80%',
    marginHorizontal: '10%'
  },
  infoArea: {
    flex: 90
  },
  buttonsArea: {
    flex: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  buttonStyle: {
    paddingHorizontal: 5,
    borderColor: 'grey',
    height: PixelRatio.getPixelSizeForLayoutSize(27),
    borderWidth: 1,
    borderRadius: 10
  },
  buttonView: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 16,
    color: '#0E7AFE',
    paddingLeft: 5,
    paddingRight: 5
  },
  origWord: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16
  },
  flagsArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flagImage: {
    width: PixelRatio.getPixelSizeForLayoutSize(25),
    height: PixelRatio.getPixelSizeForLayoutSize(15),
    borderColor: 'black',
    borderWidth: 1
  },
  switchButton: {
    width: PixelRatio.getPixelSizeForLayoutSize(12),
    height: PixelRatio.getPixelSizeForLayoutSize(12),
    marginHorizontal: 5
  },
});
