import { Dimensions, StyleSheet } from 'react-native';
import s from '../../styles';

const styles = StyleSheet.create({
  page: {
    ...s.align.vCenter,
    ...s.align.hCenter,
    backgroundColor: '#46fd89',
  },

  container: {
    ...s.align.vCenter,
    ...s.align.hCenter,
  },

  map: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});

export default styles;
