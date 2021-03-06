import React, { Component } from 'react';
import {
  Text,
  Image,
  View
} from 'react-native';

import Button from './Button';

import styles from './styles';
import db from '../../database';
import ResultBox from '../../lib/ResultBox';
import EmptyDictionary from '../../lib/EmptyDictionary';
import YandexNoticeComponent from '../../lib/YandexNoticeComponent';
import flagImages from '../../lib/flagImages';

const wordsSessionCount = 20;
const forwardArrow = require('../../../images/icons/arrow.png');

export default class TrainingScreen extends Component {
  constructor() {
    super();
    this.state = {
      currentWordIndex: 0,
      showResult: false,
      words: this.setUpSessionWords()
    };
  }

  componentWillMount() {
    const words = db.objects('Word');
    words.addListener((words, changes) => {
      if (changes.insertions.length || changes.deletions.length) {
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
    return currentWord ?
      <View style={styles.trainingContainer}>
        <View style={styles.trainingScreenAlign} />
        <View style={styles.trainingMainArea}>
          <View style={styles.infoArea}>
            <Text style={styles.origWord}>{currentWord.origWord}</Text>

            <View style={styles.flagsArea}>
              <Image source={flagImages.small[currentWord.fromLng]} style={styles.flagImage} />
              <Image source={forwardArrow} style={styles.switchButton} />
              <Image source={flagImages.small[currentWord.toLng]} style={styles.flagImage} />
            </View>

            { this.state.showResult && <ResultBox result={currentWord} /> }
          </View>

          { !this.state.showResult ?
            <View style={styles.buttonsArea}>
              <Button onPressed={this.onKnowPressed} text='I know' icon='like' />
              <Button onPressed={this.onForgotPressed} text='I forgot' icon='dislike' />
            </View> :
            <View style={styles.buttonsArea}>
              <Button onPressed={this.onGotItPressed} text='Got It' icon='check' />
            </View>
          }
        </View>
        <View style={styles.trainingScreenAlign} />
        <YandexNoticeComponent />
      </View> :
      <EmptyDictionary />
  }
}
