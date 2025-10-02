import { useEffect, useRef, useState } from 'react';
import {
  createChart,
  ColorType,
  IChartApi,
  LineData,
  LineSeries,
  MouseEventParams,
  ISeriesApi,
  LineWidth,
  LineStyle,
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

const LineChart: React.FC<ChartProps> = ({
  data,
  height = 400,
  width = 0,
  loading = false,
  gameType,
  onChartReady
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesMapRef = useRef<Map<string, ISeriesApi<'Line'>>>(new Map());
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [hasNewData, setHasNewData] = useState(false);
  const [tooltipData, setTooltipData] = useState<{
    time: string;
    series: { id: string; value: number; color: string; tag?: string; originalValue?: number }[];
  } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);


  const urlParams = new URLSearchParams(window.location.search);
  const chartType = urlParams.get('chartType') || 'Lineal';






  const seriesColors = [
    // 'rgba(141, 52, 249, 1)',
    // 'rgba(38, 166, 154, 1)',
    // 'rgba(255, 82, 82, 1)',
    // 'rgba(255, 193, 7, 1)',
    // 'rgba(33, 150, 243, 1)',
    'rgba(217, 164, 37)',
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
        ticksVisible: false
      },
    });

    chartRef.current = chart;



    if (onChartReady) {
      onChartReady(chart);
    }


    const seriesMap = new Map<string, ISeriesApi<'Line'>>();

    data.forEach((series, index) => {
      if ('value' in series.data[0]) {
        const lineSeries = chart.addSeries(LineSeries, {
          color: seriesColors[index % seriesColors.length],
          lineWidth: 2,
          lastValueVisible: false,
          priceLineVisible: false,
        });

        const validData = series.data
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter(item => item && typeof item.time === 'number' && !isNaN((item as any).value))
          .sort((a, b) => Number(a.time) - Number(b.time));

        if (validData.length > 0) {
          lineSeries.setData(validData as LineData[]);
          seriesMap.set(series.id, lineSeries);
        }
      }
    });

    seriesMapRef.current = seriesMap;

    if (seriesMap.size > 0) {
      chart.timeScale().setVisibleRange({
        from: Math.floor(Date.now() / 1000) - (30 * 60) as UTCTimestamp,
        to: Math.floor(Date.now() / 1000) as UTCTimestamp,
      });
      setHasNewData(false);
    }


    if (seriesMap.size > 0 && yTicks && yTicks.length > 0) {
      const firstSeries = Array.from(seriesMap.values())[0];
      yTicks.forEach(tick => {
        firstSeries.createPriceLine({
          price: tick.value,
          color: tick.color,
          lineWidth: tick.lineWidth as LineWidth || 2,
          lineStyle: tick.lineStyle as LineStyle || 1,
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


      seriesMap.forEach((_series, seriesId) => {
        const originalPoint = data.find(s => s.id === seriesId)?.data.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (d: any) => d.time === time
        );
        const color = seriesColors[Array.from(seriesMap.keys()).indexOf(seriesId) % seriesColors.length];
        if (originalPoint && 'value' in originalPoint) {
          seriesData.push({
            id: seriesId,
            value: originalPoint.value,
            color,
            tag: (originalPoint as { tag?: string })?.tag,
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

    // ensure series exist and set data
    data.forEach((series, index) => {
      if (!('value' in series.data[0])) return;
      let s = seriesMap.get(series.id);
      if (!s) {
        s = chart.addSeries(LineSeries, {
          color: seriesColors[index % seriesColors.length],
          lineWidth: 2,
          lastValueVisible: false,
          priceLineVisible: false,
        });
        seriesMap.set(series.id, s);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const validData = series.data.filter(item => item && typeof item.time === 'number' && !isNaN((item as any).value))
        .sort((a, b) => Number(a.time) - Number(b.time));
      if (validData.length > 0) {
        (s as unknown as ISeriesApi<'Line'>).setData(validData as LineData[]);
      }
    });

    // decide whether to stick or preserve
    if (prevRange && latestTime !== null) {
      const tolerance = 60; // seconds
      const prevTo = typeof prevRange.to === 'number' ? prevRange.to : Number(prevRange.to);
      const shouldStick = prevTo >= (latestTime - tolerance);
      if (shouldStick) {
        chart.timeScale().scrollToRealTime();
        setHasNewData(false);
      } else {
        chart.timeScale().setVisibleRange(prevRange);
        setHasNewData(true);
      }
    }

    // watch user scroll to end to auto-hide button
    const onRangeChange = () => {
      const vr = chart.timeScale().getVisibleRange();
      if (vr && latestTime !== null) {
        const to = typeof vr.to === 'number' ? vr.to : Number(vr.to);
        if (to >= latestTime - 1) {
          setHasNewData(false);
        }
      }
    };
    chart.timeScale().subscribeVisibleTimeRangeChange(onRangeChange);

    return () => {
      chart.timeScale().unsubscribeVisibleTimeRangeChange(onRangeChange);
    };
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
      {hasNewData && (
        <button
          onClick={() => {
            if (!chartRef.current) return;
            chartRef.current.timeScale().scrollToRealTime();
            setHasNewData(false);
          }}
          style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            padding: '8px 12px',
            background: '#D9A425',
            color: '#0d1b2a',
            borderRadius: 8,
            border: 'none',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.4)'
          }}
        >
          Nueva data
        </button>
      )}
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
            border: '2px solid rgba(141, 52, 249, 1)',
            borderRadius: '4px',
            background: 'rgba(0, 0, 0, 0.95)',
            color: 'white',
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif",
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div style={{ color: 'rgba(141, 52, 249, 1)', fontWeight: 'bold', marginBottom: '8px' }}>Resultado</div>
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

export default LineChart;
