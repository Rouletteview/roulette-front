import { useState, useEffect } from 'react';
import { CandlestickData, AreaData, LineData, HistogramData } from 'lightweight-charts';

export let areaData: AreaData[] = [];
export let lineData: LineData[] = [];
export let histogramData: HistogramData[] = [];
export let defaultCandlestickData: CandlestickData[] = [];

// mock data para los distintos tipos de gráficos
const mockDataCandlestick: CandlestickData[] = [
  { time: '2021-07-30', open: 100, high: 110, low: 95, close: 105 },
  { time: '2021-07-31', open: 105, high: 115, low: 100, close: 110 },
  { time: '2021-08-01', open: 110, high: 120, low: 105, close: 115 },
];

const mockDataArea: AreaData[] = [
  { time: '2021-07-30', value: 100, lineColor: '#4C8056', topColor: '#2962FF', bottomColor: 'rgba(41, 98, 255, 0.28)' },
  { time: '2021-07-31', value: 110, lineColor: '#2962FF', topColor: '#2962FF', bottomColor: 'rgba(41, 98, 255, 0.28)' },
  { time: '2021-08-01', value: 120, lineColor: '#2962FF', topColor: '#2962FF', bottomColor: 'rgba(41, 98, 255, 0.28)' },
];

const mockDataLine: LineData[] = [
  { time: '2021-07-30', value: 100, color: '#8D34F9' },
  { time: '2021-07-31', value: 110, color: '#8D34F9' },
  { time: '2021-08-01', value: 120, color: '#8D34F9' },
];

const mockDataHistogram: HistogramData[] = [
  { time: '2021-07-30', value: 10, color: '#2962FF' },
  { time: '2021-07-31', value: 15, color: '#2962FF' },
  { time: '2021-08-01', value: 20, color: '#2962FF' },
];

type ChartType = 'Candlestick' | 'Area' | 'Lineal' | 'VerticalColumn';

// hook para manejar el cambio de tipo de gráfico y los datos correspondientes
export const useChartData = (initialType: ChartType | '') => {
  const [chartData, setChartData] = useState<CandlestickData[] | AreaData[] | LineData[] | HistogramData[]>([]);

  useEffect(() => {
    let newData: CandlestickData[] | AreaData[] | LineData[] | HistogramData[] = [];

    switch (initialType) {
      case 'Candlestick':
        newData = [...mockDataCandlestick];
        break;
      case 'Area':
        newData = [...mockDataArea];
        break;
      case 'Lineal':
        newData = [...mockDataLine];
        break;
      case 'VerticalColumn':
        newData = [...mockDataHistogram];
        break;
      default:
        newData = [...mockDataCandlestick];
    }
    setChartData(newData);
  }, [initialType]);

  return { chartData };
};

export const setAreaData = (data: AreaData[]) => {
  areaData = data;
};

export const setLineData = (data: LineData[]) => {
  lineData = data;
};

export const setHistogramData = (data: HistogramData[]) => {
  histogramData = data;
};

export const setDefaultCandlestickData = (data: CandlestickData[]) => {
  defaultCandlestickData = data;
};
