import { StyleSheet } from 'react-native';
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
    height: 500,
    width: 300,
  },
});

export default styles;
