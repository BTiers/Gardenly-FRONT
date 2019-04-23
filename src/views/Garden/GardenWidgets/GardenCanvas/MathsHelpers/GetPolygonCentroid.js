export default function getPolygonCentroid(pts) {
  const first = pts[0];
  const last = pts[pts.length - 1];

  if (first.x !== last.x || first.y !== last.y) pts.push(first);

  let twicearea = 0;
  let x = 0;
  let y = 0;

  const nPts = pts.length;

  let p1;
  let p2;
  let f;

  for (let i = 0, j = nPts - 1; i < nPts; j = i++) {
    p1 = pts[i];
    p2 = pts[j];
    f = (p1.y - first.y) * (p2.x - first.x) - (p2.y - first.y) * (p1.x - first.x);
    twicearea += f;
    x += (p1.x + p2.x - 2 * first.x) * f;
    y += (p1.y + p2.y - 2 * first.y) * f;
  }
  f = twicearea * 3;

  return { x: x / f + first.x, y: y / f + first.y };
}
