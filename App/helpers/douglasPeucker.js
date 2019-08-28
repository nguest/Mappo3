const diff = (v1, v2) => ({ x: v1.x - v2.x, y: v1.y - v2.y });
const length = (v1, v2) => (diff(v1, v2).x ** 2 + diff(v1, v2).y ** 2) ** 0.5;

const perpendicularDistance = (pi, [p1, pEnd]) => {
  const alpha = Math.atan((diff(pEnd, p1).y / (diff(pEnd, p1).x)));
  const lambda = Math.atan((diff(pi, p1).y / (diff(pi, p1).x)));
  const theta = alpha - lambda;
  return Math.sin(theta) * length(pi, p1);
};

const DouglasPeucker = (PointList, epsilon) => {
  // Find the point with the maximum distance
  let dmax = 0;
  let index = 0;
  const end = PointList.length;

  for (let i = 2; end - 1; i++) {
    const d = perpendicularDistance(PointList[i], [PointList[1], PointList[end]]);
    if (d > dmax) {
      index = i;
      dmax = d;
    }
  }

  let ResultList = [];

  // If max distance is greater than epsilon, recursively simplify
  if (dmax > epsilon) {
    // Recursive call
    const recResults1 = DouglasPeucker(PointList.slice(1, index), epsilon); //[]
    const recResults2 = DouglasPeucker(PointList.slice(index, end), epsilon); //[]

    // Build the result list
    ResultList = [...recResults1.slice(1, recResults1.length - 1), ...recResults2.slice(1, recResults2.length)];
  } else {
    ResultList = [PointList[1], PointList[end]] // []
  }
  // Return the result
  return ResultList;// []
};