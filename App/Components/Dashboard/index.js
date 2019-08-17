import React from 'react';
import { obj } from 'prop-types';
import {
  Dimensions,
  Text,
  View,
} from 'react-native';
import styles from './styles';

const { width } = Dimensions.get('window');

const Dashboard = ({ currentPosition }) => {
  console.log('dashboard', currentPosition && currentPosition.coords);
  return (
    <View style={{ ...styles.dashboard, width: width - 20 }}>
      <Text>00:00 </Text>
      <Text>{currentPosition && currentPosition.coords && currentPosition.coords.longitude}</Text>
    </View>
  );
};

Dashboard.propTypes = {
  currentPosition: obj,
};

Dashboard.defaultProps = {
  currentPosition: {},
};

export default Dashboard;
