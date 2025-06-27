import { useMemo } from "react";
import { UTCTimestamp } from "lightweight-charts";
import { chartTypes } from "../types/types";

type RawEntry = {
  Date: string;
  Tag: string;
  Value: number;
};

export type GameType =
  | 'Column'
  | 'Dozen'
  | 'HighLow'
  | 'OddEven'
  | 'RedBlack';

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

    const grouped = groupByDate(data);

    switch (chartType) {
      case 'Candlestick':
        return [{
          id: 'Candlestick',
          data: formatCandleChart(grouped)
        }];
      case 'Area':
      case 'Lineal':
        return formatMultipleLines(grouped);
      case 'VerticalColumn':
        return formatMultipleHistograms(grouped);
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
  const seriesMap: Record<string, { time: UTCTimestamp; value: number }[]> = {};

  grouped.forEach(({ date, entries }) => {
    const time = new Date(date).getTime() / 1000 as UTCTimestamp;
    entries.forEach(({ Tag, Value }) => {
      if (!seriesMap[Tag]) {
        seriesMap[Tag] = [];
      }
      seriesMap[Tag].push({ time, value: Value });
    });
  });

  return Object.entries(seriesMap).map(([id, data]) => ({ id, data }));
};


const formatMultipleHistograms = (grouped: GroupedData[]): MultiSeries[] => {
  const seriesMap: Record<string, { time: UTCTimestamp; value: number; color: string }[]> = {};
  const lastValues: Record<string, number> = {};

  grouped.forEach(({ date, entries }) => {
    const time = new Date(date).getTime() / 1000 as UTCTimestamp;

    entries.forEach(({ Tag, Value }) => {
      const prev = lastValues[Tag] ?? Value;
      const color = Value >= prev ? 'rgba(32, 178, 108, 1)' : 'rgba(255, 82, 82, 1)';
      lastValues[Tag] = Value;

      if (!seriesMap[Tag]) {
        seriesMap[Tag] = [];
      }
      seriesMap[Tag].push({ time, value: Value, color });
    });
  });

  return Object.entries(seriesMap).map(([id, data]) => ({ id, data }));
};


const formatCandleChart = (grouped: GroupedData[]) => {
  return grouped.map(({ date, entries }) => {
    const values = entries.map(e => e.Value);
    return {
      time: new Date(date).getTime() / 1000 as UTCTimestamp,
      open: values[0] || 0,
      high: Math.max(...values) || 0,
      low: Math.min(...values) || 0,
      close: values[values.length - 1] || 0
    };
  });
};
