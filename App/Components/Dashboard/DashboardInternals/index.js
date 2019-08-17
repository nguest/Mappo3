
import React from 'react';
import { bool, func, object } from 'prop-types';
import {
  Text,
  TouchableOpacity,
} from 'react-native';

const DashboardInternals = ({ currentPosition, isRecording, onToggleRecord }) => {
  if (currentPosition) {
    return (
      <>
        <Text>00:00</Text>
        <Text>{currentPosition.coords.longitude}</Text>
        <TouchableOpacity onPress={onToggleRecord}>
          <Text>{ isRecording ? 'Stop' : 'Record' }</Text>
        </TouchableOpacity>
      </>
    );
  }
  return <Text>Loading...</Text>;
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
