import React from 'react';
import {
  Dimensions,
  Text,
  View,
} from 'react-native';
import styles from './styles';

const { width } = Dimensions.get('window');

const Dashboard = () => (
  <View style={{ ...styles.dashboard, width: width - 20 }}>
    <Text>00:00</Text>
  </View>
);

export default Dashboard;
