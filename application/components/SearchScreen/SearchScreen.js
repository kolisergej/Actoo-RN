import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import db from '../../database';
import { supportedLanguagesUrl, defaultLanguageDirections } from '../../lib/constants';
import { convertLanguageDirections } from '../../lib/helpers';


export default class SearchScreen extends Component {
  constructor() {
    super();
    this.state = {
      supportedLanguages: []
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

  componentDidMount() {
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
      this.setState({ supportedLanguages: directions });
      const { fromLng, toLng } = languageSettings[0];
      this.props.navigation.setParams({ fromLng, toLng });
    }).catch(err => {
      if (!languageSettings.length) {
        // First application start (Internet off)
        const directions = convertLanguageDirections(defaultLanguageDirections);
        db.write(() => {
          db.create('LanguageSettings', { directions });
        });
        this.setState({ supportedLanguages: directions });
      } else {
        // else not first application start (Internet off)
        this.setState({ supportedLanguages: languageSettings[0].directions });
      }
      const { fromLng, toLng } = languageSettings[0];
      this.props.navigation.setParams({ fromLng, toLng });
    });
  }

  render() {
    return (<View>
        <Text>SearchScreen</Text>
      </View>
    );
  }
}
