import React, { Component } from 'react';
import { Text } from 'react-native';


export default class FlagsScreen extends Component {
  render() {
    return <Text>{this.props.navigation.state.params.flags.map(elem => elem + ' ')}</Text>;
  }
}
