import { StyleSheet } from 'react-native';
import s from '../../../styles';

const styles = StyleSheet.create({
  item: {
    //...s.align.vCenter,
    ...s.align.hCenter,
    backgroundColor: '#46fd89',
    borderWidth: 1,
    borderColor: '#dddddd',
    flex: 1,
    flexDirection: 'row',
    height: 40,
  },

});

export default styles;
