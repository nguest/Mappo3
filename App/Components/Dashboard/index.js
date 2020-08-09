import React from "react";
import { array, bool, func, object } from "prop-types";
import { View } from "react-native";
import DashboardInternals from "./DashboardInternals";
import { getElapsedTime } from "../../helpers/timeManager";
import { distanceBetweenPoints } from "../../helpers/pointsManager";
import recordingAlert from "./RecordingAlert";

import styles from "./styles";

const Dashboard = ({
  currentPosition,
  currentTrack,
  onCompleteCurrentTrack,
  isRecording,
  onResetTrack,
  onToggleRecord,
}) => (
  <>
    <DashboardInternals
      distanceFromStart={distanceBetweenPoints(
        currentTrack[0],
        currentTrack[currentTrack.length - 1]
      )}
      currentPosition={currentPosition}
      //elapsedTime={getElapsedTime(currentTrack)}
      onResetTrack={onResetTrack}
      isRecording={isRecording}
      onToggleRecord={() => {
        onToggleRecord();
        if (isRecording)
          recordingAlert({ currentTrack, onCompleteCurrentTrack });
      }}
    />
  </>
);

Dashboard.propTypes = {
  currentPosition: object,
  currentTrack: array,
  isRecording: bool,
  onCompleteCurrentTrack: func,
  onToggleRecord: func,
};

Dashboard.defaultProps = {
  currentPosition: {},
  currentTrack: {},
  isRecording: false,
  onCompleteCurrentTrack: () => {},
  onToggleRecord: () => {},
};

export default Dashboard;
