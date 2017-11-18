import React from 'react';
import { StackNavigator } from 'react-navigation';

import TrainingScreenNav from './TrainingScreenNav';


export default StackNavigator({
  Training: {
    screen: TrainingScreenNav
  }
});

