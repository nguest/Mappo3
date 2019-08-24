import React from 'react';
import { func, object } from 'prop-types';
import { format } from 'date-fns';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { secondsToHHMMSS } from '../../../helpers/timeManager';

import styles from './styles';

const ListItem = ({ item, onPressItem }) => {
  const {
    data, id, elapsedTime, startEndDistance, date,
  } = item;

  return (
    <TouchableHighlight style={styles.container} onPress={() => onPressItem({ id })}>
      <View style={styles.item}>
        <Text>
          { format(date, 'ddd DD/MM/YYYY HH:mm') }
        </Text>
        <Text>
          { `${secondsToHHMMSS(elapsedTime)}` }
        </Text>
        <Text>
          { `${startEndDistance && startEndDistance.toFixed(1)} km` }
        </Text>
      </View>
    </TouchableHighlight>
  );
};

ListItem.propTypes = {
  item: object.isRequired,
  onPressItem: func.isRequired,
};

export default ListItem;
