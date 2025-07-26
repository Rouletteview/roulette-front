import { useEffect, useRef, useState } from 'react';
import {
  createChart,
  ColorType,
  IChartApi,
  HistogramSeries,
  HistogramData,
  MouseEventParams,
  ISeriesApi,
} from 'lightweight-charts';
import { MultiSeriesData } from '../../../types/chart/types';
import { translateRouletteTag, getYAxisTicks } from '../../../utils/formatters/rouletterNumbers';
import { useChartPosition } from '../../../hooks/useChartPosition';

type ChartProps = {
  data: MultiSeriesData[];
  height?: number;
  width?: number;
  loading?: boolean;
  gameType?: string;
  onChartReady?: (chart: IChartApi) => void;
};

const HistogramChart: React.FC<ChartProps> = ({
  data,
  height = 400,
  width = 0,
  loading = false,
  gameType,
  onChartReady
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [tooltipData, setTooltipData] = useState<{
    time: string;
    series: { id: string; value: number; color: string; tag?: string; originalValue?: number }[];
  } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);


  const urlParams = new URLSearchParams(window.location.search);
  const chartType = urlParams.get('chartType') || 'VerticalColumn';
  const selectedTable = urlParams.get('table') || '';

  const { setChartRef, getInitialRange } = useChartPosition(chartType, gameType || '', selectedTable);

  useEffect(() => {
    if (!chartContainerRef.current) return;


    const yTicks = getYAxisTicks(gameType);
    const initialRange = getInitialRange();

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
    setChartRef(chart);


    if (onChartReady) {
      onChartReady(chart);
    }


    const seriesMap = new Map<string, ISeriesApi<'Histogram'>>();
    const allValidData: HistogramData[] = [];

    data.forEach((series) => {
      if ('value' in series.data[0] && 'color' in series.data[0]) {
        const histogramSeries = chart.addSeries(HistogramSeries, {
          color: 'rgba(32, 178, 108, 1)',
          lastValueVisible: false,
          priceLineVisible: false,
        });

        const validData = series.data
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter(item => item && typeof item.time === 'number' && !isNaN((item as any).value))
          .sort((a, b) => Number(a.time) - Number(b.time));

        if (validData.length > 0) {
          histogramSeries.setData(validData as HistogramData[]);
          seriesMap.set(series.id, histogramSeries);
          allValidData.push(...(validData as HistogramData[]));
        }
      }
    });


    if (seriesMap.size > 0) {

      chart.timeScale().setVisibleRange(initialRange);
    }



    if (seriesMap.size > 0 && yTicks && yTicks.length > 0 && chartType !== 'VerticalColumn') {
      const firstSeries = Array.from(seriesMap.values())[0];
      yTicks.forEach(tick => {
        firstSeries.createPriceLine({
          price: tick.value,
          color: tick.color,
          lineWidth: 2,
          lineStyle: 1,
          axisLabelVisible: true,
          title: tick.label,
        });
      });
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
      const seriesData: { id: string; value: number; color: string; tag?: string; originalValue?: number }[] = [];


      data.forEach((series) => {
        const dataAtTime = series.data.find(d => d.time === time);
        if (dataAtTime && 'value' in dataAtTime && 'color' in dataAtTime) {
          seriesData.push({
            id: series.id,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            value: (dataAtTime as any).value,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            color: (dataAtTime as any).color || 'white)',
            tag: (dataAtTime as { tag?: string })?.tag,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            originalValue: (dataAtTime as any).originalValue
          });
        }
      });

      if (seriesData.length > 0) {
        const date = new Date(time * 1000);

        setTooltipData({
          time: date.toLocaleString('es-ES', {
            day: '2-digit',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
          series: seriesData
        });

        const tooltipWidth = Math.max(150, Math.max(...seriesData.map(s => s.id.length * 8)) + 60);
        const tooltipHeight = 80 + (seriesData.length * 25);
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
  }, [data, height, width, gameType]);

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
          style={{
            position: 'absolute',
            top: `${tooltipPosition.y}px`,
            left: `${tooltipPosition.x}px`,
            width: `${Math.max(150, Math.max(...tooltipData.series.map(s => s.id.length * 8)) + 60)}px`,
            minHeight: `${80 + (tooltipData.series.length * 25)}px`,
            padding: '12px',
            fontSize: '12px',
            zIndex: 1000,
            pointerEvents: 'none',
            border: `2px solid ${tooltipData.series[0]?.color === '#000000'
              ? 'white'
              : tooltipData.series[0]?.color || 'white'
              }`,
            borderRadius: '4px',
            background: 'rgba(0, 0, 0, 0.95)',
            color: 'white',
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif",
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div style={{ color: 'white', fontWeight: 'bold', marginBottom: '8px' }}>Resultado</div>
          {tooltipData.series.map((series) => (
            <div key={series.id} style={{ margin: '6px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: 'white', fontSize: '11px', fontWeight: '500', flex: 1 }}>
                {series.tag ? translateRouletteTag(series.tag) : series.id}
              </div>
              <div style={{ fontSize: '14px', color: 'white', fontWeight: 'bold', marginLeft: '8px' }}>
                {series.originalValue !== undefined ? Math.round(100 * series.originalValue) / 100 : Math.round(100 * series.value) / 100}
              </div>
            </div>
          ))}
          <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '10px', marginTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.2)', paddingTop: '6px' }}>
            {tooltipData.time}
          </div>
        </div>
      )}
    </div>
  );
};

export default HistogramChart;
