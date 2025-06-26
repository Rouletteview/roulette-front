import { useMemo } from 'react';
import { UTCTimestamp } from 'lightweight-charts';

type RouletteProbability = {
  Date: string;
  Tag: string;
  Value: number;
};

type AreaPoint = {
  time: UTCTimestamp;
  value: number;
};

export function useAreaChartData(data?: RouletteProbability[]) {
  return useMemo(() => {
    if (!data || data.length === 0) return [];

    const points: AreaPoint[] = [];

    // Ordenar datos por fecha
    const sortedData = [...data].sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());

    for (const item of sortedData) {
      // Convertir la fecha de la API a timestamp UTC
      const timestamp = Math.floor(new Date(item.Date).getTime() / 1000) as UTCTimestamp;

      // Evita duplicar tiempos
      if (points.find((p) => p.time === timestamp)) {
        continue;
      }

      points.push({
        time: timestamp,
        value: Math.round(item.Value),
      });
    }

    return points.sort((a, b) => a.time - b.time);
  }, [data]);
}
