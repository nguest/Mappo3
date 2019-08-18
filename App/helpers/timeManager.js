import { differenceInSeconds } from 'date-fns';

export const getElapsedTime = (currentTrack) => {
  if (!currentTrack || !currentTrack.length) return 0;
  return differenceInSeconds(new Date(), new Date(currentTrack[0].ts))
};