import { useMemo } from "react";
import { chartTypes } from "../types/types";
import { UTCTimestamp } from "lightweight-charts";

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

export const useFormattedChartData = ({
  data,
  chartType
}: {
  data: RawEntry[],
  chartType: chartTypes
}) => {

  const formatted = useMemo(() => {
    if (!data || data.length === 0) return [];

    const grouped = groupByDate(data);

    switch (chartType) {
      case 'Candlestick':
        return formatCandleChart(grouped);
      case 'Area':
      case 'Lineal':
        return formatSimpleXY(grouped);
      case 'VerticalColumn':
        return formatHistogramData(grouped);
      default:
        return [];
    }
  }, [data, chartType]);

  return formatted;
};

const groupByDate = (data: RawEntry[]) => {
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

const formatSimpleXY = (
  grouped: { date: string; entries: RawEntry[] }[]
) => {
  return grouped.map(({ date, entries }) => {
    const firstEntry = entries[0];
    return {
      time: new Date(date).getTime() / 1000 as UTCTimestamp,
      value: firstEntry ? firstEntry.Value : 0
    };
  });
};

const formatHistogramData = (
  grouped: { date: string; entries: RawEntry[] }[]
) => {
  let prevValue = 0;
  return grouped.map(({ date, entries }, idx) => {
    const firstEntry = entries[0];
    const value = firstEntry ? firstEntry.Value : 0;
    let color = 'rgba(32, 178, 108, 1)'; 
    if (idx > 0) {
      color = value >= prevValue ? 'rgba(32, 178, 108, 1)' : 'rgba(255, 82, 82, 1)';
    }
    prevValue = value;
    return {
      time: new Date(date).getTime() / 1000 as UTCTimestamp,
      value,
      color
    };
  });
};

const formatCandleChart = (
  grouped: { date: string; entries: RawEntry[] }[]
) => {
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