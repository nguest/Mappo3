import React from 'react';
import { array, func, object } from 'prop-types';
import { Text, TouchableOpacity, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
import ListItem from './ListItem';

import s from '../../styles';
import styles from './styles';

const TrackList = ({ navigation, tracks, removeTrack }) => (
  <View style={styles.list}>
    <SwipeListView
      data={tracks}
      renderItem={({ item }) => (
        <ListItem
          item={item}
          key={item.id}
          onPressItem={({ id }) =>
            navigation.navigate('SingleTrack', {
              track: tracks.find((track) => track.id === id),
            })
          }
          removeItem={removeTrack}
        />
      )}
      renderHiddenItem={(data) => {
        const { id } = data.item;
        return (
          <View style={styles.rowUnderlay}>
            <Text>Noop</Text>
            <TouchableOpacity onPress={() => removeTrack({ id })} style={styles.button}>
              <Icon name="ios-trash" size={24} color={s.colors.bg} />
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
