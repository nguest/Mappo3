import React, { PureComponent } from 'react';
import { View } from 'react-native';
import MapView from '../../components/MapView';
import Dashboard from '../../components/Dashboard';
import PositionManager from '../../components/PositionManager';

import s from '../../styles';

export default class HomeScreen extends PureComponent {
  state = {
    currentPosition: {},
  }

  getCurrentPosition = (position) => {
    console.log({ homescreen: position })
    this.setState({ currentPosition: position })
  }

  render() {
    return (
      <View style={[s.align.vCenter, s.align.hCenter]}>
        <MapView currentPosition={this.state.currentPosition} />
        <Dashboard currentPosition={this.state.currentPosition} />
        <PositionManager getCurrentPosition={this.getCurrentPosition}/>
      </View>
    );
  }
}
