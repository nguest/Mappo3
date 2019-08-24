import React, { PureComponent } from 'react';
import { bool, object } from 'prop-types';
import { View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import MapView from '../../components/MapView';
import Dashboard from '../../components/Dashboard';
import PositionManagerBG from '../../components/PositionManagerBG';

import s from '../../styles';
import { clearAsyncStorage, saveNewTrack, updateSavedTrack } from '../../helpers/storageManager';
import { decorateTrack, simplifyPosition, filterPoint } from '../../helpers/pointsManager';

class HomeScreen extends PureComponent {
  state = {
    currentPosition: null,
    currentTrack: [],
    isRecording: false,
  }

  onChangePosition = (position) => {
    if (!this.props.isFocused) return;
    if (this.state.isRecording) this.saveTrack(position);

    this.setState((prevState) => {
      const simplifiedPosition = simplifyPosition(position);
      let filteredPosition = simplifiedPosition;
      if (prevState.currentTrack.length) {
        filteredPosition = filterPoint(
          simplifiedPosition,
          prevState.currentTrack[prevState.currentTrack.length - 1],
        );
      }
      const currentTrack = prevState.isRecording && filteredPosition
        ? [...prevState.currentTrack, filteredPosition]
        : prevState.currentTrack;

      return {
        currentPosition: position,
        currentTrack,
      };
    });
  };

  onCompleteCurrentTrack = () => {
    console.log('finished!');
    const { currentTrack, currentTrackId } = this.state;
    const decoratedTrack = decorateTrack({ track: currentTrack });
    updateSavedTrack({ id: currentTrackId, track: decoratedTrack });
    this.props.navigation.navigate('SingleTrack', { track: decoratedTrack });
    this.setState({ currentTrack: [], currentTrackId: null });
  }

  onToggleRecord = () => {
    this.setState((prevState) => {
      let newTrackId = prevState.currentTrackId;
      if (!prevState.currentTrackId) {
        newTrackId = saveNewTrack({
          initialPosition: simplifyPosition(prevState.currentPosition),
        });
      }
      return {
        currentTrackId: newTrackId,
        isRecording: !prevState.isRecording,
      };
    });
  }

  resetTrack = () => {
    this.setState({
      currentTrack: [],
      currentTrackId: null,
    });
  }

  saveTrack = (position) => {
    const { currentTrack, currentTrackId } = this.state;
    if (currentTrack.length % 5 === 0) {
      updateSavedTrack({
        id: currentTrackId,
        track: { id: currentTrackId, data: [...currentTrack, position] },
      });
    }
  }

  render() {

    //clearAsyncStorage()
    const { currentPosition, currentTrack, isRecording } = this.state;
    console.log({ ct: this.state.currentTrack });

    return (
      <View style={[s.align.vCenter, s.align.hCenter]}>
        <MapView
          centerCoordinate={currentPosition
            && [currentPosition.coords.longitude, currentPosition.coords.latitude]}
          currentTrack={currentTrack}
          dynamic={true}
          isRecording={isRecording}
        />
        <Dashboard
          currentPosition={currentPosition}
          currentTrack={currentTrack}
          onCompleteCurrentTrack={this.onCompleteCurrentTrack}
          isRecording={isRecording}
          onResetTrack={this.resetTrack}
          onToggleRecord={this.onToggleRecord}
        />
        <PositionManagerBG onChangePosition={this.onChangePosition} />
      </View>
    );
  }
}

HomeScreen.propTypes = {
  isFocused: bool.isRequired,
  navigation: object.isRequired,
};

export default withNavigationFocus(HomeScreen);
