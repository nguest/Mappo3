import React from 'react';
import { array, func, object } from 'prop-types';
import {
  FlatList,
  View,
} from 'react-native';

import ListItem from './ListItem';

import styles from './styles';

const TrackList = ({ navigation, tracks, removeTrack }) => (
  <View style={styles.list}>
    <FlatList
      data={tracks}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <ListItem
          item={item}
          onPressItem={({ id }) => navigation.navigate('SingleTrack', { name: 'hello', id })}
          removeItem={removeTrack}
        />
      )}
    />
  </View>
);

TrackList.propTypes = {
  navigation: object.isRequired,
  removeTrack: func.isRequired,
  tracks: array.isRequired,
};

export default TrackList;
