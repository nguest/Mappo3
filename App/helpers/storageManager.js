import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'uuid';

const storeData = async ({ id, data }) => {
  try {
    await AsyncStorage.setItem(id, JSON.stringify(data));
  } catch (e) {
    console.warn('error saving!', e);
  }
};

export const saveNewTrack = ({ initialPosition }) => {
  const id = uuid.v4();
  storeData({ id, data: initialPosition });
  return id;
};

export const saveNewPointToTrack = ({ id, data }) => {
  storeData({ id, data });
};

export const getTrack = async ({ id }) => {
  try {
    const track = await AsyncStorage.getItem(id);
    //console.log({ track })
    if (track !== null) return track;
    //return null;
  } catch (e) {
    console.warn('error getting!', e);
  }
};

// export const getAllTracks = () => {
//   return getAllStorageKeys()
//     .then((keys) => {
//       console.log({keys})
//       return keys.map((id) => {
//         return getTrack({ id }).then((t) => {
//           //console.log(t);
//           return t;
//         })
//       });
//     })
//     .then((tracks) => {
//       console.log({ tracks })
//       return tracks;
//     });
// };

export const getAllTracks = async () => {
  const keys = await getAllStorageKeys();
  const tracks = await keys.map(async (id) => {
    const track = await getTrack({ id });
    return track;
  });
  console.log({ gettracks: tracks })
  return tracks;
};

export const getAllStorageKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch(e) {
    console.warn('error getting all', e);
  }

  return keys;
};

