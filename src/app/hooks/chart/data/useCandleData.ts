import { useMemo } from 'react';
import { UTCTimestamp } from 'lightweight-charts';

interface RouletteResult {
  Date: string;
  Tag: string;
  Number: number;
}

interface CandleData {
  time: UTCTimestamp;   // UNIX timestamp in seconds
  open: number;
  high: number;
  low: number;
  close: number;
  openTag?: string;
  closeTag?: string;
  openOriginal?: number;
  closeOriginal?: number;
  highOriginal?: number;
  lowOriginal?: number;
  isRedAndBlack?: boolean;
}

// Función para determinar el color de un número de ruleta
const getRouletteNumberColor = (num: number): 'red' | 'black' | 'green' => {
  if (num === 0) return 'green';
  const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  return redNumbers.includes(num) ? 'red' : 'black';
};

export function useCandleData(data?: RouletteResult[], gameType?: string) {
  return useMemo(() => {
    if (!data || data.length === 0) return [];

    // Agrupar por fecha usando los números reales
    const grouped: Record<string, { numbers: number[], tags: string[] }> = data.reduce((acc, curr) => {
      const { Date: date, Number, Tag } = curr;
      if (!acc[date]) acc[date] = { numbers: [], tags: [] };
      acc[date].numbers.push(Number);
      acc[date].tags.push(Tag);
      return acc;
    }, {} as Record<string, { numbers: number[], tags: string[] }>);

    // Transformar a formato de velas
    const candleData: CandleData[] = Object.entries(grouped).map(([date, { numbers, tags }]) => {
      // Usar los números reales de la ruleta
      const [first, second, third] = numbers.length >= 3 ? numbers.slice(0, 3) : [numbers[0] || 0, numbers[1] || 0, numbers[2] || 0];
      const [firstTag, secondTag, thirdTag] = tags.length >= 3 ? tags.slice(0, 3) : [tags[0] || '', tags[1] || '', tags[2] || ''];

      // Para RedAndBlack, usar el número real pero determinar el color basado en el tag
      const isRedAndBlack = gameType === 'RedAndBlack';

      // Si es RedAndBlack, usar el número real pero el color se determina por el tag
      const openColor = isRedAndBlack ? (firstTag === 'Red' ? 'red' : firstTag === 'Black' ? 'black' : 'green') : undefined;
      const closeColor = isRedAndBlack ? (thirdTag === 'Red' ? 'red' : thirdTag === 'Black' ? 'black' : 'green') : undefined;

      return {
        time: Math.floor(new Date(date).getTime() / 1000) as UTCTimestamp,
        open: first,
        high: Math.max(first, second, third),
        low: Math.min(first, second, third),
        close: third,
        openTag: firstTag,
        closeTag: thirdTag,
        openOriginal: first,
        closeOriginal: third,
        highOriginal: Math.max(first, second, third),
        lowOriginal: Math.min(first, second, third),
        isRedAndBlack
      };
    });

    return candleData.sort((a, b) => a.time - b.time);
  }, [data, gameType]);
}
