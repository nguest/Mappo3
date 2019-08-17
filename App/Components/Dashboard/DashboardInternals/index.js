
import React from 'react';
import { bool, func, obj } from 'prop-types';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import s from './styles';

const DashboardInternals = ({ currentPosition, isRecording, toggleRecord }) => {
  if (currentPosition) {
    return (
      <>
        <Text>00:00 </Text>
        <Text>{currentPosition && currentPosition.coords && currentPosition.coords.longitude}</Text>
        <TouchableOpacity onPress={toggleRecord}>
          { isRecording ? 'Stop' : 'Record' }
        </TouchableOpacity>
      </>
    );
  }
  return <Text>Loading...</Text>;
};


DashboardInternals.propTypes = {
  currentPosition: obj,
  isRecording: bool,
  toggleRecord: func,
};

DashboardInternals.defaultProps = {
  currentPosition: {},
  isRecording: false,
  toggleRecord: () => { },
};

export default DashboardInternals;
