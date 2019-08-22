
import React from 'react';
import { bool, func, object } from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import StopWatch from '../StopWatch';

import styles from './styles';

const DashboardInternals = ({
  currentPosition,
  isRecording,
  onToggleRecord,
}) => {
  if (currentPosition) {
    return (
      <>
        <StopWatch isStarted={isRecording} />
        <Text>{`Alt: ${currentPosition.coords.altitude}`}</Text>
        <TouchableOpacity onPress={onToggleRecord} style={styles.recordButton}>
          <Text>{ isRecording ? 'Stop' : 'Record' }</Text>
        </TouchableOpacity>
      </>
    );
  }
  return <Text>Getting GPS Position...</Text>;
};


DashboardInternals.propTypes = {
  currentPosition: object,
  isRecording: bool,
  onToggleRecord: func,
};

DashboardInternals.defaultProps = {
  currentPosition: null,
  isRecording: false,
  onToggleRecord: () => { },
};

export default DashboardInternals;
