import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  yandexProviderNotice: {
    flex: 5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 5
  },
  label: {
    fontSize: 11
  },
  resultBoxStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: '5%',
    marginVertical: 20
  },
  sectionList: {
    width: '100%',
  },
  translationItemView: {
    marginBottom: 20,
  },
  adjustScrollView: {
    marginRight: 6,
  },
  examplesHr: {
    flex: 1,
    height: 1,
    width: '100%',
    marginTop: 3,
    marginBottom: 3,
    borderWidth: 0.5,
    borderColor: '#cccccc',
  },
  resultText: {
    fontSize: 16
  },
  emptyDictionary: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyTrainingMessage: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: -100
  }
});
