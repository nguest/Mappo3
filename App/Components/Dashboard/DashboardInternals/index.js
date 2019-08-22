
import React, { useEffect, useState } from 'react';
import { bool, func, object } from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import StopWatch from '../StopWatch';

import styles from './styles';

const DashboardInternals = ({
  currentPosition,
  isRecording,
  onResetTrack,
  onToggleRecord,
}) => {
  const [doReset, setDoReset] = useState(false);

  useEffect(() => {
    if (doReset) {
      setDoReset(true);
      onResetTrack();
      setDoReset(false);
    }
  }, [doReset]);


  if (currentPosition) {
    return (
      <>
        <StopWatch isStarted={isRecording} doReset={doReset} />
        <Text>{`Alt: ${currentPosition.coords.altitude}`}</Text>
        { !isRecording && (
          <TouchableOpacity onPress={() => setDoReset(true)} style={styles.resetButton}>
            <Text>Reset Track</Text>
          </TouchableOpacity>
        )}
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
  onResetTrack: func,
  onToggleRecord: func,
};

DashboardInternals.defaultProps = {
  currentPosition: null,
  isRecording: false,
  onResetTrack: () => { },
  onToggleRecord: () => { },
};

export default DashboardInternals;
