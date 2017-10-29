import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');


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

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

export {scale, verticalScale, moderateScale, convertLanguageDirections};
