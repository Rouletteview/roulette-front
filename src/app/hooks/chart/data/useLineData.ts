import { useEffect, useState } from 'react';
import { UTCTimestamp } from 'lightweight-charts';

type BetProbability = {
  Key: string;
  Probability: number;
};

type LinePoint = {
  time: UTCTimestamp;
  value: number;
};

export function useLineChartData(data?: BetProbability[]) {
  const [points, setPoints] = useState<LinePoint[]>([]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const newPoints: LinePoint[] = [];
    const existingTimes = new Set(points.map(p => p.time));

    let baseTime: number = points.length
      ? points[points.length - 1].time + 60
      : Math.floor(Date.now() / 1000);

    for (const item of data) {
      while (existingTimes.has(baseTime as UTCTimestamp)) {
        baseTime += 60;
      }

      newPoints.push({
        time: baseTime as UTCTimestamp,
        value: Math.round(item.Probability),
      });

      existingTimes.add(baseTime as UTCTimestamp);
      baseTime += 60;
    }

    if (newPoints.length > 0) {
      setPoints((prev) => {
        const combined = [...prev, ...newPoints];
        const uniqueSorted = combined
          .reduce((acc, curr) => {
            if (!acc.find(p => p.time === curr.time)) {
              acc.push(curr);
            }
            return acc;
          }, [] as LinePoint[])
          .sort((a, b) => a.time - b.time);
        return uniqueSorted;
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  console.log(points);
  return points;
}
