import { UTCTimestamp } from "lightweight-charts";
import AreaChart from "../../app/components/chart/AreaChart";
import CandleChart from "../../app/components/chart/CandleChart";
import HistogramChart from "../../app/components/chart/HistogramChart";
import LineChart from "../../app/components/chart/LineChart";

export const selectChartZoneTypes = [
  { zone: 'RedAndBlack', label: 'Rojo y negro' },
  { zone: 'OddAndEven', label: 'Par e Impar' },
  { zone: 'HighAndLow', label: 'Bajo y Alto' },
  { zone: 'Dozen', label: 'Docena' },
  { zone: 'Column', label: 'Columna' },
  { zone: 'StraightUp', label: 'Pleno' },
  { zone: 'VoisinsDuZero', label: 'Vecinos del Cero' },
  { zone: 'Orphelins', label: 'Huérfanos' },
  { zone: 'TiersDuCylindre', label: 'Tercio' },
  { zone: 'PlayZero', label: 'Juego del Cero' },
]

export const selectChartTypes = [
  { type: 'Candlestick', label: 'Gráfico de velas' },
  { type: 'Area', label: 'Gráfico de área' },
  { type: 'Lineal', label: 'Gráfico lineal' },
  { type: 'VerticalColumn', label: 'Gráfico columna vertical' },
];


export const chartTypes = {
  Candlestick: CandleChart,
  Area: AreaChart,
  Lineal: LineChart,
  VerticalColumn: HistogramChart,
} as const;



export type ChartType = keyof typeof chartTypes;

export type MultiSeriesData = {
  id: string;
  data: { time: UTCTimestamp; value: number; color?: string; originalValue?: number }[] | { time: UTCTimestamp; open: number; high: number; low: number; close: number }[];
};