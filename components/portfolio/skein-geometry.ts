export type Point3 = readonly [number, number, number];

export const strands = [
  { color: "#b16b43", radius: .78, phase: .3, turns: 2.4, start: [-155, 7, 70], end: [245, 7, -22] },
  { color: "#28332d", radius: .68, phase: 1.1, turns: 2.6, start: [-90, 8, -55], end: [170, 9, -70] },
  { color: "#c48c61", radius: .6, phase: 2.2, turns: 2.25, start: [-28, 19, -88], end: [80, 8, 95] },
  { color: "#637663", radius: .58, phase: 3.8, turns: 2.4, start: [-65, 9, 75], end: [30, 10, -85] },
  { color: "#526d8c", radius: .65, phase: 5.2, turns: 2.15, start: [50, 9, -85], end: [80, 12, 75] },
  { color: "#916240", radius: .55, phase: 5.9, turns: 2.7, start: [-45, 12, 45], end: [60, 8, -45] },
] as const;

const ends: readonly (readonly [Point3, Point3, number])[] = [
  [[-235, 5, 60], [240, 7, -75], 70],
  [[-235, 6, -80], [210, 6, 65], -55],
  [[-200, 5, -55], [225, 9, -10], 65],
  [[-160, 7, 100], [215, 4, 100], -28],
  [[-215, 4, 5], [185, 8, -110], -36],
  [[-180, 6, 80], [240, 5, -90], 25],
];

export const clamp = (n: number) => Math.max(0, Math.min(1, n));
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (n: number) => n * n * (3 - 2 * n);

export function strandPoints(index: number, open: boolean): Point3[] {
  const strand = strands[index];
  return Array.from({ length: 97 }, (_, i): Point3 => {
    const t = i / 96;
    if (open) {
      const [a, b, bend] = ends[index];
      return [mix(a[0], b[0], t), mix(a[1], b[1], t) + Math.sin(t * Math.PI) * 5, mix(a[2], b[2], t) + Math.sin(t * Math.PI) * bend];
    }
    const theta = strand.phase + t * Math.PI * 2 * strand.turns * 1.28;
    const radius = 52 + 24 * Math.sin(theta * 1.73 + strand.phase) + 16 * Math.sin(theta * 3.1) + index * 2;
    const knot: Point3 = [
      20 + Math.cos(theta) * radius + 12 * Math.sin(theta * .65),
      Math.max(6, 36 + index * 1.4 + 22 * Math.sin(theta * 1.43 + strand.phase) + 13 * Math.cos(theta * .71 + index)),
      Math.sin(theta) * radius * .9 + 12 * Math.cos(theta * .77 + strand.phase),
    ];
    const tail = smooth(clamp(t < .12 ? t / .12 : (1 - t) / .13));
    return knot.map((v, axis) => mix(mix(strand.start[axis], strand.end[axis], t), v, tail)) as unknown as Point3;
  });
}

export const compositions = strands.map((_, i) => ({ closed: strandPoints(i, false), open: strandPoints(i, true) }));
export function release(index: number, progress: number) {
  return smooth(clamp((progress - index * .025) / (1 - index * .025)));
}

// Orthographic projection for the server-rendered drawing and WebGL fallback.
export function projectedPath(index: number, progress: number) {
  const { closed, open } = compositions[index], amount = release(index, progress);
  const points = closed.map((p, i) => {
    const x = mix(p[0], open[i][0], amount), y = mix(p[1], open[i][1], amount), z = mix(p[2], open[i][2], amount);
    return [400 + x * 1.5, 320 - y * 1.32 + z * .71];
  });
  return points.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ");
}
