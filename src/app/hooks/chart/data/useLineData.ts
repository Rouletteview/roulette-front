import { useMemo } from 'react';
import { UTCTimestamp } from 'lightweight-charts';
import { convertTagToNumber } from '../../../../utils/formatters/rouletterNumbers';

type RouletteProbability = {
  Date: string;
  Tag: string;
  Value: number;
};

type LinePoint = {
  time: UTCTimestamp;
  value: number;
};

export function useLineChartData(data?: RouletteProbability[], gameType?: string) {
  return useMemo(() => {
    if (!data || data.length === 0) return [];

    const points: LinePoint[] = [];

    // Ordenar datos por fecha
    const sortedData = [...data].sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());

    for (const item of sortedData) {
      // Convertir la fecha de la API a timestamp UTC
      const timestamp = Math.floor(new Date(item.Date).getTime() / 1000) as UTCTimestamp;

      // Evita duplicar tiempos
      if (points.find((p) => p.time === timestamp)) {
        continue;
      }

      // Convertir el tag a número para graficar
      const tagNumber = convertTagToNumber(item.Tag, gameType);

      points.push({
        time: timestamp,
        value: tagNumber,
      });
    }

    return points.sort((a, b) => a.time - b.time);
  }, [data, gameType]);
}
