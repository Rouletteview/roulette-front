import { useMemo } from 'react';
import { UTCTimestamp } from 'lightweight-charts';

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

export function useCandleData(data?: RawProbability[]) {
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
      const first = tags.FirstColumn ?? 0;
      const second = tags.SecondColumn ?? 0;
      const third = tags.ThirdColumn ?? 0;

      return {
        time: Math.floor(new Date(date).getTime() / 1000) as UTCTimestamp,
        open: first,
        high: Math.max(first, second, third),
        low: Math.min(first, second, third),
        close: third
      };
    });

    return candleData.sort((a, b) => a.time - b.time);
  }, [data]);
}
