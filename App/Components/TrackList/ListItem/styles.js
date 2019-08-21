import { StyleSheet } from 'react-native';
import s from '../../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#46fd89',
    borderWidth: 1,
    borderColor: '#dddddd',
    padding: 10,
    height: 40,
    width: '100%',
  },
  item: {
    ...s.align.hCenter,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#ff0000',
    color: '#ffffff',
  },
});

export default styles;
