import { useEffect, useRef } from 'react';
import {
    createChart,
    ColorType,
    IChartApi,
    ISeriesApi,
    CandlestickData,
    LineData,
    CandlestickSeries,
    LineSeries,
  } from 'lightweight-charts';

type ChartType = 'candlestick' | 'line';

type CommonData = CandlestickData | LineData;

type ChartProps = {
  type: ChartType;
  data: CommonData[];
  height?: number;
  width?: number;
};

const Chart: React.FC<ChartProps> = ({
  type,
  data,
  height = 400,
  width = 0, 
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
        width: width || chartContainerRef.current.clientWidth,
        height: height || 400,
        layout: {
          background: { type: ColorType.Solid, color: '#0d1b2a' },
          textColor: '#cbd5e1',
        },
        grid: {
          vertLines: { color: 'rgba(255,255,255,0.05)' },
          horzLines: { color: 'rgba(255,255,255,0.05)' },
        },
        crosshair: {
          mode: 1,
        },
        timeScale: {
          borderColor: 'rgba(255,255,255,0.1)',
        },
        rightPriceScale: {
          borderColor: 'rgba(255,255,255,0.1)',
        },
      });

    chartRef.current = chart;

    let series: ISeriesApi<'Candlestick'> | ISeriesApi<'Line'> | undefined;
    if (type === 'candlestick') {
        series = chart.addSeries(CandlestickSeries);
      } else if (type === 'line') {
        series = chart.addSeries(LineSeries);
      }
      
      if (series) {
        series.setData(data);
      }

    const resizeObserver = new ResizeObserver(() => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.resize(
          chartContainerRef.current.clientWidth,
          height
        );
      }
    });

    resizeObserver.observe(chartContainerRef.current);

    return () => {
      chart.remove();
      resizeObserver.disconnect();
    };
  }, [type, data, height, width]);

  return <div ref={chartContainerRef}  style={{ width: '100%',  }} />;
};

export default Chart;
