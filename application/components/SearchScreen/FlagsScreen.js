import React, { Component } from 'react';
import {
  FlatList,
  TouchableHighlight,
  Image,
  Text,
  View,
  Dimensions
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import { isTablet, isLandscape } from '../../lib/helpers';
import flagImages from '../../lib/flagImages';
import styles from './styles';


function getNumColumns() {
  let numColumns = 3; // by default phone, portrait
  if (!isTablet() && isLandscape()) {
    numColumns = 4;
  } else if (isTablet()) {
    numColumns = 5;
  }
  return numColumns;
}


export default class FlagsScreen extends Component {
  constructor() {
    super();
    const numColumns = getNumColumns();
    this.state = { numColumns };
  }

  onDimensionChanged = () => {
    const numColumns = getNumColumns();
    this.setState({ numColumns });
  }

  componentWillMount() {
    Dimensions.addEventListener('change', this.onDimensionChanged);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onDimensionChanged);
  }

  keyExtractor = (item) => {
    return item;
  }

  renderItem = ({ item }) => {
    const { direction, fromLng, toLng, onBack } = this.props.navigation.state.params;
    return <TouchableHighlight
      onPress={() => {
        if (direction === 'from') {
          this.props.navigation.goBack();
          onBack(item, toLng, direction);
        } else {
          this.props.navigation.goBack();
          onBack(fromLng, item, direction);
        }
      }}
      underlayColor="#f2f2f2"
    >
      <View>
        <Image source={flagImages.big[item]} style={styles.flagImage} resizeMethod='resize' />
        <Text style={styles.languageSign}>{item}</Text>
      </View>
    </TouchableHighlight>;
  }

  render() {
    const { flags } = this.props.navigation.state.params;
    const key = (this.state.numColumns === 3 || this.state.numColumns === 5) ? 'p' : 'l';
    return <View style={styles.flagScreenContainer}>
      <View style={styles.flatListAlign} />
      <View style={styles.flatListContainer} >
        <FlatList
          key={key}
          numColumns={this.state.numColumns}
          columnWrapperStyle={styles.flatListColumn}
          contentContainerStyle={styles.flatListContent}
          data={flags}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
      <View style={styles.flatListAlign} />
    </View>;
  }
}
