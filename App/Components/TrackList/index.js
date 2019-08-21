import React from 'react';
import { array, func, object } from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

import ListItem from './ListItem';

import styles from './styles';

const TrackList = ({ navigation, tracks, removeTrack }) => (
  <View style={styles.list}>
    { console.log({tracks})}
    <SwipeListView
      data={tracks}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <ListItem
          item={item}
          onPressItem={({ id }) => navigation.navigate(
            'SingleTrack',
            { track: tracks.find((track) => track.id === id) },
          )}
          removeItem={removeTrack}
        />
      )}
      renderHiddenItem={(data) => {
        const { id } = data.item;
        return (
          <View style={styles.rowUnderlay}>
            <Text>Noop</Text>
            <TouchableOpacity
              onPress={() => removeTrack({ id })}
              style={styles.button}
            >
              <Text>DEL</Text>
            </TouchableOpacity>
          </View>
        );
      }}
      leftOpenValue={75}
      rightOpenValue={-75}
      swipeToOpenPercent={150}
      closeOnRowPress
    />
  </View>
);

TrackList.propTypes = {
  navigation: object.isRequired,
  removeTrack: func.isRequired,
  tracks: array.isRequired,
};

export default TrackList;
