import React from 'react';
import {
  array,
  bool,
  func,
  object,
} from 'prop-types';
import {
  Dimensions,
  View,
} from 'react-native';
import styles from './styles';
import DashboardInternals from './DashboardInternals';
import { getElapsedTime } from '../../helpers/timeManager';
import { distanceBetweenPoints } from '../../helpers/pointsManager';

const { width } = Dimensions.get('window');

const Dashboard = ({
  currentPosition,
  currentTrack,
  isRecording,
  onToggleRecord,
}) => {
  return (
    <View style={{ ...styles.dashboard, width: width - 240 }}>
      <DashboardInternals
        distanceFromStart={distanceBetweenPoints(currentTrack[0], currentTrack[currentTrack.length - 1])}
        currentPosition={currentPosition}
        elapsedTime={getElapsedTime(currentTrack)}
        isRecording={isRecording}
        onToggleRecord={onToggleRecord}
      />
    </View>
  );
};

Dashboard.propTypes = {
  currentPosition: object,
  currentTrack: array,
  isRecording: bool,
  onToggleRecord: func,
};

Dashboard.defaultProps = {
  currentPosition: {},
  currentTrack: {},
  isRecording: false,
  onToggleRecord: () => { },
};

export default Dashboard;
