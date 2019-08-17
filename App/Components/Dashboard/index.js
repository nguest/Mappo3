import React from 'react';
import { bool, func, object } from 'prop-types';
import {
  Dimensions,
  View,
} from 'react-native';
import styles from './styles';
import DashboardInternals from './DashboardInternals';

const { width } = Dimensions.get('window');

const Dashboard = ({ currentPosition, isRecording, onToggleRecord }) => {
  return (
    <View style={{ ...styles.dashboard, width: width - 20 }}>
      <DashboardInternals
        currentPosition={currentPosition}
        isRecording={isRecording}
        onToggleRecord={onToggleRecord}
      />
    </View>
  );
};

Dashboard.propTypes = {
  currentPosition: object,
  isRecording: bool,
  onToggleRecord: func,
};

Dashboard.defaultProps = {
  currentPosition: {},
  isRecording: false,
  onToggleRecord: () => { },
};

export default Dashboard;
