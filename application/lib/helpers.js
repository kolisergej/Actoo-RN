import {
  Dimensions,
  PixelRatio
} from 'react-native';

import * as constants from './constants';

function isLandscape() {
  const dim = Dimensions.get('screen');
  return dim.width >= dim.height;
}

function isTablet() {
  const pixelDensity = PixelRatio.get();
  const { width, height } = Dimensions.get('window');
  const adjustWidth = width * pixelDensity;
  const adjustHeight = height * pixelDensity;
  return (
    (pixelDensity < 2 && (adjustWidth >= 1000 || adjustHeight >= 1000)) ||
    (pixelDensity === 2 && (adjustWidth >= 1920 || adjustHeight >= 1920))
  );
}

function convertLanguageDirections(directionsArray) {
  const tmpObj = Object.create(null);
  directionsArray.forEach(direction => {
    const [fromLng, toLng] = direction.split('-');
    const waste = ['mhr', 'mrj'];
    if (fromLng !== toLng && waste.indexOf(fromLng) === -1 && waste.indexOf(toLng) === -1) {
      if (!tmpObj[fromLng]) {
        tmpObj[fromLng] = [];
      }
      tmpObj[fromLng].push({ value: toLng });
    }
  });
  const directions = [];
  for (const fromLng in tmpObj) {
    directions.push({
      'from': fromLng,
      'to': tmpObj[fromLng]
    });
  }
  return directions;
}

function getToken() {
  let index = 0;
  return () => {
    index += 1;
    return constants.tokens[index % constants.tokens.length];
  };
}
const token = getToken();

function getTranslateUri(fromLng, toLng, word) {
  return `${constants.translateUrl}${token()}&lang=${fromLng}-${toLng}&text=${encodeURIComponent(word)}`;
}

export {
  isLandscape,
  isTablet,
  convertLanguageDirections,
  getTranslateUri
};
