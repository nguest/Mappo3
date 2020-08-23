import { distance, point } from "@turf/turf";
import { differenceInSeconds, addMonths } from "date-fns";

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
    !point1 ||
    !point2 ||
    (point1.lon === point2.lon && point1.lat === point2.lat)
  )
    return 0;

  const from = point([point1.lon, point1.lat]);
  const to = point([point2.lon, point2.lat]);
  const options = { units: "kilometers" };
  return distance(from, to, options);
};

export const totalDistance = (track) =>
  track.reduce((total, p, idx, src) => {
    if (src[idx + 1]) {
      return total + distanceBetweenPoints(p, src[idx + 1]);
    }
    return total;
  }, 0);

export const filterPoint = (currPoint, prevPoint) => {
  if (!prevPoint || currPoint.alt > limits.MAX_ALTITUDE) return null;
  const elapsedTime = differenceInSeconds(currPoint.ts, prevPoint.ts);
  const elapsedDistance = distanceBetweenPoints(currPoint, prevPoint);
  const velocity = elapsedDistance / (elapsedTime / 3600);
  console.log({ elapsedTime, elapsedDistance, velocity });
  if (Math.abs(velocity) > limits.MAX_SPEED) return null;
  return currPoint;
};

export const decorateTrack = ({ track }) => {
  const decoratedTrack = { data: track };
  const totalPoints = track.length;
  const elapsedTime = differenceInSeconds(
    track[totalPoints - 1].ts,
    track[0].ts
  );
  const startEndDistance = distanceBetweenPoints(
    track[0],
    track[totalPoints - 1]
  );
  decoratedTrack.elapsedTime = elapsedTime;
  decoratedTrack.startEndDistance = startEndDistance;
  decoratedTrack.totalDistance = totalDistance(track);
  decoratedTrack.date = track[0].ts; // format to: "Mon, 02 Jan 2006 15:04:05 -0700"
  decoratedTrack.isComplete = true;
  return decoratedTrack;
};
