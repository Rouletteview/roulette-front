import { useEffect, useRef } from 'react';
import {
  createChart,
  ColorType,
  IChartApi,
  LineData,
  LineSeries,
} from 'lightweight-charts';

type ChartProps = {
  data: LineData[];
  height?: number;
  width?: number;
};

const LineChart: React.FC<ChartProps> = ({
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
      height,
      layout: {
        background: { type: ColorType.Solid, color: '#0d1b2a' },
        textColor: 'white',
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

    const lineSeries = chart.addSeries(LineSeries, { color: '#8D34F9' });

    // Validate and transform data
    const validData = data
      .filter(item => item && typeof item.time === 'string' && !isNaN(Number(item.value)))
      .map(item => ({
        time: item.time,
        value: Number(item.value),
      }));

    if (validData.length > 0) {
      lineSeries.setData(validData);
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

  return <div ref={chartContainerRef} style={{ width: '100%' }} />;
};

export default LineChart;
