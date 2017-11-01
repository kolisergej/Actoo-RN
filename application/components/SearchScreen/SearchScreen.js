import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import db from '../../database';
import { supportedLanguagesUrl, defaultLanguageDirections } from '../../lib/constants';
import { convertLanguageDirections } from '../../lib/helpers';


export default class SearchScreen extends Component {
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
      // redux set languageDirections
    }).catch(err => {
      if (!languageSettings.length) {
        // First application start (Internet off)
        const directions = convertLanguageDirections(defaultLanguageDirections);
        db.write(() => {
          db.create('LanguageSettings', { directions });
        });
        // redux set languageDirections
      } // else not first application start (Internet off)
    });
  }

  render() {
    return (<View>
        <Text>SearchScreen</Text>
      </View>
    );
  }
}
