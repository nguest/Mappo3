import { distance, point } from '@turf/turf';
import { differenceInSeconds } from 'date-fns';


export const limits = {
  MAX_SPEED: 200,
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
  console.log({ d: distance(from, to, options) })
  return distance(from, to, options);
};


export const filterPoint = (currPoint, prevPoint) => {
  if (!prevPoint) return null;
  const elapsedTime = differenceInSeconds(currPoint.ts, prevPoint.ts);
  const elapsedDistance = distanceBetweenPoints(currPoint, prevPoint);
  const velocity = elapsedDistance / (elapsedTime / 3600);
  if (velocity > limits.MAX_SPEED) return null;
  return currPoint;
};
