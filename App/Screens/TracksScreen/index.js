import React, { useEffect, useRef, useState } from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import TrackList from '../../components/TrackList';
import { getAllTracks, removeTrack as removeStoredTrack } from '../../helpers/storageManager';
import s from '../../styles';


const TracksScreen = ({ isFocused, navigation }) => {
  //const didMountRef = useRef(false);
  console.log({ isFocused })
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (isFocused) {
      getAllTracks()
        .then((items) => {
          Promise.all(items)
            .then((resolvedItems) => {
              setTracks(resolvedItems);
            });
        });
    }
  }, [isFocused]);

  const removeTrack = ({ id }) => {
    const newTracks = tracks.filter((track) => (track.id !== id));
    setTracks(newTracks);
    removeStoredTrack({ id });
  };


  return (
    <SafeAreaView style={[s.align.vCenter, s.align.hCenter]}>
      <Text>Tracks Screen</Text>
      <TrackList navigation={navigation} tracks={tracks} removeTrack={removeTrack} />
    </SafeAreaView>
  );
}

export default withNavigationFocus(TracksScreen);
