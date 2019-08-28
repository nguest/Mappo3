import { 
  limits,
  simplifyPosition,
  distanceBetweenPoints,
  totalDistance,
  filterPoint,
} from './pointsManager';

describe('simplifyPosition', () => {
  it('reduces large position object to essentials', () => {
    const inputPosition = {
      coords: {
        longitude: 12.345, 
        latitude: 678.901,
        altitude: 1111,
        blah: 'noop',
      },
      timestamp: 1566964158137,
      otherstuff: {
        x: '123'
      }
    }
    const expected = {
      lon: 12.345, 
      lat: 678.901,
      alt: 1111,
      ts: 1566964158137,
    }
    expect(simplifyPosition(inputPosition)).toEqual(expected);
  })
})

describe('distanceBetweenPoints', () => {
  it('returns zero if one point is undefined', () => {
    const point1 = {
      lon: 0,
      lat: 0,
    }
    expect(distanceBetweenPoints(point1)).toEqual(0);
  });
  it('calculates correct distance in km between points', () => {
    const point1 = {
      lon: 0,
      lat: 0,
    };
    const point2 = {
      lon: 10,
      lat: 10,
    }
    expect(distanceBetweenPoints(point1, point2)).toEqual(1568.5227233314436);
  })
});

describe('totalDistance', () => {
  it('returns zero if points are the same', () => {
    const track = [
      { lat: 124, lon: 53 },
      { lat: 124, lon: 53 },
      { lat: 124, lon: 53 },
    ];
    expect(totalDistance(track)).toEqual(0);
  });
  it('returns cumulative length of all track segments', () => {
    const track = [
      { lat: 12.3, lon: 56.7 },
      { lat: 12.5, lon: 56.8 },
      { lat: 12.1, lon: 56.2 }
    ];
    expect(totalDistance(track)).toEqual(103.66316087367198);
  });
});

describe('filterPoint', () => {
  let prevPoint;
  beforeEach(() => {
    prevPoint = {
      alt: limits.MAX_ALTITUDE - 1,
    }
  })
  it('returns null if point is outwith altitude limit', () => {
    const currPoint = {
      alt: limits.MAX_ALTITUDE + 1,
    }
    expect(filterPoint(currPoint, prevPoint)).toEqual(null)
  });
  it('returns null if point is outwith velocity limit', () => {
    const currPoint = {
      alt: limits.MAX_ALTITUDE - 1,
      ts: 1576964158137,
      lon: 0,
      lat: 0,
    };
    prevPoint = {
      alt: limits.MAX_ALTITUDE - 1,
      ts: 1667964158137,
      lon: 0,
      lat: 20,
    }
    expect(filterPoint(currPoint, prevPoint)).toEqual(null)
  });
  it('returns null if there is no prevPoint', () => {
    const currPoint = {
      alt: limits.MAX_ALTITUDE + 1,
    }
    prevPoint = null;
    expect(filterPoint(currPoint, prevPoint)).toEqual(null)
  })
})