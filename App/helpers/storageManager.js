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
    if (track !== null) return track;
    return null;
  } catch (e) {
    console.warn('error saving!', e);
  }
};
