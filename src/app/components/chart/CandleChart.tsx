import { useEffect, useRef } from 'react';
import {
  createChart,
  ColorType,
  IChartApi,
  CandlestickData,
  CandlestickSeries,
} from 'lightweight-charts';

type ChartProps = {
  data: CandlestickData[];
  height?: number;
  width?: number;
};

const CandleChart: React.FC<ChartProps> = ({
  data,
  height = 400,
  width = 0
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

    const series = chart.addSeries(CandlestickSeries, {
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    const validData = data
      .filter(item =>
        item &&
        typeof item.time === 'string' &&
        !isNaN(Number(item.open)) &&
        !isNaN(Number(item.high)) &&
        !isNaN(Number(item.low)) &&
        !isNaN(Number(item.close))
      )
      .map(item => ({
        time: item.time,
        open: Number(item.open),
        high: Number(item.high),
        low: Number(item.low),
        close: Number(item.close),
      }));

    if (validData.length > 0) {
      series.setData(validData);
      chart.timeScale().fitContent();
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
  }, [data, height, width]);

  return <div ref={chartContainerRef} style={{ width: '100%', }} />;
};

export default CandleChart;
