import { Dimensions } from 'react-native';

import * as constants from './constants';


function msp(dim, limit) {
    return (dim.scale * dim.width) >= limit || (dim.scale * dim.height) >= limit;
}

function isPortrait() {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
}

function isLandscape() {
  const dim = Dimensions.get('screen');
  return dim.width >= dim.height;
}

function isTablet() {
    const dim = Dimensions.get('screen');
    return ((dim.scale < 2 && msp(dim, 1000)) || (dim.scale >= 2 && msp(dim, 1900)));
}

function isPhone(){
  return !isTablet();
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

function translate(fromLng, toLng, word) {
  const uri = `${constants.translateUrl}${token()}&lang=${fromLng}-${toLng}&text=${encodeURIComponent(word)}`;
  return fetch(uri);
}

export {
  isPortrait,
  isLandscape,
  isTablet,
  isPhone,
  convertLanguageDirections,
  translate
};
