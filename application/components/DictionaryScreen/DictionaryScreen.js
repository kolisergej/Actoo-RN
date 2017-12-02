import React, { Component } from 'react';
import {
  Image,
  FlatList,
  Text,
  View
} from 'react-native';

import Row from './Row';
import db from '../../database';
import YandexNoticeComponent from '../../lib/YandexNoticeComponent';
import EmptyDictionary from '../../lib/EmptyDictionary';
import flagImages from '../../lib/flagImages';

import styles from './styles';

const forwardArrow = require('../../../images/icons/arrow.png');


class DictionaryScreen extends Component {
  constructor() {
    super();
    this.state = { words: [] };
  }

  componentWillMount() {
    const words = db.objects('Word').sorted('origWord');
    this.setState({ words });
    words.addListener((words, changes) => {
      if (changes.insertions.length || changes.deletions.length) {
        this.setState({ words });
      }
    });
  }

  keyExtractor = item => item.id;

  onRowOpen = index => this.setState({ openIndex: index })

  renderItem = ({ index, item }) => {
    const info = <View style={styles.dictionaryRow}>
      <Text style={styles.dictionaryText}>{ item.origWord } - { item.translate }</Text>

      <View style={styles.flagsArea}>
        <Image source={flagImages.small[item.fromLng]} style={styles.flagImage} />
        <Image source={forwardArrow} style={styles.switchButton} />
        <Image source={flagImages.small[item.toLng]} style={styles.flagImage} />
      </View>
    </View>;

    return <Row index={index} id={item.id} onRowOpen={this.onRowOpen} openIndex={this.state.openIndex}>
      { info }
    </Row>;
  }

  render() {
    return this.state.words.length ? <View style={styles.dictionaryScreenContainer}>
      <View style={styles.dictionaryAlign} />
      <View style={styles.dictionaryInfo} >
        <FlatList
          contentContainerStyle={styles.dictionaryContent}
          data={this.state.words}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
      <View style={styles.dictionaryAlign} />
      <YandexNoticeComponent />
    </View> :
    <EmptyDictionary />;
  }
}

export default DictionaryScreen;
