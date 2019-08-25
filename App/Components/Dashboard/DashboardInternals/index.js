
import React, { useEffect, useState } from 'react';
import { bool, func, object } from 'prop-types';
import { Text, TouchableOpacity, View } from 'react-native';
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <StopWatch isStarted={isRecording} doReset={doReset} />
          <Text>{`Alt: ${currentPosition.coords.altitude.toFixed(0)}`}</Text>
          <Text>{`Spd: ${Math.max(0, currentPosition.coords.speed * 3.6).toFixed(1)}`}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          { !isRecording && (
            <TouchableOpacity onPress={() => setDoReset(true)} style={styles.resetButton}>
              <Text>Reset Track</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onToggleRecord} style={styles.recordButton}>
            <Text>{ isRecording ? 'Stop' : 'Record' }</Text>
          </TouchableOpacity>
        </View>
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
