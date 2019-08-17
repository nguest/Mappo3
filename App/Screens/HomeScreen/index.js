import React, { PureComponent } from 'react';
import { View } from 'react-native';
import MapView from '../../components/MapView';
import Dashboard from '../../components/Dashboard';

import s from '../../styles';

export default class HomeScreen extends PureComponent {
  render() {
    return (
      <View style={[s.align.vCenter, s.align.hCenter]}>
        <MapView />
        <Dashboard />
      </View>
    );
  }
}
