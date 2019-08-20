
import React from 'react';
import {
  any, bool, func, object,
} from 'prop-types';

import {
  Text,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';

const DashboardInternals = ({
  currentPosition,
  elapsedTime,
  isRecording,
  onToggleRecord,
}) => {
  if (currentPosition) {
    return (
      <>
        <Text>{ elapsedTime }</Text>
        <Text>{ currentPosition.coords.longitude }</Text>
        <TouchableOpacity onPress={onToggleRecord} style={styles.recordButton}>
          <Text>{ isRecording ? 'Stop' : 'Record' }</Text>
        </TouchableOpacity>
      </>
    );
  }
  return <Text>Loading...</Text>;
};


DashboardInternals.propTypes = {
  currentPosition: object,
  elapsedTime: any,
  isRecording: bool,
  onToggleRecord: func,
};

DashboardInternals.defaultProps = {
  currentPosition: null,
  elapsedTime: null,
  isRecording: false,
  onToggleRecord: () => { },
};

export default DashboardInternals;
