import { differenceInSeconds } from 'date-fns';

export const getElapsedTime = (currentTrack) => {
  if (!currentTrack || !currentTrack.length) return 0;
  return differenceInSeconds(new Date(), new Date(currentTrack[0].ts))
};

export const stdTimezoneOffsetInSecs = () => {
  const year = new Date().getFullYear();
  const january = new Date(year, 0, 1);
  const july = new Date(year, 6, 1);
  return Math.max(january.getTimezoneOffset(), july.getTimezoneOffset()) * 60;
};
