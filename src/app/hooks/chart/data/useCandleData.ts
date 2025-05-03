import { useEffect, useState } from 'react';
import { UTCTimestamp } from 'lightweight-charts';

type BetProbability = {
  Key: string;
  Probability: number;
};

type Candle = {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
};

export function useCandleData(data?: BetProbability[]) {
  const [candles, setCandles] = useState<Candle[]>([]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const newCandles: Candle[] = [];


    let baseTime: number = candles.length
      ? candles[candles.length - 1].time + 60
      : Math.floor(Date.now() / 1000);

    let lastClose = candles.length
      ? candles[candles.length - 1].close
      : Math.round(data[0].Probability);

    for (const item of data) {
      // Evita duplicar tiempos
      if (candles.find((c) => c.time === baseTime)) {
        baseTime += 60;
        continue;
      }

      const open = lastClose;
      const close = Math.round(item.Probability);
      const high = Math.max(open, close);
      const low = Math.min(open, close);

      newCandles.push({
        time: baseTime as UTCTimestamp,
        open,
        high,
        low,
        close,
      });

      lastClose = close;
      baseTime += 60;
    }

    if (newCandles.length > 0) {
      setCandles((prev) =>
        [...prev, ...newCandles].sort((a, b) => a.time - b.time)
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return candles;
}
