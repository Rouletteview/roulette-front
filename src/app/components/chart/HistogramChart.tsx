import { useEffect, useRef, useState } from 'react';
import {
  createChart,
  ColorType,
  IChartApi,
  HistogramSeries,
  HistogramData,
  MouseEventParams,
} from 'lightweight-charts';

type ChartProps = {
  data: HistogramData[];
  height?: number;
  width?: number;
};

const HistogramChart: React.FC<ChartProps> = ({
  data,
  height = 400,
  width = 0,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [tooltipData, setTooltipData] = useState<{
    time: string;
    price: number;
    color: string;
  } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);

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
        vertLines: {
          visible: true,
          color: 'rgba(255, 255, 255, 0.1)',
        },
        horzLines: {
          visible: true,
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      crosshair: {
        mode: 1,
        horzLine: { visible: false, labelVisible: false },
        vertLine: { labelVisible: false },
      },
      timeScale: {
        borderColor: 'rgba(255,255,255,0.1)',
        timeVisible: true,
        secondsVisible: false,
        tickMarkFormatter: (time: number) => {
          const date = new Date(time * 1000);
          return date.toLocaleString('es-ES', {
            day: '2-digit',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          });
        },
      },
      rightPriceScale: {
        scaleMargins: { top: 0.3, bottom: 0.25 },
        borderColor: 'rgba(255,255,255,0.1)',
      },
    });

    chartRef.current = chart;

    const histogramSeries = chart.addSeries(HistogramSeries, {
      color: 'rgba(32, 178, 108, 1)',
    });

    const validData = data
      .filter(item => item && typeof item.time === 'number' && !isNaN(item.value))
      .sort((a, b) => Number(a.time) - Number(b.time));

    if (validData.length > 0) {
      histogramSeries.setData(validData);
      chart.timeScale().fitContent();
    }

    chart.subscribeCrosshairMove((param: MouseEventParams) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > chartContainerRef.current!.clientWidth ||
        param.point.y < 0 ||
        param.point.y > height
      ) {
        setTooltipData(null);
        setTooltipPosition(null);
        return;
      }

      const time = param.time as number;
      const dataAtTime = validData.find(d => d.time === time);
      if (dataAtTime) {
        const date = new Date(time * 1000);

        setTooltipData({
          time: date.toLocaleString('es-ES', {
            day: '2-digit',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
          price: dataAtTime.value,
          color: dataAtTime.color || 'rgba(32, 178, 108, 1)',
        });

        const tooltipWidth = 96;
        const tooltipHeight = 80;
        const margin = 15;

        let left = param.point.x + margin;
        if (left > chartContainerRef.current!.clientWidth - tooltipWidth) {
          left = param.point.x - margin - tooltipWidth;
        }

        let top = param.point.y + margin;
        if (top > height - tooltipHeight) {
          top = param.point.y - tooltipHeight - margin;
        }

        setTooltipPosition({ x: left, y: top });
      } else {
        setTooltipData(null);
        setTooltipPosition(null);
      }
    });

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

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div ref={chartContainerRef} style={{ width: '100%' }} />
      {tooltipData && tooltipPosition && (
        <div
          style={{
            position: 'absolute',
            top: `${tooltipPosition.y}px`,
            left: `${tooltipPosition.x}px`,
            width: '96px',
            height: '115px',
            padding: '8px',
            fontSize: '12px',
            zIndex: 1000,
            pointerEvents: 'none',
            border: `2px solid ${tooltipData.color}`,
            borderRadius: '2px',
            background: 'black',
            color: 'white',
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif",
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          }}
        >
          <div style={{ color: tooltipData.color }}>
            Probabilidad
          </div>
          <div style={{ fontSize: '24px', margin: '4px 0px' }}>
            {Math.round(100 * tooltipData.price) / 100}%
          </div>
          <div>{tooltipData.time}</div>
        </div>
      )}
    </div>
  );
};

export default HistogramChart;
