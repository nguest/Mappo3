import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
} from 'react-native';

import ListItem from './ListItem';

const renderTracks = (tracks) => (
  <FlatList
    data={tracks}
    renderItem={({ item, idx }) => <ListItem key={idx} item={JSON.parse(item)} />}
  />
);

const TrackList = ({ tracks }) => {
  return (
    <View styles={{flex:1}}>
      { renderTracks(tracks) }
    </View>
  );
};

export default TrackList;
