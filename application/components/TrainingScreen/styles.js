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
    flex: 87,
    width: '80%',
    marginHorizontal: '10%'
  },
  infoArea: {
    flex: 90
  },
  buttonsArea: {
    flex: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  buttonStyle: {
    borderColor: 'grey',
    width: PixelRatio.getPixelSizeForLayoutSize(60),
    height: PixelRatio.getPixelSizeForLayoutSize(20),
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 16,
    color: '#0E7AFE'
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
