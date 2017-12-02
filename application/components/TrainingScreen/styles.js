import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  trainingContainer: {
    flex: 1,
    backgroundColor: '#E9E9EF'
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
    flex: 87
  },
  buttonsArea: {
    flex: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10
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
    borderColor: 'black',
    borderWidth: 1
  },
  switchButton: {
    tintColor: '#0E7AFE',
    marginHorizontal: 5
  },
});
