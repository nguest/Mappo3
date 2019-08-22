import React from 'react';
import { object } from 'prop-types';
import { View, Text } from 'react-native';
import { format } from 'date-fns';

import MapView from '../../components/MapView';

import s from '../../styles';

const SingleTrackScreen = ({
  navigation,
}) => {
  const track = navigation.getParam('track', null);
  return (
    <View style={[s.align.vCenter, s.align.hCenter]}>
      <Text>{ `Date: ${format(track.date, 'ddd DD/MM/YYYY')}` }</Text>
      <Text>{ track.id }</Text>
      <Text>{ `duration: ${track.elapsedTime} s` }</Text>
      <Text>{ `distance: ${track.startEndDistance.toFixed(1)} km` }</Text>
      <Text>{ `start: ${format(track.data[0].ts, 'HH:mm')}` }</Text>
      <Text>{ `end: ${format(track.data[track.data.length - 1].ts, 'HH:mm')}` }</Text>
      <MapView
        centerCoordinate={[track.data[0].lon, track.data[0].lat]}
        currentTrack={track.data}
        isRecording={false}
        static={true}
        zoomLevel={12}
      />
    </View>
  );
};

SingleTrackScreen.propTypes = {
  navigation: object.isRequired,
};

export default SingleTrackScreen;
