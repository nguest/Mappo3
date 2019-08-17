import React, { PureComponent } from 'react';
import { View } from 'react-native';
import MapView from '../../components/MapView';
import Dashboard from '../../components/Dashboard';
import PositionManager from '../../components/PositionManager';

import s from '../../styles';
import { saveNewTrack, getTrack, updateTrack } from '../../helpers/storageManager';

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
      currentTrack: prevState.isRecording ? [...prevState.currentTrack, position] : prevState.currentTrack,
    }));
  };

  onToggleRecord = () => {
    console.log('{ toggle }')
    this.setState((prevState) => {
      let currentTrack;
      let currentTrackId = prevState.currentTrackId;
      if (!prevState.isRecording) {
        if (!currentTrackId) {
          currentTrackId = saveNewTrack({
            initialPosition: this.state.currentPosition,
          });
          currentTrack = [this.state.currentPosition]
        } else {
          currentTrack = [...prevState.currentTrack, this.state.currentPosition]
          if (currentTrack.length % 10 === 0)
            updateTrack({id: prevState.currentTrackId, data: currentTrack})
        }
      }

      return {
        isRecording: !prevState.isRecording,
        currentTrack,
        currentTrackId,
      }
    });
  }


  recordPosition = (position) => {
    // save position

  }

  render() {
    const { currentPosition, isRecording } = this.state;
    console.log({currentTrack: this.state.currentTrack})

    const storedTrack = getTrack({ id: this.state.currentTrackId })
    console.log({ storedTrack })

    //console.log({id: this.state.currentTrackId })
    return (
      <View style={[s.align.vCenter, s.align.hCenter]}>
        <MapView 
          currentPosition={currentPosition}
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