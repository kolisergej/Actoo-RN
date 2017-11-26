import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View
} from 'react-native';

import db from '../../database';
import { supportedLanguagesUrl, defaultLanguageDirections } from '../../lib/constants';
import { convertLanguageDirections, getTranslateUri } from '../../lib/helpers';
import YandexNoticeComponent from '../../lib/YandexNoticeComponent';
import Loader from './Loader';
import MessageBox from './MessageBox';
import ResultBox from '../../lib/ResultBox';
import * as constants from '../../lib/constants';

import styles from './styles';


export default class SearchScreen extends Component {
  constructor() {
    super();
    this.state = {
      textForTranslate: '',
      showLoader: true,
      messageBox: {
        show: false
      },
      currentResult: null,
    };
  }

  extractSupportedLanguages = () => {
    return new Promise((resolve, reject) => {
      fetch(supportedLanguagesUrl).then(response => {
        resolve(response);
      }).catch(err => {
        reject(new Error(err));
      });

      setTimeout(() => {
        reject(new Error('Slow connection'));
      }, 1000);
    });
  }

  onRequestClose = () => {
    this.setState({
      messageBox: {
        show: false
      }
    });
  }

  onCancelTranslation = () => {
    this.onRequestClose();
    // some tiny logic
    const request = this.request;
    this.request = null;
    request.abort();
  }

  componentDidMount() {
    onPromiseFinished = (languageSettings) => {
      const { fromLng, toLng } = languageSettings[0];
      this.props.navigation.setParams({ fromLng, toLng });
      this.setState({ showLoader: false });
    }

    const languageSettings = db.objects('LanguageSettings');
    this.extractSupportedLanguages().then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Invalid request');
    }).then(json => {
      const directions = convertLanguageDirections(json);
      if (!languageSettings.length) {
        // First application start (Internet on)
        db.write(() => {
          db.create('LanguageSettings', { directions });
        });
      } else {
        // else not first application start (Internet on)
        db.write(() => {
          languageSettings[0].directions = directions;
        });
      }
      onPromiseFinished(languageSettings);
    }).catch(err => {
      if (!languageSettings.length) {
        // First application start (Internet off)
        const directions = convertLanguageDirections(defaultLanguageDirections);
        db.write(() => {
          db.create('LanguageSettings', { directions });
        });
      } // else not first application start (Internet off)
      onPromiseFinished(languageSettings);
    });
  }

  _onChangeText = (text) => {
    this.setState({ textForTranslate: text.toLowerCase() })
  }

  upWordRate = (word) => {
    db.write(() => {
      word.rating += 1;
    });
    const examples = word.examples.map(example => Object.assign({}, example));
    const plainWord = Object.assign({}, word, { examples });
    this.setState({ currentResult: plainWord });
  }

  _onSubmitEditing = () => {
    if (!this.state.textForTranslate) {
      this.setState({
        messageBox: {
          show: true,
          title: constants.yandexHeaderService,
          message: constants.typeAnyWord
        }
      });
      return;
    }
    const { fromLng, toLng } = this.props.navigation.state.params;
    const id = fromLng + this.state.textForTranslate + toLng;
    let word = db.objects('Word').filtered(`id == "${id}"`);
    if (word.length) {
      this.upWordRate(word[0]);
    } else {
      this.setState({
        messageBox: {
          show: true,
          translating: true,
          title: constants.yandexHeaderService
        },
        currentResult: null
      });
      const request = new XMLHttpRequest();
      request.onreadystatechange = (e) => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          this.setState({
            messageBox: {
              show: false
            }
          });
          const json = JSON.parse(request.responseText);
          if (json.def.length) {
            const yandexResponse = json.def[0].tr[0];
            const examplesAnswer = yandexResponse.ex;
            let examples = [];
            if (examplesAnswer) {
              db.write(() => {
                examples = examplesAnswer.map(example => db.create('Example', { exampleOrig: example.text, exampleTr: example.tr[0].text }));
              });
            }
            let synonyms = '';
            if (yandexResponse.syn) {
              synonyms = yandexResponse.syn.map(synonym => synonym.text).join(', ');
            }
            db.write(() => {
              word = db.create('Word', {
                id,
                fromLng,
                toLng,
                origWord: this.state.textForTranslate,
                translate: yandexResponse.text,
                synonyms,
                examples,
              });
            });
            this.upWordRate(word);
          } else if (this.request) {
            setTimeout(() => {
              this.setState({
                messageBox: {
                  show: true,
                  title: constants.yandexHeaderService,
                  message: constants.unknownWord,
                  translating: false
                }
              });
            }, 1000);
          }
        } else if (this.request) {
          this.setState({
            messageBox: {
              show: true,
              translating: false,
              title: constants.connectionError,
              message: constants.checkInternetConnection
            }
          });
        }
      };
      this.request = request;
      this.request.open('GET', getTranslateUri(fromLng, toLng, this.state.textForTranslate));
      this.request.send();
    }
  }

  render() {
    let messageBox = null;
    const messageBoxState = this.state.messageBox;
    if (messageBoxState.show) {
      messageBox = <MessageBox
        title={messageBoxState.title}
        message={messageBoxState.message}
        translating={messageBoxState.translating}
        onRequestClose={this.onRequestClose}
        onCancelTranslation={this.onCancelTranslation}
      />;
    }
    return (<View style={styles.searchScreenContainer}>
      <View style={styles.searchScreenAlign} />
      <View style={styles.searchArea}>
        { this.state.showLoader && <Loader onRequestClose={this.onRequestClose} /> }
        { messageBox }
        <TextInput
          style={styles.translateTextContainer}
          placeholder='Type to translate...'
          maxLength={30}
          autoFocus={false}
          autoCapitalize='none'
          returnKeyLabel='google'
          onChangeText={this._onChangeText}
          value={this.state.textForTranslate}
          onSubmitEditing={this._onSubmitEditing}
          underlineColorAndroid='transparent'
        />
        { this.state.currentResult && <ResultBox result={this.state.currentResult} /> }
      </View>
      <YandexNoticeComponent />
    </View>
    );
  }
}
