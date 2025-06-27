import { useEffect, useRef, useState } from 'react';
import {
  createChart,
  ColorType,
  IChartApi,
  CandlestickData,
  CandlestickSeries,
  MouseEventParams,
  Time,
  UTCTimestamp,
} from 'lightweight-charts';

type ChartProps = {
  data: { time: UTCTimestamp; open: number; high: number; low: number; close: number }[];
  height?: number;
  width?: number;
  loading?: boolean;
};

const CandleChart: React.FC<ChartProps> = ({
  data,
  height = 400,
  width = 0,
  loading = false
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipData, setTooltipData] = useState<{
    time: string;
    price: number;
    isUp: boolean;
  } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: width || chartContainerRef.current.clientWidth,
      height: height || 400,
      layout: {
        background: { type: ColorType.Solid, color: '#0d1b2a' },
        textColor: '#ffffff',
      },
      grid: {
        vertLines: {
          visible: true,
          color: 'rgba(255, 255, 255, 0.1)',
          style: 1,
        },
        horzLines: {
          visible: true,
          color: 'rgba(255, 255, 255, 0.1)',
          style: 1,
        },
      },
      crosshair: {
        mode: 1,
        horzLine: {
          visible: false,
          labelVisible: false,
        },
        vertLine: {
          labelVisible: false,
        },
      },
      timeScale: {
        borderColor: 'rgba(255,255,255,0.1)',
        timeVisible: true,
        secondsVisible: false,
        tickMarkFormatter: (time: number) => {
          const date = new Date(time * 1000);
          return date.toLocaleString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });
        }
      },
      rightPriceScale: {
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
        borderColor: 'rgba(255,255,255,0.1)',
      },
    });

    chartRef.current = chart;

    const series = chart.addSeries(CandlestickSeries, {
      upColor: 'rgba(38, 166, 154, 1)',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: 'rgba(38, 166, 154, 1)',
      wickDownColor: '#ef5350',
    });

    if (!data || !Array.isArray(data)) {
      return;
    }

    const validData = data
      .filter(item =>
        item &&
        typeof item.time === 'number' &&
        !isNaN(item.time) &&
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
      }))
      .sort((a, b) => Number(a.time) - Number(b.time));

    if (validData.length > 0) {
      series.setData(validData);
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

      const data = series.data();
      const time = param.time as number;
      const candleData = data.find(d => d.time === time) as CandlestickData<Time> | undefined;

      if (candleData && 'close' in candleData) {
        const timestamp = typeof time === 'number' ? time : Number(time);
        const date = new Date(timestamp * 1000);
        const isUp = candleData.close >= candleData.open;
        setTooltipData({
          time: date.toLocaleString('es-ES', {
            day: '2-digit',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }),
          price: candleData.close,
          isUp,
        });

        const toolTipWidth = 120;
        const toolTipHeight = 100;
        const toolTipMargin = 15;

        let left = param.point.x + toolTipMargin;
        if (left > chartContainerRef.current!.clientWidth - toolTipWidth) {
          left = param.point.x - toolTipMargin - toolTipWidth;
        }

        let top = param.point.y + toolTipMargin;
        if (top > height - toolTipHeight) {
          top = param.point.y - toolTipHeight - toolTipMargin;
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
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0d1b2a',
            zIndex: 10,
          }}
        >
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9A425]"></div>
            <p className="text-white mt-4 text-sm">Cargando datos...</p>
          </div>
        </div>
      )}
      <div ref={chartContainerRef} style={{ width: '100%' }} />
      {tooltipData && tooltipPosition && (
        <div
          ref={tooltipRef}
          style={{
            position: 'absolute',
            top: `${tooltipPosition.y}px`,
            left: `${tooltipPosition.x}px`,
            width: '120px',
            minHeight: '100px',
            padding: '12px',
            boxSizing: 'border-box',
            fontSize: '12px',
            textAlign: 'left',
            zIndex: 1000,
            pointerEvents: 'none',
            border: `2px solid ${tooltipData.isUp ? 'rgba(38, 166, 154, 1)' : '#ef5350'}`,
            borderRadius: '4px',
            background: 'rgba(0, 0, 0, 0.95)',
            color: 'white',
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif",
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div style={{ color: tooltipData.isUp ? 'rgba(38, 166, 154, 1)' : '#ef5350', fontWeight: 'bold', marginBottom: '8px' }}>
            {tooltipData.isUp ? 'Alcista' : 'Bajista'}
          </div>
          <div style={{ fontSize: '20px', margin: '8px 0px', color: 'white', fontWeight: 'bold' }}>
            {Math.round(100 * tooltipData.price) / 100}%
          </div>
          <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '10px', marginTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.2)', paddingTop: '6px' }}>
            {tooltipData.time}
          </div>
        </div>
      )}
    </div>
  );
};

export default CandleChart;
