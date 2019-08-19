import {
  Alert,
} from 'react-native';

const recordingAlert = ({ onFinishCurrentTrack }) => (
  Alert.alert(
    'Recording Stopped',
    'Do you want to save or continue?',
    [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('Cancel Pressed');
        },
        style: 'cancel',
      },
      {
        text: 'Finish',
        onPress: () => {
          console.log('Finish');
          onFinishCurrentTrack(false);
        },
      },
    ],
  )
);

export default recordingAlert;
