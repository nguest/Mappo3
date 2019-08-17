import React, { Fragment } from 'react';
import { bool, func, obj } from 'prop-types';
import {
  Dimensions,
  View,
} from 'react-native';
import styles from './styles';
import DashboardInternals from './DashboardInternals';

const { width } = Dimensions.get('window');

const Dashboard = ({ currentPosition, isRecording, toggleRecord }) => {
  console.log('dashboard', currentPosition && currentPosition.coords);
  return (
    <View style={{ ...styles.dashboard, width: width - 20 }}>
      <DashboardInternals
        currentPosition={currentPosition}
        isRecording={isRecording}
        toggleRecord={toggleRecord}
      />
    </View>
  );
};

Dashboard.propTypes = {
  currentPosition: obj,
  isRecording: bool,
  toggleRecord: func,
};

Dashboard.defaultProps = {
  currentPosition: {},
  isRecording: false,
  toggleRecord: () => { },
};

export default Dashboard;
