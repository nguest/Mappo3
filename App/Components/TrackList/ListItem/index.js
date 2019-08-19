import React from 'react';
import { object } from 'prop-types';
import { format } from 'date-fns';
import {
  Text,
  View,
} from 'react-native';
import styles from './styles';


const ListItem = ({ item }) => {
  console.log({ item })
  return (
    <View style={styles.item}>
      <Text>
        { format(item.ts, 'ddd DD/MM/YYYY HH:mm') }
      </Text>
    </View>
  );
};

ListItem.propTypes = {
  item: object.isRequired,
};

export default ListItem;
