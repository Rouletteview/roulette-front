/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo } from "react";
import { UTCTimestamp } from "lightweight-charts";
import { chartTypes } from "../types/types";
import { convertTagToNumber, isVoisinDuZero } from "../utils/formatters/rouletterNumbers";

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

  console.log('data', data)



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
        return formatMultipleLines(grouped, gameType, chartType).map(series => ({
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


const formatMultipleLines = (grouped: GroupedData[], gameType?: GameType, chartType?: chartTypes): MultiSeries[] => {
  const data: { time: UTCTimestamp; value: number; color?: string; tag?: string; originalValue?: number }[] = [];

  grouped.forEach(({ date, entries }) => {
    const sortedEntries = entries.sort((a, b) => {
      const dateA = new Date(a.Date).getTime();
      const dateB = new Date(b.Date).getTime();
      return dateA - dateB;
    });

    const baseTime = new Date(date).getTime() / 1000 as UTCTimestamp;

    sortedEntries.forEach(({ Number, Tag }, index) => {
      const time = (baseTime + index) as UTCTimestamp;

      let value;
      let color: string | undefined;

      if (gameType === 'VoisinsDuZero') {

        value = Number;

        if (chartType === 'VerticalColumn') {
          color = isVoisinDuZero(Number) ? '#00FF00' : '#FF0000';
        }
      } else {
        value = (gameType === 'StraightUp' || gameType === 'Dozen' || gameType === 'HighAndLow') ? Number : convertTagToNumber(Tag, gameType);
      }

      data.push({ time, value, color, tag: Tag, originalValue: Number });
    });
  });

  data.sort((a, b) => a.time - b.time);

  return [{ id: 'Tags', data }];
};


const formatMultipleHistograms = (grouped: GroupedData[], gameType?: GameType): MultiSeries[] => {
  const data: { time: UTCTimestamp; value: number; color: string; tag?: string; originalValue?: number }[] = [];
  let lastValue: number | null = null;

  grouped.forEach(({ date, entries }) => {
    const sortedEntries = entries.sort((a, b) => {
      const dateA = new Date(a.Date).getTime();
      const dateB = new Date(b.Date).getTime();
      return dateA - dateB;
    });

    const baseTime = new Date(date).getTime() / 1000 as UTCTimestamp;

    sortedEntries.forEach(({ Number, Tag }, index) => {
      const time = (baseTime + index) as UTCTimestamp;

      let value;
      let color = '#25A69A';
      if (gameType === 'RedAndBlack') {
        value = Number;
        if (Tag === 'Red') {
          color = '#FF0000';
        } else if (Tag === 'Black') {
          color = '#000000';
        } else if (Tag === 'Green' || Tag === 'Zero') {
          color = '#00FF00';
        }
      } else if (gameType === 'VoisinsDuZero') {
        value = Number;
        color = isVoisinDuZero(Number) ? '#25A69A' : '#ef5350';
      } else {
        value = (gameType === 'StraightUp' || gameType === 'Dozen' || gameType === 'HighAndLow') ? Number : convertTagToNumber(Tag, gameType);
        if (lastValue === null) {
          color = '#25A69A';
        } else {
          color = value >= lastValue ? '#25A69A' : '#ef5350';
        }
      }
      lastValue = value;
      data.push({ time, value, color, tag: Tag, originalValue: Number });
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

    const intervalKey = Math.floor(timestamp / 30) * 30;
    if (!map.has(intervalKey)) map.set(intervalKey, []);
    map.get(intervalKey)!.push(entry);
  });

  let prevClose: number | undefined = undefined;
  let prevCloseTag: string | undefined = undefined;
  let prevCloseOriginal: number | undefined = undefined;
  let prevCloseOriginalTag: string | undefined = undefined;
  console.log(prevCloseOriginalTag)


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
