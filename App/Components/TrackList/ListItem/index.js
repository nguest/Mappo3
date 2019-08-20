import React from 'react';
import { array } from 'prop-types';
import { format } from 'date-fns';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './styles';

const ListItem = ({ data, id, removeItem }) => (
  <View style={styles.item}>
    <Text>
      { format(data[0].ts, 'ddd DD/MM/YYYY HH:mm') }
    </Text>
    <TouchableOpacity onPress={() => removeItem({id})}>
      <Text>DEL</Text>
    </TouchableOpacity>
  </View>
);

ListItem.propTypes = {
  item: array.isRequired,
};

export default ListItem;
