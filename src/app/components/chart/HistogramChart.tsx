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
import { UTCTimestamp } from 'lightweight-charts';

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
  const seriesMapRef = useRef<Map<string, ISeriesApi<'Histogram'>>>(new Map());
  const [tooltipData, setTooltipData] = useState<{
    time: string;
    series: { id: string; value: number; color: string; tag?: string; originalValue?: number }[];
  } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const [hasNewData, setHasNewData] = useState(false);


  const urlParams = new URLSearchParams(window.location.search);
  const chartType = urlParams.get('chartType') || 'VerticalColumn';




  useEffect(() => {
    if (!chartContainerRef.current) return;


    const yTicks = getYAxisTicks(gameType, chartType);
    let latestTime: number | null = null;
    if (data && data.length > 0) {
      data.forEach(series => {
        const maxTime = series.data.reduce((max, d) => Math.max(max, Number(d.time)), -Infinity);
        if (latestTime === null || maxTime > latestTime) latestTime = maxTime;
      });
    }

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



    if (onChartReady) {
      onChartReady(chart);
    }

    const seriesMap = new Map<string, ISeriesApi<'Histogram'>>();
    const allValidData: HistogramData[] = [];


    if (gameType === 'RedAndBlack') {
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


      if (yTicks && yTicks.length > 0) {
        const firstSeries = Array.from(seriesMap.values())[0];
        if (firstSeries) {
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
      }
    } else if (gameType === 'OddAndEven') {

      const evenSeries = chart.addSeries(HistogramSeries, {
        color: '#25A79B',
        lastValueVisible: false,
        priceLineVisible: false,
      });

      const oddSeries = chart.addSeries(HistogramSeries, {
        color: '#EE5351',
        lastValueVisible: false,
        priceLineVisible: false,
      });

      const evenData: HistogramData[] = [];
      const oddData: HistogramData[] = [];

      data.forEach((series) => {
        if ('value' in series.data[0] && 'color' in series.data[0]) {
          const validData = series.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .filter(item => item && typeof item.time === 'number' && !isNaN((item as any).value))
            .sort((a, b) => Number(a.time) - Number(b.time));

          validData.forEach((item) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const value = (item as any).value;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const originalValue = (item as any).originalValue;
            const numberToUse = originalValue !== undefined ? originalValue : value;


            const isEven = numberToUse % 2 === 0;

            const histogramPoint: HistogramData = {
              time: item.time,
              value: numberToUse,
              color: isEven ? '#25A79B' : '#EE5351',
            };

            if (isEven) {
              evenData.push(histogramPoint);
            } else {
              oddData.push(histogramPoint);
            }
          });
        }
      });

      if (evenData.length > 0) evenSeries.setData(evenData);
      if (oddData.length > 0) oddSeries.setData(oddData);

      seriesMap.set('even', evenSeries);
      seriesMap.set('odd', oddSeries);


      if (yTicks && yTicks.length > 0) {
        const firstSeries = evenSeries || oddSeries;
        if (firstSeries) {
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
      }
    } else if (gameType === 'HighAndLow') {

      const highSeries = chart.addSeries(HistogramSeries, {
        color: '#25A79B',
        lastValueVisible: false,
        priceLineVisible: false,
      });

      const lowSeries = chart.addSeries(HistogramSeries, {
        color: '#EE5351',
        lastValueVisible: false,
        priceLineVisible: false,
      });

      const highData: HistogramData[] = [];
      const lowData: HistogramData[] = [];

      data.forEach((series) => {
        if ('value' in series.data[0] && 'color' in series.data[0]) {
          const validData = series.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .filter(item => item && typeof item.time === 'number' && !isNaN((item as any).value))
            .sort((a, b) => Number(a.time) - Number(b.time));

          validData.forEach((item) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const value = (item as any).value;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const originalValue = (item as any).originalValue;
            const numberToUse = originalValue !== undefined ? originalValue : value;


            const isHigh = numberToUse >= 19 && numberToUse <= 36;

            const histogramPoint: HistogramData = {
              time: item.time,
              value: numberToUse,
              color: isHigh ? '#25A79B' : '#EE5351',
            };

            if (isHigh) {
              highData.push(histogramPoint);
            } else {
              lowData.push(histogramPoint);
            }
          });
        }
      });

      if (highData.length > 0) highSeries.setData(highData);
      if (lowData.length > 0) lowSeries.setData(lowData);

      seriesMap.set('high', highSeries);
      seriesMap.set('low', lowSeries);

      if (yTicks && yTicks.length > 0) {
        const firstSeries = highSeries || lowSeries;
        if (firstSeries) {
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
      }
    } else if (gameType === 'Dozen') {

      const redSeries = chart.addSeries(HistogramSeries, {
        color: '#FF0000',
        lastValueVisible: false,
        priceLineVisible: false,
      });

      const whiteSeries = chart.addSeries(HistogramSeries, {
        color: '#FFFFFF',
        lastValueVisible: false,
        priceLineVisible: false,
      });

      const greenSeries = chart.addSeries(HistogramSeries, {
        color: '#00FF00',
        lastValueVisible: false,
        priceLineVisible: false,
      });

      const redData: HistogramData[] = [];
      const whiteData: HistogramData[] = [];
      const greenData: HistogramData[] = [];

      data.forEach((series) => {
        if ('value' in series.data[0] && 'color' in series.data[0]) {
          const validData = series.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .filter(item => item && typeof item.time === 'number' && !isNaN((item as any).value))
            .sort((a, b) => Number(a.time) - Number(b.time));

          validData.forEach((item) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const value = (item as any).value;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const originalValue = (item as any).originalValue;
            const numberToUse = originalValue !== undefined ? originalValue : value;


            let color = '#FF0000';
            if (numberToUse >= 1 && numberToUse <= 12) {
              color = '#FF0000';
            } else if (numberToUse >= 13 && numberToUse <= 24) {
              color = '#FFFFFF';
            } else if (numberToUse >= 25 && numberToUse <= 36) {
              color = '#00FF00';
            }

            const histogramPoint: HistogramData = {
              time: item.time,
              value: numberToUse,
              color: color,
            };

            if (numberToUse >= 1 && numberToUse <= 12) {
              redData.push(histogramPoint);
            } else if (numberToUse >= 13 && numberToUse <= 24) {
              whiteData.push(histogramPoint);
            } else if (numberToUse >= 25 && numberToUse <= 36) {
              greenData.push(histogramPoint);
            }
          });
        }
      });

      if (redData.length > 0) redSeries.setData(redData);
      if (whiteData.length > 0) whiteSeries.setData(whiteData);
      if (greenData.length > 0) greenSeries.setData(greenData);

      seriesMap.set('red', redSeries);
      seriesMap.set('white', whiteSeries);
      seriesMap.set('green', greenSeries);

      if (yTicks && yTicks.length > 0) {
        const firstSeries = redSeries || whiteSeries || greenSeries;
        if (firstSeries) {
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
      }
    } else if (gameType === 'Column') {

      const upSeries = chart.addSeries(HistogramSeries, {
        color: '#25A69A',
        lastValueVisible: false,
        priceLineVisible: false,
      });

      const downSeries = chart.addSeries(HistogramSeries, {
        color: '#ef5350',
        lastValueVisible: false,
        priceLineVisible: false,
      });

      const upData: HistogramData[] = [];
      const downData: HistogramData[] = [];

      data.forEach((series) => {
        if ('value' in series.data[0] && 'color' in series.data[0]) {
          const validData = series.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .filter(item => item && typeof item.time === 'number' && !isNaN((item as any).value))
            .sort((a, b) => Number(a.time) - Number(b.time));

          validData.forEach((item, index) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const value = (item as any).value;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const originalValue = (item as any).originalValue;
            const numberToUse = originalValue !== undefined ? originalValue : value;

            let isUp = true;
            if (index > 0) {
              const prevItem = validData[index - 1];
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const prevValue = (prevItem as any).originalValue !== undefined ? (prevItem as any).originalValue : (prevItem as any).value;
              isUp = numberToUse >= prevValue;
            }

            const histogramPoint: HistogramData = {
              time: item.time,
              value: numberToUse,
              color: isUp ? '#25A69A' : '#ef5350',
            };

            if (isUp) {
              upData.push(histogramPoint);
            } else {
              downData.push(histogramPoint);
            }
          });
        }
      });

      if (upData.length > 0) upSeries.setData(upData);
      if (downData.length > 0) downSeries.setData(downData);

      seriesMap.set('up', upSeries);
      seriesMap.set('down', downSeries);


      if (yTicks && yTicks.length > 0) {
        const firstSeries = upSeries || downSeries;
        if (firstSeries) {
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
      }
    } else {

      const upSeries = chart.addSeries(HistogramSeries, {
        color: '#25A69A',
        lastValueVisible: false,
        priceLineVisible: false,
      });

      const downSeries = chart.addSeries(HistogramSeries, {
        color: '#ef5350',
        lastValueVisible: false,
        priceLineVisible: false,
      });

      const upData: HistogramData[] = [];
      const downData: HistogramData[] = [];

      data.forEach((series) => {
        if ('value' in series.data[0] && 'color' in series.data[0]) {
          const validData = series.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .filter(item => item && typeof item.time === 'number' && !isNaN((item as any).value))
            .sort((a, b) => Number(a.time) - Number(b.time));

          validData.forEach((item, index) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const value = (item as any).value;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const originalValue = (item as any).originalValue;

            const numberToUse = originalValue !== undefined ? originalValue : value;

            let isUp = true;
            if (index > 0) {
              const prevItem = validData[index - 1];
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const prevValue = (prevItem as any).originalValue !== undefined ? (prevItem as any).originalValue : (prevItem as any).value;
              isUp = numberToUse >= prevValue;
            }

            const histogramPoint: HistogramData = {
              time: item.time,
              value: numberToUse,
              color: isUp ? '#25A69A' : '#ef5350',
            };

            if (isUp) {
              upData.push(histogramPoint);
            } else {
              downData.push(histogramPoint);
            }
          });
        }
      });

      if (upData.length > 0) upSeries.setData(upData);
      if (downData.length > 0) downSeries.setData(downData);

      seriesMap.set('up', upSeries);
      seriesMap.set('down', downSeries);
    }



    if (seriesMap.size > 0) {
      chart.timeScale().setVisibleRange({
        from: Math.floor(Date.now() / 1000) - (30 * 60) as UTCTimestamp,
        to: Math.floor(Date.now() / 1000) as UTCTimestamp,
      });
      setHasNewData(false);
    }

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
      const seriesData: { id: string; value: number; color: string; tag?: string; originalValue?: number }[] = [];


      data.forEach((series) => {
        const dataAtTime = series.data.find(d => d.time === time);
        if (dataAtTime && 'value' in dataAtTime && 'color' in dataAtTime) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const value = (dataAtTime as any).value;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const originalValue = (dataAtTime as any).originalValue;

          let tooltipColor = (dataAtTime as { color?: string }).color || 'white';

          if (gameType === 'OddAndEven') {
            const numberToUse = originalValue !== undefined ? originalValue : value;


            const isEven = numberToUse % 2 === 0;

            tooltipColor = isEven ? '#25A79B' : '#EE5351';
          } else if (gameType === 'HighAndLow') {
            const numberToUse = originalValue !== undefined ? originalValue : value;


            const isHigh = numberToUse >= 19 && numberToUse <= 36;

            tooltipColor = isHigh ? '#25A79B' : '#EE5351';
          } else if (gameType === 'Dozen') {
            const numberToUse = originalValue !== undefined ? originalValue : value;


            if (numberToUse >= 1 && numberToUse <= 12) {
              tooltipColor = '#FF0000';
            } else if (numberToUse >= 13 && numberToUse <= 24) {
              tooltipColor = '#FFFFFF';
            } else if (numberToUse >= 25 && numberToUse <= 36) {
              tooltipColor = '#00FF00';
            }
          } else if (gameType === 'Column') {
            const numberToUse = originalValue !== undefined ? originalValue : value;

            const currentIndex = series.data.findIndex(d => d.time === time);
            let isUp = true;

            if (currentIndex > 0) {
              const prevItem = series.data[currentIndex - 1];
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const prevValue = (prevItem as any).originalValue !== undefined ? (prevItem as any).originalValue : (prevItem as any).value;
              isUp = numberToUse >= prevValue;
            }

            tooltipColor = isUp ? '#25A69A' : '#ef5350';
          }

          seriesData.push({
            id: series.id,
            value: value,
            color: tooltipColor,
            tag: (dataAtTime as { tag?: string })?.tag,
            originalValue: originalValue
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
  }, [height, width, gameType, chartType, onChartReady]);

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

    // Rebuild categories depending on gameType
    seriesMap.clear();

    if (gameType === 'RedAndBlack') {
      data.forEach((series) => {
        if (!('value' in series.data[0] && 'color' in series.data[0])) return;
        const s = chart.addSeries(HistogramSeries, { color: 'rgba(32, 178, 108, 1)', lastValueVisible: false, priceLineVisible: false });
        seriesMap.set(series.id, s);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const validData = series.data.filter(item => item && typeof item.time === 'number' && !isNaN((item as any).value)).sort((a, b) => Number(a.time) - Number(b.time));
        if (validData.length > 0) (s as unknown as ISeriesApi<'Histogram'>).setData(validData as HistogramData[]);
      });
    } else if (gameType === 'OddAndEven') {
      const even = chart.addSeries(HistogramSeries, { color: '#25A79B', lastValueVisible: false, priceLineVisible: false });
      const odd = chart.addSeries(HistogramSeries, { color: '#EE5351', lastValueVisible: false, priceLineVisible: false });
      seriesMap.set('even', even); seriesMap.set('odd', odd);
      const evenData: HistogramData[] = []; const oddData: HistogramData[] = [];
      data.forEach(series => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const validData = series.data.filter(item => item && typeof item.time === 'number' && !isNaN((item as any).value)).sort((a, b) => Number(a.time) - Number(b.time));
        validData.forEach((item) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const value = (item as any).originalValue !== undefined ? (item as any).originalValue : (item as any).value;
          const isEven = value % 2 === 0;
          const point: HistogramData = { time: item.time, value, color: isEven ? '#25A79B' : '#EE5351' };
          if (isEven) evenData.push(point); else oddData.push(point);
        });
      });
      even.setData(evenData); odd.setData(oddData);
    } else if (gameType === 'HighAndLow') {
      const high = chart.addSeries(HistogramSeries, { color: '#25A79B', lastValueVisible: false, priceLineVisible: false });
      const low = chart.addSeries(HistogramSeries, { color: '#EE5351', lastValueVisible: false, priceLineVisible: false });
      seriesMap.set('high', high); seriesMap.set('low', low);
      const highData: HistogramData[] = []; const lowData: HistogramData[] = [];
      data.forEach(series => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const validData = series.data.filter(item => item && typeof item.time === 'number' && !isNaN((item as any).value)).sort((a, b) => Number(a.time) - Number(b.time));
        validData.forEach((item) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const value = (item as any).originalValue !== undefined ? (item as any).originalValue : (item as any).value;
          const isHigh = value >= 19 && value <= 36;
          const point: HistogramData = { time: item.time, value, color: isHigh ? '#25A79B' : '#EE5351' };
          if (isHigh) highData.push(point); else lowData.push(point);
        });
      });
      high.setData(highData); low.setData(lowData);
    } else if (gameType === 'Dozen') {
      const red = chart.addSeries(HistogramSeries, { color: '#FF0000', lastValueVisible: false, priceLineVisible: false });
      const white = chart.addSeries(HistogramSeries, { color: '#FFFFFF', lastValueVisible: false, priceLineVisible: false });
      const green = chart.addSeries(HistogramSeries, { color: '#00FF00', lastValueVisible: false, priceLineVisible: false });
      seriesMap.set('red', red); seriesMap.set('white', white); seriesMap.set('green', green);
      const redData: HistogramData[] = []; const whiteData: HistogramData[] = []; const greenData: HistogramData[] = [];
      data.forEach(series => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const validData = series.data.filter(item => item && typeof item.time === 'number' && !isNaN((item as any).value)).sort((a, b) => Number(a.time) - Number(b.time));
        validData.forEach((item) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const value = (item as any).originalValue !== undefined ? (item as any).originalValue : (item as any).value;
          const point: HistogramData = { time: item.time, value, color: value <= 12 ? '#FF0000' : value <= 24 ? '#FFFFFF' : '#00FF00' };
          if (value <= 12) redData.push(point); else if (value <= 24) whiteData.push(point); else greenData.push(point);
        });
      });
      red.setData(redData); white.setData(whiteData); green.setData(greenData);
    } else if (gameType === 'Column') {
      const up = chart.addSeries(HistogramSeries, { color: '#25A69A', lastValueVisible: false, priceLineVisible: false });
      const down = chart.addSeries(HistogramSeries, { color: '#ef5350', lastValueVisible: false, priceLineVisible: false });
      seriesMap.set('up', up); seriesMap.set('down', down);
      const upData: HistogramData[] = []; const downData: HistogramData[] = [];
      data.forEach(series => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const validData = series.data.filter(item => item && typeof item.time === 'number' && !isNaN((item as any).value)).sort((a, b) => Number(a.time) - Number(b.time));
        validData.forEach((item, idx) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const value = (item as any).originalValue !== undefined ? (item as any).originalValue : (item as any).value;
          let isUp = true;
          if (idx > 0) {
            const prev = validData[idx - 1];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const prevValue = (prev as any).originalValue !== undefined ? (prev as any).originalValue : (prev as any).value;
            isUp = value >= prevValue;
          }
          const point: HistogramData = { time: item.time, value, color: isUp ? '#25A69A' : '#ef5350' };
          if (isUp) upData.push(point); else downData.push(point);
        });
      });
      up.setData(upData); down.setData(downData);
    } else {
      const up = chart.addSeries(HistogramSeries, { color: '#25A69A', lastValueVisible: false, priceLineVisible: false });
      const down = chart.addSeries(HistogramSeries, { color: '#ef5350', lastValueVisible: false, priceLineVisible: false });
      seriesMap.set('up', up); seriesMap.set('down', down);
      const upData: HistogramData[] = []; const downData: HistogramData[] = [];
      data.forEach(series => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const validData = series.data.filter(item => item && typeof item.time === 'number' && !isNaN((item as any).value)).sort((a, b) => Number(a.time) - Number(b.time));
        validData.forEach((item, idx) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const value = (item as any).originalValue !== undefined ? (item as any).originalValue : (item as any).value;
          let isUp = true;
          if (idx > 0) {
            const prev = validData[idx - 1];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const prevValue = (prev as any).originalValue !== undefined ? (prev as any).originalValue : (prev as any).value;
            isUp = value >= prevValue;
          }
          const point: HistogramData = { time: item.time, value, color: isUp ? '#25A69A' : '#ef5350' };
          if (isUp) upData.push(point); else downData.push(point);
        });
      });
      up.setData(upData); down.setData(downData);
    }

    if (prevRange && latestTime !== null) {
      const tolerance = 60;
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
  }, [data, gameType]);

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
