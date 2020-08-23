import { StyleSheet } from 'react-native';
import s from '../../styles';

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#ffeeee',
    borderWidth: 1,
    borderColor: '#dddddd',
    flex: 1,
    width: '100%',
  },
  rowUnderlay: {
    backgroundColor: s.colors.danger,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
});

export default styles;
