import React from 'react';
import { object } from 'prop-types';
import { View, Text } from 'react-native';
import { format } from 'date-fns';

import ShareButton from '../../components/ShareButton';
import MapView from '../../components/MapView';
import { convertTrackToGPX, convertTrackToIGC } from '../../helpers/fileManager';
import { secondsToHHMMSS } from '../../helpers/timeManager';


import s from '../../styles';

const SingleTrackScreen = ({
  navigation,
}) => {
  const track = navigation.getParam('track', null);
  //console.log({ track })
  
  console.log(track)

  return (
    <View style={[s.align.vCenter, s.align.hCenter]}>
      <ShareButton
        fileName={`${format(track.date, 'DDMMYYYY-HHmm')}.gpx`}
        itemToShare={convertTrackToGPX({ track })}
      />
      <Text>{ `date: ${format(track.date, 'ddd DD/MM/YYYY')}` }</Text>
      <Text>{ `duration: ${secondsToHHMMSS(track.elapsedTime)}` }</Text>
      <Text>{ `startEndDistance: ${track.startEndDistance.toFixed(1)} km` }</Text>
      <Text>{ `totalDistance: ${track.totalDistance && track.totalDistance.toFixed(1)} km` }</Text>
      <Text>{ `start: ${format(track.data[0].ts, 'HH:mm')}` }</Text>
      <Text>{ `end: ${format(track.data[track.data.length - 1].ts, 'HH:mm')}` }</Text>
      <Text>{ `pointscount: ${track.data.length}` }</Text>
      <MapView
        centerCoordinate={[track.data[0].lon, track.data[0].lat]}
        currentTrack={track.data}
        isDynamic={false}
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
