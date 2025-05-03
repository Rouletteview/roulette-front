import { useEffect, useState } from 'react';
import { UTCTimestamp } from 'lightweight-charts';

type BetProbability = {
  Key: string;
  Probability: number;
};

type LastNumber = {
  Number: number;
  WinAt: string;
};

type Candle = {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
};


export function usePersistentCandleData(
  probabilities: BetProbability[] = [],
  lastNumber: LastNumber | undefined
) {
  const [historial, setHistorial] = useState<Candle[]>([]);
  const [lastWinAt, setLastWinAt] = useState<string | null>(null);



  useEffect(() => {
    if (!probabilities.length || !lastNumber) return;
    if (lastNumber.WinAt === lastWinAt) return;

    const probability = probabilities[1];
  
    if (!probability || typeof probability.Probability !== 'number') return;

    const date = new Date(lastNumber.WinAt);
    if (isNaN(date.getTime())) return;

    const timestamp = Math.floor(date.getTime() / 1000) as UTCTimestamp;

    if (historial.some(candle => candle.time === timestamp)) {
      return;
    }

    const lastClose = historial.length
      ? historial[historial.length - 1].close
      : Math.round(probability.Probability);

    const close = Math.round(probability.Probability);
    const high = Math.max(lastClose, close);
    const low = Math.min(lastClose, close);

    const newCandle: Candle = {
      time: timestamp,
      open: lastClose,
      high,
      low,
      close,
    };

    setHistorial((prev) => [...prev, newCandle].sort((a, b) => a.time - b.time));
    setLastWinAt(lastNumber.WinAt);
  }, [probabilities, lastNumber, lastWinAt, historial]);
console.log('historial:', historial)
  return historial;
}
