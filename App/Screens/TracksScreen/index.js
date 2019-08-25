import React, { useEffect, useState } from 'react';
import { bool, object } from 'prop-types';
import { SafeAreaView, Text } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import TrackList from '../../components/TrackList';
import { getAllTracks, removeTrack as removeStoredTrack } from '../../helpers/storageManager';

import s from '../../styles';

const TracksScreen = ({ isFocused, navigation }) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (isFocused) {
      getAllTracks()
        .then((items) => {
          Promise.all(items)
            .then((resolvedItems) => {
              const completedTracks = resolvedItems
                .map((item) => JSON.parse(item))
                .filter((item) => item.isComplete)
                .sort((a, b) => new Date(b.date) - new Date(a.date));
              setTracks(completedTracks);
            });
        });
    }
  }, [isFocused]);

  const removeTrack = ({ id }) => {
    const newTracks = tracks.filter((track) => (track.id !== id));
    setTracks(newTracks);
    removeStoredTrack({ id });
  };

  const renderTrackList = () => {
    if (tracks.length) {
      return <TrackList navigation={navigation} tracks={tracks} removeTrack={removeTrack} />;
    }
    return <Text>You have no saved tracks!</Text>;
  };

  return (
    <SafeAreaView style={[s.align.vCenter, s.align.hCenter]}>
      { renderTrackList() }
    </SafeAreaView>
  );
};

TracksScreen.propTypes = {
  isFocused: bool.isRequired,
  navigation: object.isRequired,
};

export default withNavigationFocus(TracksScreen);
