import React from 'react';
import { object } from 'prop-types';
import { Button, View, Text } from 'react-native';
import { format } from 'date-fns';
import { readFiles } from '../../helpers/fileManager';

import ShareButton from '../../components/ShareButton';
import MapView from '../../components/MapView';

import s from '../../styles';

const SingleTrackScreen = ({
  navigation,
}) => {
  const track = navigation.getParam('track', null);
  const rf = readFiles();
  return (
    <View style={[s.align.vCenter, s.align.hCenter]}>
      <ShareButton />
      <Text>{ `date: ${format(track.date, 'ddd DD/MM/YYYY')}` }</Text>
      <Text>{ `duration: ${track.elapsedTime} s` }</Text>
      <Text>{ `distance: ${track.startEndDistance.toFixed(1)} km` }</Text>
      <Text>{ `start: ${format(track.data[0].ts, 'HH:mm')}` }</Text>
      <Text>{ `end: ${format(track.data[track.data.length - 1].ts, 'HH:mm')}` }</Text>
      <MapView
        centerCoordinate={[track.data[0].lon, track.data[0].lat]}
        currentTrack={track.data}
        dynamic={false}
        isRecording={false}
        zoomLevel={12}
      />
    </View>
  );
};

SingleTrackScreen.propTypes = {
  navigation: object.isRequired,
};

export default SingleTrackScreen;
