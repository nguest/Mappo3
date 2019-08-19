import React, { useRef, useState } from 'react';
import { View, Text } from 'react-native';
import TrackList from '../../components/TrackList';
import { getAllTracks } from '../../helpers/storageManager';
import s from '../../styles';

const TracksScreen = () => {
  const didMountRef = useRef(false);

  const [tracks, setTracks] = useState([]);

  if (!didMountRef.current) {
    getAllTracks()
      .then((items) => {
        Promise.all(items)
          .then((resolvedItems) => setTracks(resolvedItems));
      });
    didMountRef.current = true;
  }

  return (
    <View style={[s.align.vCenter, s.align.hCenter]}>
      <Text>Tracks Screen</Text>
      <TrackList tracks={tracks} />
    </View>
  );
}

export default TracksScreen;
