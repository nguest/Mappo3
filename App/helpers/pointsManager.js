import { distance, point } from '@turf/turf';
import { differenceInSeconds } from 'date-fns';

export const limits = {
  MAX_SPEED: 200,
  MAX_ALTITUDE: 5000,
};

export const simplifyPosition = (position) => ({
  lon: position.coords.longitude,
  lat: position.coords.latitude,
  alt: position.coords.altitude,
  ts: position.timestamp,
});

export const distanceBetweenPoints = (point1, point2) => {
  if (
    (!point1 || !point2)
    || (point1.lon === point2.lon && point1.lat === point2.lat)
  ) return 0;

  const from = point([point1.lon, point1.lat]);
  const to = point([point2.lon, point2.lat]);
  const options = { units: 'kilometers' };
  return distance(from, to, options);
};


export const filterPoint = (currPoint, prevPoint) => {
  if (!prevPoint || currPoint.alt > limits.MAX_ALTITUDE) return null;
  const elapsedTime = differenceInSeconds(currPoint.ts, prevPoint.ts);
  const elapsedDistance = distanceBetweenPoints(currPoint, prevPoint);
  const velocity = elapsedDistance / (elapsedTime / 3600);
  if (velocity > limits.MAX_SPEED) return null;
  return currPoint;
};

export const decorateTrack = ({ track }) => {
  const decoratedTrack = { data: track };
  const totalPoints = track.length;
  const elapsedTime = differenceInSeconds(track[0].ts, track[totalPoints - 1].ts);
  const startEndDistance = distanceBetweenPoints(track[0], track[totalPoints - 1]);
  decoratedTrack.elapsedTime = elapsedTime;
  decoratedTrack.startEndDistance = startEndDistance;
  console.log({decoratedTrack})
  return decoratedTrack;
};
