import { StyleSheet } from 'react-native';
import s from '../../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
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
