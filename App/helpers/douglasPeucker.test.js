import { diff, vLength, perpendicularDistance } from './douglasPeucker';

describe('diff', () => {
  it('handles positive vectors', () => {
    expect(diff({ x: 2, y: 5 }, { x: 1, y: 0 })).toEqual({ x: 1, y: 5 });
  });
  it('handles negative vectors', () => {
    expect(diff({ x: -2, y: -5 }, { x: 1, y: 0 })).toEqual({ x: -3, y: -5 });
  });
});

describe('length', () => {
  it('returns correct length of vector', () => {
    expect(vLength({ x: -2, y: -4 }, { x: 1, y: 0 })).toEqual(5);
  })
});


