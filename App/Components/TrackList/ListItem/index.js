import React from 'react';
import { func, object } from 'prop-types';
import { format } from 'date-fns';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './styles';

const ListItem = ({ item, removeItem }) => {
  const {
    data, id, elapsedTime, startToEndDistance,
  } = item;
  console.log({ item })

  return (
    <View style={styles.item}>
      <Text>
        { format(data[0].ts, 'ddd DD/MM/YYYY HH:mm') }
      </Text>
      <Text>
        { `${elapsedTime} s` }
      </Text>
      <Text>
        { `${startToEndDistance && startToEndDistance.toFixed(1)} km` }
      </Text>
      <TouchableOpacity
        onPress={() => removeItem({ id })}
        style={styles.button}
      >
        <Text>DEL</Text>
      </TouchableOpacity>
    </View>
  );
};

ListItem.propTypes = {
  item: object.isRequired,
  removeItem: func.isRequired,
};

export default ListItem;
