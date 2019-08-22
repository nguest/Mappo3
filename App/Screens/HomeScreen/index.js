import React, { PureComponent } from 'react';
import { View } from 'react-native';
import MapView from '../../components/MapView';
import Dashboard from '../../components/Dashboard';
import PositionManager from '../../components/PositionManager';

import s from '../../styles';
import { clearAsyncStorage, saveNewTrack, updateSavedTrack } from '../../helpers/storageManager';
import { decorateTrack, simplifyPosition, filterPoint } from '../../helpers/pointsManager';

export default class HomeScreen extends PureComponent {
  state = {
    currentPosition: null,
    currentTrack: [],
    isRecording: false,
  }

  onChangePosition = (position) => {
    if (this.state.isRecording) this.saveTrack(position)

    this.setState(prevState => {
      const simplifiedPosition = simplifyPosition(position);
      let filteredPosition = simplifiedPosition;
      if (prevState.currentTrack.length)
        filteredPosition = filterPoint(simplifiedPosition, prevState.currentTrack[prevState.currentTrack.length - 1])

      const currentTrack = prevState.isRecording && filteredPosition
        ? [...prevState.currentTrack, filteredPosition]
        : prevState.currentTrack;

      return {
        currentPosition: position,
        currentTrack,
      }
    });
  };

  onFinishCurrentTrack = () => {
    console.log('finished!');
    const { currentTrack, currentTrackId } = this.state;
    updateSavedTrack({ id: currentTrackId, track: decorateTrack({ track: currentTrack }) })
    this.props.navigation.navigate('SingleTrack', { id: currentTrackId })
    this.setState({ currentTrack: [], currentTrackId: null })
  }

  onToggleRecord = () => {
    this.setState((prevState) => {
      if (!prevState.currentTrackId) {
        currentTrackId = saveNewTrack({
          initialPosition: simplifyPosition(prevState.currentPosition),
        });
      }
      return {
        currentTrackId,
        isRecording: !prevState.isRecording,
      }
    });
  }

  saveTrack = (position) => {
    if (this.state.currentTrack.length % 5 === 0) {
      updateSavedTrack({ id: currentTrackId, track: { id: currentTrackId, data: [...this.state.currentTrack, position] }})
    }
  }

  render() {
    //clearAsyncStorage()
    const { currentPosition, currentTrack, isRecording } = this.state;
    console.log({ currentTrack: this.state.currentTrack })

    return (
      <View style={[s.align.vCenter, s.align.hCenter]}>
        <MapView
          centerCoordinate={currentPosition && [currentPosition.coords.longitude, currentPosition.coords.latitude]}
          currentTrack={currentTrack}
          isRecording={isRecording}
        />
        <Dashboard
          currentPosition={currentPosition}
          currentTrack={currentTrack}
          onFinishCurrentTrack={this.onFinishCurrentTrack}
          isRecording={isRecording}
          onToggleRecord={this.onToggleRecord} />
        <PositionManager onChangePosition={this.onChangePosition}/>
      </View>
    );
  }
}