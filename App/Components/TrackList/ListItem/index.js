import React from 'react';
import { func, string } from 'prop-types';
import { format } from 'date-fns';
import {
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';

import styles from './styles';

const ListItem = ({ item, onPressItem, removeItem }) => {
  const {
    data, id, elapsedTime, startEndDistance,
  } = JSON.parse(item);

  return (
    <TouchableHighlight style={styles.item} onPress={() => onPressItem({ id })}>
      <View>
        <Text>
          { format(data[0].ts, 'ddd DD/MM/YYYY HH:mm') }
        </Text>
        <Text>
          { `${elapsedTime} s` }
        </Text>
        <Text>
          { `${startEndDistance && startEndDistance.toFixed(1)} km` }
        </Text>
        <TouchableOpacity
          onPress={() => removeItem({ id })}
          style={styles.button}
        >
          <Text>DEL</Text>
        </TouchableOpacity>
      </View>
    </TouchableHighlight>
  );
};

ListItem.propTypes = {
  item: string.isRequired,
  onPressItem: func.isRequired,
  removeItem: func.isRequired,
};

export default ListItem;
