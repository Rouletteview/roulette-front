
import { useMemo } from "react";
import { UTCTimestamp } from "lightweight-charts";
import { chartTypes } from "../types/types";
import { convertTagToNumber } from "../utils/formatters/rouletterNumbers";

type RawEntry = {
  Date: string;
  Tag: string;
  Number: number;
};

export type GameType =
  | 'Column'
  | 'Dozen'
  | 'HighAndLow'
  | 'OddAndEven'
  | 'RedAndBlack'
  | 'StraightUp'
  | 'VoisinsDuZero'
  | 'Orphelins'
  | 'TiersDuCylindre'
  | 'PlayZero'
  ;

type GroupedData = { date: string; entries: RawEntry[] };
type MultiSeries = {
  id: string;
  data: { time: UTCTimestamp; value: number; color?: string }[] | { time: UTCTimestamp; open: number; high: number; low: number; close: number; isRedAndBlack?: boolean }[];
};

export const useFormattedChartData = ({
  data,
  chartType,
  gameType
}: {
  data: RawEntry[];
  chartType: chartTypes;
  gameType?: GameType;
}): MultiSeries[] => {



  const formatted = useMemo(() => {
    if (!data || data.length === 0) return [];


    const sortedData = [...data].sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());

    const grouped = groupByDate(sortedData);

    switch (chartType) {
      case 'Candlestick':
        return [{
          id: 'Candlestick',
          data: formatCandleChart(grouped, gameType) as { time: UTCTimestamp; open: number; high: number; low: number; close: number; isRedAndBlack?: boolean }[]
        }];
      case 'Area':
      case 'Lineal':
        return formatMultipleLines(grouped, gameType).map(series => ({
          ...series,
          data: series.data as { time: UTCTimestamp; value: number; color?: string }[]
        }));
      case 'VerticalColumn':
        return formatMultipleHistograms(grouped, gameType).map(series => ({
          ...series,
          data: series.data as { time: UTCTimestamp; value: number; color: string }[]
        }));
      default:
        return [];
    }
  }, [data, chartType, gameType]);

  return formatted;
};

const groupByDate = (data: RawEntry[]): GroupedData[] => {
  const map = new Map<string, RawEntry[]>();

  for (const item of data) {
    const key = item.Date;
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key)!.push(item);
  }

  return Array.from(map.entries()).map(([date, entries]) => ({
    date,
    entries
  }));
};


const formatMultipleLines = (grouped: GroupedData[], gameType?: GameType): MultiSeries[] => {
  const data: { time: UTCTimestamp; value: number; tag?: string; originalValue?: number }[] = [];
  let lastTime: number = 0;

  grouped.forEach(({ entries }) => {
    const sortedEntries = entries.sort((a, b) => {
      const dateA = new Date(a.Date).getTime();
      const dateB = new Date(b.Date).getTime();
      return dateA - dateB;
    });

    sortedEntries.forEach((entry) => {
      let time = Math.floor(new Date(entry.Date).getTime() / 1000) as UTCTimestamp;
      if (time <= lastTime) {
        time = (lastTime + 1) as UTCTimestamp;
      }
      lastTime = time;
      const value = (gameType === 'StraightUp' || gameType === 'Dozen') ? entry.Number : convertTagToNumber(entry.Tag, gameType);
      data.push({ time, value, tag: entry.Tag, originalValue: entry.Number });
    });
  });

  data.sort((a, b) => a.time - b.time);

  return [{ id: 'Tags', data }];
};


const formatMultipleHistograms = (grouped: GroupedData[], gameType?: GameType): MultiSeries[] => {
  const data: { time: UTCTimestamp; value: number; color: string; tag?: string; originalValue?: number }[] = [];
  let lastValue: number | null = null;
  let lastTime: number = 0;

  grouped.forEach(({ entries }) => {
    const sortedEntries = entries.sort((a, b) => {
      const dateA = new Date(a.Date).getTime();
      const dateB = new Date(b.Date).getTime();
      return dateA - dateB;
    });

    sortedEntries.forEach((entry) => {
      let time = Math.floor(new Date(entry.Date).getTime() / 1000) as UTCTimestamp;
      if (time <= lastTime) {
        time = (lastTime + 1) as UTCTimestamp;
      }
      lastTime = time;
      const value = (gameType === 'StraightUp' || gameType === 'Dozen') ? entry.Number : convertTagToNumber(entry.Tag, gameType);
      let color = 'rgba(32, 178, 108, 1)';
      if (gameType === 'RedAndBlack') {
        if (entry.Tag === 'Red') {
          color = '#FF0000';
        } else if (entry.Tag === 'Black') {
          color = '#000000';
        } else if (entry.Tag === 'Green' || entry.Tag === 'Zero') {
          color = '#00FF00';
        }
      } else {
        if (lastValue === null) {
          color = 'rgba(32, 178, 108, 1)';
        } else {
          color = value >= lastValue ? '#00FF00' : '#FF0000';
        }
      }
      lastValue = value;
      data.push({ time, value, color, tag: entry.Tag, originalValue: entry.Number });
    });
  });

  data.sort((a, b) => a.time - b.time);

  return [{ id: 'Tags', data }];
};


const formatCandleChart = (grouped: GroupedData[], gameType?: GameType) => {
  const allEntries = grouped.flatMap(g => g.entries);
  const map = new Map<number, RawEntry[]>();

  allEntries.forEach(entry => {
    const dateObj = new Date(entry.Date);
    const timestamp = Math.floor(dateObj.getTime() / 1000);
    // las velas estan agrupadas por 30 segundos
    const intervalKey = Math.floor(timestamp / 30) * 30;
    if (!map.has(intervalKey)) map.set(intervalKey, []);
    map.get(intervalKey)!.push(entry);
  });

  let prevClose: number | undefined = undefined;
  let prevCloseTag: string | undefined = undefined;
  let prevCloseOriginal: number | undefined = undefined;

  let prevCloseOriginalTag: string | undefined = undefined;
  console.log(prevCloseOriginalTag);
  const candles = Array.from(map.entries()).sort((a, b) => a[0] - b[0]).map(([interval, entries]) => {
    const sorted = entries.sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());
    const values = sorted.map(e => e.Number).filter(val => val !== undefined && !isNaN(val));
    const originalValues = sorted.map(e => e.Number).filter(val => val !== undefined && !isNaN(val));
    const tags = sorted.map(e => e.Tag);
    const time = interval as UTCTimestamp;
    const close = values[values.length - 1];
    const closeTag = tags[tags.length - 1];
    const closeOriginal = originalValues[originalValues.length - 1];
    const open = prevClose !== undefined ? prevClose : close;
    const openTag = prevCloseTag !== undefined ? prevCloseTag : closeTag;
    const openOriginal = prevCloseOriginal !== undefined ? prevCloseOriginal : closeOriginal;
    const high = Math.max(open, ...values);
    const low = Math.min(open, ...values);
    const highOriginal = Math.max(openOriginal, ...originalValues);
    const lowOriginal = Math.min(openOriginal, ...originalValues);
    prevClose = close;
    prevCloseTag = closeTag;
    prevCloseOriginal = closeOriginal;
    prevCloseOriginalTag = closeTag;
    const isRedAndBlack = gameType === 'RedAndBlack';
    return {
      time,
      open,
      close,
      high,
      low,
      openTag,
      closeTag,
      openOriginal,
      closeOriginal,
      highOriginal,
      lowOriginal,
      isRedAndBlack,
    };
  });

  return candles.sort((a, b) => a.time - b.time);
};
