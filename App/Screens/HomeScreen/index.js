import React, { useEffect, useState } from 'react';
import { bool, object } from 'prop-types';
import { View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import MapView from '../../components/MapView';
import Dashboard from '../../components/Dashboard';
import PositionManagerBG from '../../components/PositionManagerBG';

import s from '../../styles';
import { clearAsyncStorage, saveNewTrack, updateSavedTrack } from '../../helpers/storageManager';
import { decorateTrack, simplifyPosition, filterPoint } from '../../helpers/pointsManager';

const HomeScreen = ({
  isFocused,
  navigation,
}) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [currentTrack, setCurrentTrack] = useState([]);
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [isRecording, setIsRecording] = useState(false);


  const saveTrack = (position) => {
    if (currentTrack.length % 5 === 0) {
      updateSavedTrack({
        id: currentTrackId,
        track: { id: currentTrackId, data: [...currentTrack, position] },
      });
    }
  };

  const onChangePosition = (position) => {
    if (!isFocused) return;
    if (isRecording) saveTrack(position);

    const simplifiedPosition = simplifyPosition(position);
    let filteredPosition = simplifiedPosition;
    if (currentTrack.length) {
      filteredPosition = filterPoint(
        simplifiedPosition,
        currentTrack[currentTrack.length - 1],
      );
    }
    const theCurrentTrack = isRecording && filteredPosition
      ? [...currentTrack, filteredPosition]
      : currentTrack;

    setCurrentPosition(position);
    setCurrentTrack(theCurrentTrack);
  };

  useEffect(() => {
    if (!isRecording) return;
    let newTrackId = currentTrackId;
    if (!currentTrackId) {
      newTrackId = saveNewTrack({
        initialPosition: simplifyPosition(currentPosition),
      });
    }
    setCurrentTrackId(newTrackId);
  }, [isRecording]);

  const resetTrack = () => {
    setCurrentTrackId(null);
    setCurrentTrack([]);
  };

  const onCompleteCurrentTrack = () => {
    console.log('finished!');
    const decoratedTrack = decorateTrack({ track: currentTrack });
    updateSavedTrack({ id: currentTrackId, track: decoratedTrack });
    navigation.navigate('SingleTrack', { track: decoratedTrack });
    resetTrack();
  };


  //clearAsyncStorage()
  console.log({ currentTrack });

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
        onCompleteCurrentTrack={onCompleteCurrentTrack}
        isRecording={isRecording}
        onResetTrack={resetTrack}
        onToggleRecord={() => setIsRecording((isRecord) => !isRecord)}
      />
      <PositionManagerBG onChangePosition={onChangePosition} />
    </View>
  );
};

HomeScreen.propTypes = {
  isFocused: bool.isRequired,
  navigation: object.isRequired,
};

export default withNavigationFocus(HomeScreen);
