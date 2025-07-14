/* eslint-disable @typescript-eslint/no-unused-vars */
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

  grouped.forEach(({ date, entries }) => {

    const sortedEntries = entries.sort((a, b) => {
      const dateA = new Date(a.Date).getTime();
      const dateB = new Date(b.Date).getTime();
      return dateA - dateB;
    });

    const baseTime = new Date(date).getTime() / 1000 as UTCTimestamp;

    sortedEntries.forEach(({ Number, Tag }, index) => {
      const time = (baseTime + index) as UTCTimestamp;
      // Convertir el tag a número para graficar
      const tagNumber = convertTagToNumber(Tag, gameType);
      data.push({ time, value: tagNumber, tag: Tag, originalValue: Number });
    });
  });


  data.sort((a, b) => a.time - b.time);

  return [{ id: 'Tags', data }];
};


const formatMultipleHistograms = (grouped: GroupedData[], gameType?: GameType): MultiSeries[] => {

  const data: { time: UTCTimestamp; value: number; color: string; tag?: string; originalValue?: number }[] = [];
  let lastValue = 0;

  grouped.forEach(({ date, entries }) => {

    const sortedEntries = entries.sort((a, b) => {
      const dateA = new Date(a.Date).getTime();
      const dateB = new Date(b.Date).getTime();
      return dateA - dateB;
    });

    const baseTime = new Date(date).getTime() / 1000 as UTCTimestamp;

    sortedEntries.forEach(({ Number, Tag }, index) => {
      const time = (baseTime + index) as UTCTimestamp;
      // Convertir el tag a número para graficar
      const tagNumber = convertTagToNumber(Tag, gameType);
      const color = tagNumber >= lastValue ? 'rgba(32, 178, 108, 1)' : 'rgba(255, 82, 82, 1)';
      lastValue = tagNumber;
      data.push({ time, value: tagNumber, color, tag: Tag, originalValue: Number });
    });
  });


  data.sort((a, b) => a.time - b.time);

  return [{ id: 'Tags', data }];
};


const formatCandleChart = (grouped: GroupedData[], gameType?: GameType) => {

  const allEntries = grouped.flatMap(g => g.entries);
  const map = new Map<string, RawEntry[]>();

  allEntries.forEach(entry => {
    const dateObj = new Date(entry.Date);
    const key = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(entry);
  });

  let prevClose: number | undefined = undefined;
  let prevCloseTag: string | undefined = undefined;
  let prevCloseOriginal: number | undefined = undefined;
  let prevCloseOriginalTag: string | undefined = undefined;
  console.log('prevCloseOriginalTag', prevCloseOriginalTag);
  const candles = Array.from(map.entries()).sort((a, b) => {
    const dateA = new Date(a[1][0].Date).getTime();
    const dateB = new Date(b[1][0].Date).getTime();
    return dateA - dateB;
  }).map(([_, entries]) => {
    const sorted = entries.sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());

    const values = sorted.map(e => e.Number).filter(val => val !== undefined && !isNaN(val));
    const originalValues = sorted.map(e => e.Number).filter(val => val !== undefined && !isNaN(val));
    const tags = sorted.map(e => e.Tag);
    const time = Math.floor(new Date(sorted[0].Date).getTime() / 1000) as UTCTimestamp;
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
