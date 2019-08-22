import { Dimensions, StyleSheet } from 'react-native';
import s from '../../styles';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  dashboard: {
    position: 'absolute',
    top: 30,
    left: 10,
    backgroundColor: s.colors.bg,
    borderWidth: 2,
    borderStyle: 'solid',
    width: width - 20,
  },
});

export default styles;
