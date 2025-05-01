import AreaChart from "../../app/components/chart/AreaChart";
import CandleChart from "../../app/components/chart/CandleChart";
import HistogramChart from "../../app/components/chart/HistogramChart";
import LineChart from "../../app/components/chart/LineChart";

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