export const simplifyPosition = (point) => {
  return [point.coords.longitude, point.coords.latitude, point.coords.altitude];
};

export const filterPoint = (currPoint, prevPoint) => {
  return currPoint;
}