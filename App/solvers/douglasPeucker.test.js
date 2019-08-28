import { diff, length, perpendicularDistance } from './douglasPeucker';

describe('diff', () => {
  it('handles positive vectors', () => {
    expect(diff({ x: 2, y: 5 }, { x: 1, y: 0 })).toEqual({ x: 1, y: 5 });
  });
  it('handles negative vectors', () => {
    expect(diff({ x: -2, y: -5 }, { x: 1, y: 0 })).toEqual({ x: -3, y: -5 });
  });
});

describe('length', () => {
  it('returns correct length of vector between two points', () => {
    expect(length({ x: -2, y: -4 }, { x: 1, y: 0 })).toEqual(5);
    expect(length({ x: 0, y: 0 }, { x: 0, y: 0 })).toEqual(0);
  })
});


