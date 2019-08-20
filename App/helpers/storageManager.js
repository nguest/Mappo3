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
  storeData({ id, data: [initialPosition] });
  return id;
};

export const updateSavedTrack = ({ id, track }) => {
  console.log('update', { track, id })
  storeData({ id, data: { ...track, id } });
};

export const getTrack = async ({ id }) => {
  try {
    const track = await AsyncStorage.getItem(id);
    if (track !== null) return track;
    return null;
  } catch (e) {
    console.warn('error getting!', e);
  }
};

export const removeTrack = async ({ id }) => {
  try {
    await AsyncStorage.removeItem(id);
    return null;
  } catch (e) {
    console.warn('error removing!', e);
  }
};

export const getAllStorageKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (e) {
    console.warn('error getting all', e);
  }

  return keys;
};

export const getAllTracks = async () => {
  const keys = await getAllStorageKeys();
  const tracks = await keys.map((id) => getTrack({ id }));
  return tracks;
};

export const clearAsyncStorage = async () => {
  AsyncStorage.clear();
};
