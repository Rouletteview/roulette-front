import { useEffect, useRef, useState } from 'react';
import {
  createChart,
  ColorType,
  IChartApi,
  AreaData,
  AreaSeries,
  MouseEventParams,
  ISeriesApi,
  UTCTimestamp,
} from 'lightweight-charts';
import { MultiSeriesData } from '../../../types/chart/types';
import { translateRouletteTag, getYAxisTicks } from '../../../utils/formatters/rouletterNumbers';

type ChartProps = {
  data: MultiSeriesData[];
  height?: number;
  width?: number;
  loading?: boolean;
  gameType?: string;
  onChartReady?: (chart: IChartApi) => void;
};

const AreaChart: React.FC<ChartProps> = ({
  data,
  height = 400,
  width = 0,
  loading = false,
  gameType,
  onChartReady
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesMapRef = useRef<Map<string, ISeriesApi<'Area'>>>(new Map());
  const lastPointTimeRef = useRef<Map<string, number>>(new Map());
  const animTokenRef = useRef<Map<string, { frameId: number | null; targetTime: number }>>(new Map());
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipData, setTooltipData] = useState<{
    time: string;
    series: { id: string; value: number; color: string; tag?: string; originalValue?: number }[];
  } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);

  // Keep latest data for tooltip to avoid stale closures
  const dataRef = useRef(data);
  useEffect(() => { dataRef.current = data; }, [data]);


  const urlParams = new URLSearchParams(window.location.search);
  const chartType = urlParams.get('chartType') || 'Area';
  const selectedTable = urlParams.get('table') || '';

  console.log('🔄 AreaChart - chartType:', chartType, 'gameType:', gameType, 'selectedTable:', selectedTable);



  const seriesColors = [
    { line: 'rgba(217, 164, 37)', top: 'rgba(217, 164, 37, 0.28)', bottom: 'rgba(217, 164, 37, 0.05)' },

  ];

  // Initialize chart once
  useEffect(() => {
    if (!chartContainerRef.current) return;


    const yTicks = getYAxisTicks(gameType, chartType);




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


    if (onChartReady) {
      onChartReady(chart);
    }


    const seriesMap = new Map<string, ISeriesApi<'Area'>>();

    data.forEach((series, index) => {
      if ('value' in series.data[0]) {
        const colorSet = seriesColors[index % seriesColors.length];
        const areaSeries = chart.addSeries(AreaSeries, {
          lineColor: colorSet.line,
          topColor: colorSet.top,
          bottomColor: colorSet.bottom,
          lastValueVisible: false,
          priceLineVisible: false,
        });

        const validData = series.data
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter(item => item && typeof item.time === 'number' && !isNaN((item as any).value))
          .sort((a, b) => Number(a.time) - Number(b.time));

        if (validData.length > 0) {
          areaSeries.setData(validData as AreaData[]);
          seriesMap.set(series.id, areaSeries);
          const last = validData[validData.length - 1] as AreaData;
          lastPointTimeRef.current.set(series.id, Number(last.time));
        }
      }
    });

    seriesMapRef.current = seriesMap;





    if (seriesMap.size > 0 && yTicks && yTicks.length > 0) {
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
      const seriesData: { id: string; value: number; color: string, tag?: string; originalValue?: number }[] = [];


      const currentData = dataRef.current || [];
      seriesMap.forEach((_series, seriesId) => {
        const originalPoint = currentData.find(s => s.id === seriesId)?.data.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (d: any) => d.time === time
        );
        const colorSet = seriesColors[Array.from(seriesMap.keys()).indexOf(seriesId) % seriesColors.length];
        if (originalPoint && 'value' in originalPoint) {
          seriesData.push({
            id: seriesId,
            value: originalPoint.value,
            tag: (originalPoint as { tag?: string })?.tag,
            color: colorSet.line,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            originalValue: (originalPoint as any).originalValue
          });
        }
      });
      if (seriesData.length > 0) {
        const timestamp = typeof time === 'number' ? time : Number(time);
        const date = new Date(timestamp * 1000);

        setTooltipData({
          time: date.toLocaleString('es-ES', {
            day: '2-digit',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }),
          series: seriesData

        });

        const toolTipWidth = Math.max(150, Math.max(...seriesData.map(s => s.id.length * 8)) + 60);
        const toolTipHeight = 80 + (seriesData.length * 25);
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
      animTokenRef.current.forEach(token => {
        if (token.frameId) cancelAnimationFrame(token.frameId);
      });
      animTokenRef.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, width, gameType]);

  // Update data and preserve/decide position without recreating chart
  useEffect(() => {
    if (!chartRef.current) return;
    if (!data || data.length === 0) return;

    const chart = chartRef.current;
    const seriesMap = seriesMapRef.current;

    const prevRange = chart.timeScale().getVisibleRange();
    let latestTime: number | null = null;
    data.forEach(series => {
      const maxTime = series.data.reduce((max, d) => Math.max(max, Number(d.time)), -Infinity);
      if (latestTime === null || maxTime > latestTime) latestTime = maxTime;
    });

    data.forEach((series, index) => {
      if (!('value' in series.data[0])) return;
      let s = seriesMap.get(series.id);
      if (!s) {
        const colorSet = seriesColors[index % seriesColors.length];
        s = chart.addSeries(AreaSeries, {
          lineColor: colorSet.line,
          topColor: colorSet.top,
          bottomColor: colorSet.bottom,
          lastValueVisible: false,
          priceLineVisible: false,
        });
        seriesMap.set(series.id, s);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const validData = series.data.filter(item => item && typeof item.time === 'number' && !isNaN((item as any).value))
        .sort((a, b) => Number(a.time) - Number(b.time));
      if (validData.length === 0) return;

      const lastPoint = validData[validData.length - 1] as AreaData;
      const prevLastTime = lastPointTimeRef.current.get(series.id);
      if (prevLastTime === undefined) {
        (s as unknown as ISeriesApi<'Area'>).setData(validData as AreaData[]);
        lastPointTimeRef.current.set(series.id, Number(lastPoint.time));
        return;
      }

      const currentLastTime = Number(lastPoint.time);
      const running = animTokenRef.current.get(series.id);
      if (running && running.targetTime === currentLastTime) return;
      if (currentLastTime > prevLastTime) {
        const preData = validData.slice(0, validData.length - 1) as AreaData[];
        (s as unknown as ISeriesApi<'Area'>).setData(preData);

        const prevPoint = preData[preData.length - 1] as AreaData | undefined;
        const startValue = prevPoint && 'value' in prevPoint ? (prevPoint as unknown as { value: number }).value : (lastPoint as unknown as { value: number }).value;
        const endValue = (lastPoint as unknown as { value: number }).value;

        const durationMs = 1000;
        const startTs = performance.now();
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
        const step = (now: number) => {
          const t = Math.min(1, (now - startTs) / durationMs);
          const eased = easeOutCubic(t);
          const interp = startValue + (endValue - startValue) * eased;
          (s as unknown as ISeriesApi<'Area'>).update({ time: currentLastTime as UTCTimestamp, value: interp } as unknown as AreaData);
          if (t < 1) {
            const frameId = requestAnimationFrame(step);
            animTokenRef.current.set(series.id, { frameId, targetTime: currentLastTime });
          } else {
            lastPointTimeRef.current.set(series.id, currentLastTime);
            (s as unknown as ISeriesApi<'Area'>).setData(validData as AreaData[]);
            animTokenRef.current.delete(series.id);
          }
        };
        const frameId = requestAnimationFrame(step);
        animTokenRef.current.set(series.id, { frameId, targetTime: currentLastTime });
      } else {
        (s as unknown as ISeriesApi<'Area'>).setData(validData as AreaData[]);
      }
    });

    if (prevRange && latestTime !== null) {
      const tolerance = 60; // seconds
      const prevTo = typeof prevRange.to === 'number' ? prevRange.to : Number(prevRange.to);
      const shouldStick = prevTo >= (latestTime - tolerance);
      if (shouldStick) {
        chart.timeScale().scrollToRealTime();

      } else {
        chart.timeScale().setVisibleRange(prevRange);

      }
    }


  }, [data]);

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
            width: `${Math.max(150, Math.max(...tooltipData.series.map(s => s.id.length * 8)) + 60)}px`,
            minHeight: `${80 + (tooltipData.series.length * 25)}px`,
            padding: '12px',
            boxSizing: 'border-box',
            fontSize: '12px',
            textAlign: 'left',
            zIndex: 1000,
            pointerEvents: 'none',
            border: '2px solid rgba(38, 166, 154, 1)',
            borderRadius: '4px',
            background: 'rgba(0, 0, 0, 0.95)',
            color: 'white',
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif",
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div style={{ color: 'rgba(38, 166, 154, 1)', fontWeight: 'bold', marginBottom: '8px' }}>Resultado</div>
          {tooltipData.series.map((series) => (
            <div key={series.id} style={{ margin: '6px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: 'white', fontSize: '11px', fontWeight: '500', flex: 1 }}>
                {series.value}
                {series.tag ? ` (${translateRouletteTag(series.tag)})` : ''}
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

export default AreaChart;
