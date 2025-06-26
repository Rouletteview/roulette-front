import { useMemo } from 'react';
import { UTCTimestamp } from 'lightweight-charts';

type RouletteProbability = {
  Date: string;
  Tag: string;
  Value: number;
};

type HistogramPoint = {
  time: UTCTimestamp;
  value: number;
  color: string;
};

export function useHistogramChartData(data?: RouletteProbability[]) {
  return useMemo(() => {
    if (!data || data.length === 0) return [];

    const points: HistogramPoint[] = [];

    // Ordenar datos por fecha
    const sortedData = [...data].sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());

    for (const item of sortedData) {
      // Convertir la fecha de la API a timestamp UTC
      const timestamp = Math.floor(new Date(item.Date).getTime() / 1000) as UTCTimestamp;

      // Evita duplicar tiempos
      if (points.find((p) => p.time === timestamp)) {
        continue;
      }

      // Determinar color basado en el Tag o el valor
      let color = '#2962FF'; // Color por defecto
      if (item.Tag === 'Red') {
        color = '#FF0000';
      } else if (item.Tag === 'Black') {
        color = '#000000';
      } else if (item.Tag === 'Green' || item.Tag === 'Zero') {
        color = '#00FF00';
      } else if (item.Value >= 50) {
        color = '#0f0';
      } else {
        color = '#f00';
      }

      points.push({
        time: timestamp,
        value: Math.round(item.Value),
        color,
      });
    }

    return points.sort((a, b) => a.time - b.time);
  }, [data]);
}
