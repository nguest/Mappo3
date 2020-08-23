import React, { useEffect, useState } from "react";
import { bool, func, object } from "prop-types";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import StopWatch from "../StopWatch";

import s from "../../../styles";

import styles from "./styles";

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
        <View style={styles.topContainer}>
          <View style={styles.dataBox}>
            <Text
              style={s.typography.textL}
            >{`${currentPosition.coords.altitude.toFixed(0)}`}</Text>
            <Text style={s.typography.textXS}>m</Text>
          </View>
          <View style={styles.dataBox}>
            <Icon name="ios-speedometer" size={20} />
            <Text style={s.typography.textM}>{`${Math.max(
              0,
              currentPosition.coords.speed * 3.6
            ).toFixed(1)}`}</Text>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <StopWatch isStarted={isRecording} doReset={doReset} />

          {!isRecording && (
            <TouchableOpacity
              onPress={() => setDoReset(true)}
              style={styles.resetButton}
            >
              <Text>Reset Track</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={onToggleRecord}
            style={styles.recordButton}
          >
            <Text>{isRecording ? "Stop" : "Record"}</Text>
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
  onResetTrack: () => {},
  onToggleRecord: () => {},
};

export default DashboardInternals;
