import React, { Component } from 'react';
import { View } from 'react-native';

import styles from './styles';
import db from '../../database';
import EmptyDictionary from '../../lib/EmptyDictionary';


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

  render() {
    return this.state.words.length ? <View>
    </View> :
    <EmptyDictionary />;
  }
}

export default DictionaryScreen;
