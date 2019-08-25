import { Dimensions, StyleSheet } from 'react-native';

import s from '../../../styles';

const { height, width } = Dimensions.get('window');

const DASH_MARGIN = 6;

const SHDW_DIMS  = {
  height: 1,
  width: 0
}

const boxShadow = {
  shadowColor: "#000000",
  shadowOpacity: 0.4,
  shadowRadius: 5,
  shadowOffset: SHDW_DIMS,
}

const styles = StyleSheet.create({
  topContainer: {
    position: 'absolute',
    width: width - DASH_MARGIN * 2,
    top: DASH_MARGIN + 20,
    //...s.align.hCenter,
    //backgroundColor: '#46fd89',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
  },

  bottomContainer: {
    position: 'absolute',
    // ...s.align.vCenter,
    ...s.align.hCenter,
    backgroundColor: s.colors.bg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    width: width - DASH_MARGIN * 2,
    bottom: 0,
    paddingLeft: 6,
    paddingRight: 6,
    ...boxShadow,
  },

  dataBox: {
    ...s.align.hCenter,
    flexDirection: 'row',
    flex: 0,
    backgroundColor: s.colors.bg,
    paddingLeft: 6,
    paddingRight: 6,
    ...boxShadow,
  },

  recordButton: {
    padding: 10,
    backgroundColor: '#46ff89',
  },

  resetButton: {
    padding: 10,
    backgroundColor: '#dddddd',
  },

  container: {
    ...s.align.vCenter,
    ...s.align.hCenter,
  },
});

export default styles;
