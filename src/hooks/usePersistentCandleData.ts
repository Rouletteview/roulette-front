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
  
      
      const lastTimestamp = historial.length > 0 
        ? historial[historial.length - 1].time 
        : (Math.floor(Date.now() / 1000) - 60) as UTCTimestamp;
  
     
      const timestamp = (lastTimestamp + 60) as UTCTimestamp; 
  
      const lastClose = historial.length
        ? historial[historial.length - 1].close
        : Math.round(probabilities[0].Probability);
  
    
      const close = Math.round(probabilities[0].Probability);
      const high = Math.max(lastClose, close);
      const low = Math.min(lastClose, close);
  
      const newCandle: Candle = {
        time: timestamp,
        open: lastClose,
        high,
        low,
        close,
      };
  
      setHistorial((prev) => [...prev, newCandle]);
      setLastWinAt(lastNumber.WinAt);
    }, [probabilities, lastNumber, lastWinAt, historial]);
  
    return historial;
  }