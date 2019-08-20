import { StyleSheet } from 'react-native';
import s from '../../../styles';

const styles = StyleSheet.create({
  item: {
    ...s.align.hCenter,
    backgroundColor: '#46fd89',
    borderWidth: 1,
    borderColor: '#dddddd',
    flex: 1,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
  },

});

export default styles;
