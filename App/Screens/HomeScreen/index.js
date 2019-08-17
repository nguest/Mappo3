import React, { PureComponent } from 'react';
import { View } from 'react-native';
import MapView from '../../components/MapView';
import Dashboard from '../../components/Dashboard';
import PositionManager from '../../components/PositionManager';

import s from '../../styles';

export default class HomeScreen extends PureComponent {
  state = {
    currentPosition: {},
    isRecording: false,
  }

  getCurrentPosition = (position) => {
    console.log({ homescreen: position })
    this.setState({ currentPosition: position })
  }

  toggleRecord = () => {
    this.setState(prevState = {
      isRecording: !prevState.isRecording,
    }, () => {
      if (this.state.isRecording) {
        this.recordPosition(this.state.currentPosition);
      }
    })
  }

  recordPosition = (position) => {
    // save position
  }

  render() {
    const { currentPosition, isRecording } = this.state;
    return (
      <View style={[s.align.vCenter, s.align.hCenter]}>
        <MapView currentPosition={currentPosition} />
        <Dashboard
          currentPosition={currentPosition}
          isRecording={isRecording}
          toggleRecord={this.toggleRecord} />
        <PositionManager getCurrentPosition={this.getCurrentPosition}/>
      </View>
    );
  }
}
