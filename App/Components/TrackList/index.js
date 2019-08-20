import React from 'react';
import { array, func } from 'prop-types';
import {
  FlatList,
  View,
} from 'react-native';

import ListItem from './ListItem';

import styles from './styles';

const TrackList = ({ tracks, removeTrack }) => (
  <View style={styles.list}>
    <FlatList
      data={tracks}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <ListItem item={item} removeItem={removeTrack} />
      )}
    />
  </View>
);

TrackList.propTypes = {
  removeTrack: func.isRequired,
  tracks: array.isRequired,
};

export default TrackList;
