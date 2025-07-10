/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo } from "react";
import { UTCTimestamp } from "lightweight-charts";
import { chartTypes } from "../types/types";

type RawEntry = {
  Date: string;
  Tag: string;
  Number: number;
};

export type GameType =
  | 'Column'
  | 'Dozen'
  | 'HighLow'
  | 'OddEven'
  | 'RedBlack'
  | 'StraightUp'
  | 'VoisinDuZero'
  | 'Orphelins'
  | 'TiersDuCylindre'
  | 'PlayZero'
  ;

type GroupedData = { date: string; entries: RawEntry[] };
type MultiSeries = {
  id: string;
  data: { time: UTCTimestamp; value: number; color?: string }[] | { time: UTCTimestamp; open: number; high: number; low: number; close: number }[];
};

export const useFormattedChartData = ({
  data,
  chartType
}: {
  data: RawEntry[];
  chartType: chartTypes;
}): MultiSeries[] => {



  const formatted = useMemo(() => {
    if (!data || data.length === 0) return [];


    const sortedData = [...data].sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());

    const grouped = groupByDate(sortedData);

    switch (chartType) {
      case 'Candlestick':
        return [{
          id: 'Candlestick',
          data: formatCandleChart(grouped) as { time: UTCTimestamp; open: number; high: number; low: number; close: number }[]
        }];
      case 'Area':
      case 'Lineal':
        return formatMultipleLines(grouped).map(series => ({
          ...series,
          data: series.data as { time: UTCTimestamp; value: number; color?: string }[]
        }));
      case 'VerticalColumn':
        return formatMultipleHistograms(grouped).map(series => ({
          ...series,
          data: series.data as { time: UTCTimestamp; value: number; color: string }[]
        }));
      default:
        return [];
    }
  }, [data, chartType]);

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


const formatMultipleLines = (grouped: GroupedData[]): MultiSeries[] => {

  const data: { time: UTCTimestamp; value: number; tag?: string }[] = [];

  grouped.forEach(({ date, entries }) => {

    const sortedEntries = entries.sort((a, b) => {
      const dateA = new Date(a.Date).getTime();
      const dateB = new Date(b.Date).getTime();
      return dateA - dateB;
    });

    const baseTime = new Date(date).getTime() / 1000 as UTCTimestamp;

    sortedEntries.forEach(({ Number, Tag }, index) => {
      const time = (baseTime + index) as UTCTimestamp;
      data.push({ time, value: Number, tag: Tag });
    });
  });


  data.sort((a, b) => a.time - b.time);

  return [{ id: 'Números', data }];
};


const formatMultipleHistograms = (grouped: GroupedData[]): MultiSeries[] => {

  const data: { time: UTCTimestamp; value: number; color: string; tag?: string }[] = [];
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
      const color = Number >= lastValue ? 'rgba(32, 178, 108, 1)' : 'rgba(255, 82, 82, 1)';
      lastValue = Number;
      data.push({ time, value: Number, color, tag: Tag });
    });
  });


  data.sort((a, b) => a.time - b.time);

  return [{ id: 'Números', data }];
};


const formatCandleChart = (grouped: GroupedData[]) => {

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
  const candles = Array.from(map.entries()).sort((a, b) => {

    const dateA = new Date(a[1][0].Date).getTime();
    const dateB = new Date(b[1][0].Date).getTime();
    return dateA - dateB;
  }).map(([_, entries]) => {

    const sorted = entries.sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());
    const values = sorted.map(e => e.Number).filter(val => val !== undefined && !isNaN(val));
    const tags = sorted.map(e => e.Tag);
    const time = Math.floor(new Date(sorted[0].Date).getTime() / 1000) as UTCTimestamp;
    const close = values[values.length - 1];
    const closeTag = tags[tags.length - 1];
    const open = prevClose !== undefined ? prevClose : close;
    const openTag = prevCloseTag !== undefined ? prevCloseTag : closeTag;
    const high = Math.max(open, ...values);
    const low = Math.min(open, ...values);
    prevClose = close;
    prevCloseTag = closeTag;

    return {
      time,
      open,
      close,
      high,
      low,
      openTag,
      closeTag
    };
  });


  return candles.sort((a, b) => a.time - b.time);
};
