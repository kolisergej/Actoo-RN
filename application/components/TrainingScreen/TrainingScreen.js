import React, { Component } from 'react';
import {
  TouchableHighlight,
  Text,
  Image,
  Platform,
  View
} from 'react-native';

import styles from './styles';
import db from '../../database';
import ResultBox from '../../lib/ResultBox';
import YandexNoticeComponent from '../../lib/YandexNoticeComponent';

const wordsSessionCount = 20;

export default class TrainingScreen extends Component {
  constructor() {
    super();
    this.state = {
      currentWordIndex: 0,
      showResult: false,
      words: []
    };

    db.objects('Word').addListener(() => {
      if (db.objects('Word').length === 1) {
        this.setState({ words: this.setUpSessionWords() });
      }
    });
  }

  setUpSessionWords() {
    // JSON.parse convert Realm array to json object, so pick objects one by one
    return db.objects('Word').sorted('rating', true).slice(0, wordsSessionCount).map(proxy => {
      const examples = proxy.examples.map(example => Object.assign({}, example));
      return Object.assign({}, proxy, { examples });
    });
  }

  onKnowPressed = () => {
    let { words, currentWordIndex } = this.state;
    db.write(() => {
      const word = db.objects('Word').filtered('id = $0', words[currentWordIndex].id)[0];
      word.rating -= 1;
    });
    if (currentWordIndex < words.length - 1) {
      currentWordIndex += 1;
    } else {
      currentWordIndex = 0;
      this.setState({ words: this.setUpSessionWords() });
    }
    this.setState({ currentWordIndex });
  }

  onForgotPressed = () => {
    const { words, currentWordIndex } = this.state;
    db.write(() => {
      const word = db.objects('Word').filtered('id = $0', words[currentWordIndex].id)[0];
      word.rating = word.rating + 1;
    });
    this.setState({ showResult: true });
  }

  onGotItPressed = () => {
    let { words, currentWordIndex } = this.state;
    if (currentWordIndex < words.length - 1) {
      currentWordIndex += 1;
    } else {
      currentWordIndex = 0;
      this.setState({ words: this.setUpSessionWords() });
    }
    this.setState({
      currentWordIndex,
      showResult: false
    });
  }

  render() {
    const { words, currentWordIndex } = this.state;
    const currentWord = words.length ? words[currentWordIndex] : null;
    return <View style={styles.trainingContainer}>
      <View style={styles.trainingScreenAlign} />
      { currentWord ?
        <View style={styles.trainingMainArea}>
          <View style={styles.infoArea}>
            <Text style={styles.origWord}>{currentWord.origWord}</Text>
            {
              Platform.OS === 'ios' ?
                <View style={styles.flagsArea}>
                  <Image resizeMode='stretch' source={{uri: currentWord.fromLng}} style={styles.flagImage} />
                  <Image source={require('../../../assets/arrow.png')} style={styles.switchButton} />
                  <Image resizeMode='stretch' source={{uri: currentWord.toLng}} style={styles.flagImage} />
                </View> :
                <View style={styles.flagsArea}>
                  <Image resizeMode='stretch' source={{uri: `asset:/${currentWord.frmLng}.png`}} style={styles.flagImage} />
                  <Image source={require('../../../assets/arrow.png')} style={styles.switchButton} />
                  <Image resizeMode='stretch' source={{uri: `asset:/${currentWord.toLng}.png`}} style={styles.flagImage} />
                </View>
            }
            { this.state.showResult && <ResultBox result={currentWord} /> }
          </View>

          { !this.state.showResult ?
            <View style={styles.buttonsArea}>
              <TouchableHighlight
                style={styles.buttonStyle}
                onPress={this.onKnowPressed}
                underlayColor="#f2f2f2"
              >
                <Text style={styles.buttonText}>I know</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.buttonStyle}
                onPress={this.onForgotPressed}
                underlayColor="#f2f2f2"
              >
                <Text style={styles.buttonText}>I forgot</Text>
              </TouchableHighlight>
            </View> :
            <View style={styles.buttonsArea}>
              <TouchableHighlight
                  style={styles.buttonStyle}
                  onPress={this.onGotItPressed}
                  underlayColor="#f2f2f2"
                >
                <Text style={styles.buttonText}>Got it</Text>
              </TouchableHighlight>
            </View>
          }
        </View> : <View style={styles.trainingMainArea}>
        </View>
      }
      <View style={styles.trainingScreenAlign} />
      <YandexNoticeComponent />
    </View>;
  }
}
