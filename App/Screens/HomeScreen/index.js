import React, { PureComponent } from 'react';
import { View } from 'react-native';
import MapView from '../../components/MapView';
import Dashboard from '../../components/Dashboard';
import PositionManager from '../../components/PositionManager';

import s from '../../styles';
import { saveNewTrack, getTrack, saveNewPointTotTrack } from '../../helpers/storageManager';
import { simplifyPosition, filterPoint } from '../../helpers/pointsManager';

export default class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: null,
      currentTrack: [],
      isRecording: false,
    }
  }

  onChangePosition = (position) => {
    // console.log({ homescreen: position })

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
    this.setState({ currentTrack: [] })
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

  recordPosition = (position) => {
    // save position
  }

  render() {
    const { currentPosition, currentTrack, isRecording } = this.state;
    console.log({ currentTrack: this.state.currentTrack })

    // const storedTrack = getTrack({ id: this.state.currentTrackId })
    // console.log({ storedTrack })

    return (
      <View style={[s.align.vCenter, s.align.hCenter]}>
        <MapView
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