import { UTCTimestamp } from 'lightweight-charts';
import { useMemo } from 'react';

type BetProbability = {
  __typename: string;
  Key: string;
  Probability: number;
};

export function useCandleData(data?: BetProbability[], startTime: number = Date.now() / 1000) {
  return useMemo(() => {
    if (!data || data.length === 0) return [];

    let lastClose = Math.round(data[0].Probability);

    return data.map((item, index) => {
      const time = Math.floor(startTime + index * 60) as UTCTimestamp;

      const open = lastClose;
      const close = Math.round(item.Probability);
      const high = Math.max(open, close);
      const low = Math.min(open, close);

      lastClose = close;

      return {
        time,
        open,
        high,
        low,
        close,
      };
    });
  }, [data, startTime]);
}
