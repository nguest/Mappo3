import { Dimensions, StyleSheet } from 'react-native';
import s from '../../styles';

const { height, width } = Dimensions.get('window');

const dashboardMargin = 6;

const styles = StyleSheet.create({
  dashboard: {
    position: 'absolute',
    top: 0,
    left: dashboardMargin,
    borderWidth: 2,
    borderStyle: 'solid',
    width: width - dashboardMargin * 2,
    height: height - 52,
    justifyContent: 'space-between',
    borderColor: 'red',
  },
});

export default styles;
