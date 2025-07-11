import { useMemo } from 'react';
import { UTCTimestamp } from 'lightweight-charts';
import { convertTagToNumber } from '../../../../utils/formatters/rouletterNumbers';

type Tag = 'FirstColumn' | 'SecondColumn' | 'ThirdColumn';

interface RawProbability {
  __typename: string;
  Date: string; // ISO string
  Tag: Tag;
  Value: number;
}

interface GroupedProbabilities {
  FirstColumn?: number;
  SecondColumn?: number;
  ThirdColumn?: number;
}

interface CandleData {
  time: UTCTimestamp;   // UNIX timestamp in seconds
  open: number;
  high: number;
  low: number;
  close: number;
}

export function useCandleData(data?: RawProbability[], gameType?: string) {
  return useMemo(() => {
    if (!data || data.length === 0) return [];

    // Agrupar por fecha
    const grouped: Record<string, GroupedProbabilities> = data.reduce((acc, curr) => {
      const { Date: date, Tag, Value } = curr;
      if (!acc[date]) acc[date] = {};
      acc[date][Tag] = Value;
      return acc;
    }, {} as Record<string, GroupedProbabilities>);

    // Transformar a formato de velas
    const candleData: CandleData[] = Object.entries(grouped).map(([date, tags]) => {
      // Convertir tags a números para graficar
      const first = convertTagToNumber(tags.FirstColumn?.toString() || '', gameType);
      const second = convertTagToNumber(tags.SecondColumn?.toString() || '', gameType);
      const third = convertTagToNumber(tags.ThirdColumn?.toString() || '', gameType);

      return {
        time: Math.floor(new Date(date).getTime() / 1000) as UTCTimestamp,
        open: first,
        high: Math.max(first, second, third),
        low: Math.min(first, second, third),
        close: third
      };
    });

    return candleData.sort((a, b) => a.time - b.time);
  }, [data, gameType]);
}
