import React, { PureComponent } from 'react';
import { View } from 'react-native';
import MapView from '../../components/MapView';
import Dashboard from '../../components/Dashboard';
import PositionManager from '../../components/PositionManager';

import s from '../../styles';
import { saveNewTrack, getTrack, saveNewPointTotTrack } from '../../helpers/storageManager';
import { simplifyPosition } from '../../helpers/pointsManager';

export default class HomeScreen extends PureComponent {
  state = {
    currentPosition: null,
    currentTrack: [],
    isRecording: false,
  }

  onChangePosition = (position) => {
    console.log({ homescreen: position })
    this.setState(prevState => ({ 
      currentPosition: position,
      currentTrack: prevState.isRecording 
        ? [...prevState.currentTrack, simplifyPosition(position)]
        : prevState.currentTrack,
    }));
  };

  onToggleRecord = () => {
    this.setState((prevState) => {
      if (!prevState.currentTrackId) {
        currentTrackId = saveNewTrack({
          initialPosition: simplifyPosition(this.state.currentPosition),
        });
      }
      return {
        currentTrackId,
        isRecording: !prevState.isRecording,
      }
    });
  }


  recordPosition = (position) => {
    // save position
  }

  render() {
    const { currentPosition, currentTrack, isRecording } = this.state;
    console.log({currentTrack: this.state.currentTrack})

    const storedTrack = getTrack({ id: this.state.currentTrackId })
    console.log({ storedTrack })

    return (
      <View style={[s.align.vCenter, s.align.hCenter]}>
        <MapView
          currentTrack={currentTrack}/>
        <Dashboard
          currentPosition={currentPosition}
          isRecording={isRecording}
          onToggleRecord={this.onToggleRecord} />
        <PositionManager onChangePosition={this.onChangePosition}/>
      </View>
    );
  }
}