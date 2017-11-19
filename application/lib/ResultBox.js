import React from 'react';
import {
  SectionList,
  Text,
  View,
} from 'react-native';

import styles from './styles';

const TranslationItem = ({ item }) =>
  <View style={styles.translationItemView}>
    <Text style={styles.resultText}>{item.translate}; {item.synonyms}</Text>
  </View>;

const ExamplesItem = ({ item }) =>
  <Text style={styles.resultText}>{item.exampleOrig} - {item.exampleTr} </Text>;

const ResultBox = ({ result }) => {
  return <View style={styles.resultBoxStyle}>
    <SectionList
      style={styles.sectionList}
      sections={[
        {
          data: [result],
          keyExtractor: item => item.id,
          renderItem: TranslationItem,
        },
        {
          data: result.examples,
          keyExtractor: item => item.exampleOrig,
          renderItem: ExamplesItem,
        }
      ]}
      ItemSeparatorComponent={() => <View style={styles.examplesHr} />}
    />
  </View>;
}

export default ResultBox;
