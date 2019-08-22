import {
  Alert,
} from 'react-native';

const recordingAlert = ({ currentTrack, onCompleteCurrentTrack }) => {
  const buttonArray = [
    {
      text: 'Cancel',
      onPress: () => {
        console.log('Cancel Pressed');
      },
      style: 'cancel',
    },
  ];
  if (currentTrack.length > 2) {
    buttonArray.push({
      text: 'Finish',
      onPress: () => {
        console.log('Finish');
        onCompleteCurrentTrack(false);
      },
    });
  }

  return Alert.alert(
    'Recording Stopped',
    currentTrack.length < 2 ? 'You haven\'t recorded any points' : 'Do you want to save or continue?',
    buttonArray,
  );
};

export default recordingAlert;
