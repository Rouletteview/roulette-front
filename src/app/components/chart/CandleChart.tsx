import { useEffect, useRef, useState } from 'react';
import {
  createChart,
  ColorType,
  IChartApi,
  CandlestickSeries,
  MouseEventParams,
  UTCTimestamp,
  ISeriesApi,

} from 'lightweight-charts';
import { translateRouletteTag, getYAxisTicks, isVoisinDuZero, isOrphelins, isTiersDuCylindre, isPlayZero } from '../../../utils/formatters/rouletterNumbers';


type ChartProps = {
  data: { time: UTCTimestamp; open: number; high: number; low: number; close: number; openTag?: string; closeTag?: string; isRedAndBlack?: boolean }[];
  height?: number;
  width?: number;
  loading?: boolean;
  gameType?: string;
  onChartReady?: (chart: IChartApi) => void;
};

const CandleChart: React.FC<ChartProps> = ({
  data,
  height = 400,
  width = 0,
  loading = false,
  gameType,
  onChartReady
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  const defaultSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const seriesMapRef = useRef<Map<string, ISeriesApi<'Candlestick'>>>(new Map());
  const lastCandleTimeRef = useRef<Map<string, number>>(new Map());
  const animFrameRef = useRef<number | null>(null);
  const lastRenderedCandleRef = useRef<Map<string, { time: number; open: number; high: number; low: number; close: number }>>(new Map());

  const dataRef = useRef<typeof data>(data);

  const tooltipRef = useRef<HTMLDivElement>(null);
  const [hasNewData, setHasNewData] = useState(false);


  const urlParams = new URLSearchParams(window.location.search);
  const chartType = urlParams.get('chartType') || 'Candlestick';




  const [tooltipData, setTooltipData] = useState<{
    time: string;
    price: number;
    isUp: boolean;
    open: number;
    close: number;
    high: number;
    low: number;
    openTag?: string;
    closeTag?: string;
  } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const yTicks = getYAxisTicks(gameType, chartType);
    const prevRange = chartRef.current?.timeScale().getVisibleRange();
    let latestTime: number | null = null;
    if (data && data.length > 0) {
      latestTime = data.reduce((max, d) => Math.max(max, Number(d.time)), -Infinity);
    }



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


    if (onChartReady) {
      onChartReady(chart);
    }


    const isRedAndBlack = gameType === 'RedAndBlack';
    const isDozen = gameType === 'Dozen';
    const isSpecialGame = gameType === 'VoisinsDuZero' || gameType === 'Orphelins' || gameType === 'TiersDuCylindre' || gameType === 'PlayZero';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let redSeries: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let blackSeries: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let greenSeries: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let whiteSeries: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let defaultSeries: any = null;

    if (isRedAndBlack) {

      redSeries = chart.addSeries(CandlestickSeries, {
        upColor: '#FF0000',
        downColor: '#FF0000',
        borderVisible: true,
        borderUpColor: '#FFFFFF',
        borderDownColor: '#FFFFFF',
        wickUpColor: '#FF0000',
        wickDownColor: '#FF0000',
        lastValueVisible: false,
        priceLineVisible: false,
      });

      blackSeries = chart.addSeries(CandlestickSeries, {
        upColor: '#000000',
        downColor: '#000000',
        borderVisible: false,
        wickUpColor: '#000000',
        wickDownColor: '#000000',
        lastValueVisible: false,
        priceLineVisible: false,
      });

      greenSeries = chart.addSeries(CandlestickSeries, {
        upColor: '#00FF00',
        downColor: '#00FF00',
        borderVisible: false,
        wickUpColor: '#00FF00',
        wickDownColor: '#00FF00',
        lastValueVisible: false,
        priceLineVisible: false,
      });
    } else if (isDozen) {

      redSeries = chart.addSeries(CandlestickSeries, {
        upColor: '#FF0000',
        downColor: '#FF0000',
        borderVisible: false,
        wickUpColor: '#FF0000',
        wickDownColor: '#FF0000',
        lastValueVisible: false,
        priceLineVisible: false,
      });

      whiteSeries = chart.addSeries(CandlestickSeries, {
        upColor: '#FFFFFF',
        downColor: '#FFFFFF',
        borderVisible: false,
        wickUpColor: '#FFFFFF',
        wickDownColor: '#FFFFFF',
        lastValueVisible: false,
        priceLineVisible: false,
      });

      greenSeries = chart.addSeries(CandlestickSeries, {
        upColor: '#00FF00',
        downColor: '#00FF00',
        borderVisible: false,
        wickUpColor: '#00FF00',
        wickDownColor: '#00FF00',
        lastValueVisible: false,
        priceLineVisible: false,
      });
    } else if (isSpecialGame) {

      greenSeries = chart.addSeries(CandlestickSeries, {
        upColor: '#25A69A',
        downColor: '#25A69A',
        borderVisible: false,
        wickUpColor: '#25A69A',
        wickDownColor: '#25A69A',
        lastValueVisible: false,
        priceLineVisible: false,
      });

      redSeries = chart.addSeries(CandlestickSeries, {
        upColor: '#ef5350',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#ef5350',
        wickDownColor: '#ef5350',
        lastValueVisible: false,
        priceLineVisible: false,
      });
    } else {

      defaultSeries = chart.addSeries(CandlestickSeries, {
        upColor: 'rgba(38, 166, 154, 1)',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: 'rgba(38, 166, 154, 1)',
        wickDownColor: '#ef5350',
        lastValueVisible: false,
        priceLineVisible: false,
      });

      defaultSeriesRef.current = defaultSeries;
    }
    seriesMapRef.current.clear();
    if (defaultSeries) seriesMapRef.current.set('default', defaultSeries);
    if (redSeries) seriesMapRef.current.set('red', redSeries);
    if (blackSeries) seriesMapRef.current.set('black', blackSeries);
    if (greenSeries) seriesMapRef.current.set('green', greenSeries);
    if (whiteSeries) seriesMapRef.current.set('white', whiteSeries);

    if (!data || !Array.isArray(data)) {
      return;
    }

    const stripCandle = (candle: unknown) => {
      if (
        typeof candle === 'object' &&
        candle !== null &&
        'time' in candle &&
        'open' in candle &&
        'high' in candle &&
        'low' in candle &&
        'close' in candle
      ) {
        return {
          time: (candle as { time: UTCTimestamp }).time,
          open: (candle as { open: number }).open,
          high: (candle as { high: number }).high,
          low: (candle as { low: number }).low,
          close: (candle as { close: number }).close,
        };
      }
      throw new Error('Invalid candle data');
    };

    const validData = [
      ...data
    ].sort((a, b) => Number(a.time) - Number(b.time));

    if (validData.length > 0) {
      if (isRedAndBlack) {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const redData: any[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const blackData: any[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const greenData: any[] = [];

        validData.forEach(candle => {
          const strippedCandle = stripCandle(candle);
          if (candle.closeTag === 'Red') {
            redData.push(strippedCandle);
          } else if (candle.closeTag === 'Black') {
            blackData.push(strippedCandle);
          } else if (candle.closeTag === 'Green' || candle.closeTag === 'Zero') {
            greenData.push(strippedCandle);
          }
        });

        if (redData.length > 0) redSeries.setData(redData);
        if (blackData.length > 0) blackSeries.setData(blackData);
        if (greenData.length > 0) greenSeries.setData(greenData);

        const firstSeries = redSeries || blackSeries || greenSeries;

        if (firstSeries && yTicks && yTicks.length > 0 && chartType !== 'Candlestick') {
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
      } else if (isDozen) {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const redData: any[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const whiteData: any[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const greenData: any[] = [];

        validData.forEach(candle => {
          const strippedCandle = stripCandle(candle);
          const closeValue = candle.close;


          if (closeValue >= 1 && closeValue <= 12) {

            redData.push(strippedCandle);
          } else if (closeValue >= 13 && closeValue <= 24) {

            whiteData.push(strippedCandle);
          } else if (closeValue >= 25 && closeValue <= 36) {

            greenData.push(strippedCandle);
          }
        });

        if (redData.length > 0) redSeries.setData(redData);
        if (whiteData.length > 0) whiteSeries.setData(whiteData);
        if (greenData.length > 0) greenSeries.setData(greenData);

        const firstSeries = redSeries || whiteSeries || greenSeries;

        if (firstSeries && yTicks && yTicks.length > 0 && chartType !== 'Candlestick') {
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
      } else if (isSpecialGame) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const greenData: any[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const redData: any[] = [];

        validData.forEach(candle => {
          const strippedCandle = stripCandle(candle);
          const closeValue = candle.close;


          let belongsToGameType = false;

          if (gameType === 'VoisinsDuZero') {
            belongsToGameType = isVoisinDuZero(closeValue);
          } else if (gameType === 'Orphelins') {
            belongsToGameType = isOrphelins(closeValue);
          } else if (gameType === 'TiersDuCylindre') {
            belongsToGameType = isTiersDuCylindre(closeValue);
          } else if (gameType === 'PlayZero') {
            belongsToGameType = isPlayZero(closeValue);
          }


          if (belongsToGameType || closeValue === 0) {
            greenData.push(strippedCandle);
          } else {
            redData.push(strippedCandle);
          }
        });

        if (greenData.length > 0) greenSeries.setData(greenData);
        if (redData.length > 0) redSeries.setData(redData);

        const firstSeries = greenSeries || redSeries;

        if (firstSeries && yTicks && yTicks.length > 0 && chartType !== 'Candlestick') {
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
      } else {

        defaultSeries.setData(validData.map(stripCandle));
        lastCandleTimeRef.current.set('default', Number(validData[validData.length - 1].time));
        lastRenderedCandleRef.current.set('default', {
          time: Number(validData[validData.length - 1].time),
          open: validData[validData.length - 1].open,
          high: validData[validData.length - 1].high,
          low: validData[validData.length - 1].low,
          close: validData[validData.length - 1].close,
        });

        if (yTicks && yTicks.length > 0 && chartType !== 'Candlestick') {
          yTicks.forEach(tick => {
            defaultSeries.createPriceLine({
              price: tick.value,
              color: tick.color,
              lineWidth: 2,
              lineStyle: 1,
              axisLabelVisible: true,
              title: tick.label,
            });
          });
        }


        if (gameType === '' && defaultSeries) {
          defaultSeries.createPriceLine({
            price: 18,
            color: '#D9A425',
            lineWidth: 3,
            lineStyle: 1,
            axisLabelVisible: true,
            title: '',
          });
        }

        if (gameType === '' && defaultSeries) {
          defaultSeries.createPriceLine({
            price: 18,
            color: '#D9A425',
            lineWidth: 3,
            lineStyle: 1,
            axisLabelVisible: true,
            title: '',
          });
        }
      }




      const universalSeriesToUse = redSeries || whiteSeries || greenSeries || blackSeries || defaultSeries;
      if (universalSeriesToUse) {

        if (gameType !== 'Column' && gameType !== 'Dozen') {
          universalSeriesToUse.createPriceLine({
            price: 18,
            color: '#D9A425',
            lineWidth: 3,
            lineStyle: 1,
            axisLabelVisible: true,
            title: '',
          });
        }


        if (gameType === 'Column' || gameType === 'Dozen') {
          universalSeriesToUse.createPriceLine({
            price: 12,
            color: '#D9A425',
            lineWidth: 2,
            lineStyle: 1,
            axisLabelVisible: true,
            title: '',
          });

          universalSeriesToUse.createPriceLine({
            price: 24,
            color: '#D9A425',
            lineWidth: 2,
            lineStyle: 1,
            axisLabelVisible: true,
            title: '',
          });
        }
      }

      const latestUnix = (() => {
        const arr = dataRef.current || [];
        if (arr.length === 0) return Math.floor(Date.now() / 1000);
        return arr.reduce((max, d) => Math.max(max, Number(d.time)), -Infinity);
      })();
      if (Number.isFinite(latestUnix)) {
        chart.timeScale().setVisibleRange({
          from: (latestUnix - 30 * 60) as UTCTimestamp,
          to: latestUnix as UTCTimestamp,
        });
      } else {
        chart.timeScale().scrollToRealTime();
      }

      if (prevRange && latestTime !== null && latestTime !== -Infinity) {
        const tolerance = 1;
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
      const currentData = dataRef.current || [];
      const candleData = currentData.find(d => d.time === time);

      if (candleData && typeof candleData === 'object' && 'close' in candleData && candleData.close !== null) {
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
          price: 'closeOriginal' in candleData && typeof candleData.closeOriginal === 'number' ? candleData.closeOriginal : candleData.close,
          isUp,
          open: 'openOriginal' in candleData && typeof candleData.openOriginal === 'number' ? candleData.openOriginal : candleData.open,
          close: 'closeOriginal' in candleData && typeof candleData.closeOriginal === 'number' ? candleData.closeOriginal : candleData.close,
          high: 'highOriginal' in candleData && typeof candleData.highOriginal === 'number' ? candleData.highOriginal : candleData.high,
          low: 'lowOriginal' in candleData && typeof candleData.lowOriginal === 'number' ? candleData.lowOriginal : candleData.low,
          openTag: candleData.openTag,
          closeTag: candleData.closeTag,
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
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, width, gameType]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const isRedAndBlack = gameType === 'RedAndBlack';
    const isDozen = gameType === 'Dozen';
    const isSpecialGame = gameType === 'VoisinsDuZero' || gameType === 'Orphelins' || gameType === 'TiersDuCylindre' || gameType === 'PlayZero';

    const sorted = [...data].sort((a, b) => Number(a.time) - Number(b.time));

    type Candle = { time: number; open: number; high: number; low: number; close: number };

    const seriesBuckets = new Map<string, Candle[]>();
    if (isRedAndBlack) {
      seriesBuckets.set('red', []); seriesBuckets.set('black', []); seriesBuckets.set('green', []);
      sorted.forEach(c => {
        const s: Candle = { time: Number(c.time), open: c.open, high: c.high, low: c.low, close: c.close };
        if (c.closeTag === 'Red') seriesBuckets.get('red')!.push(s);
        else if (c.closeTag === 'Black') seriesBuckets.get('black')!.push(s);
        else if (c.closeTag === 'Green' || c.closeTag === 'Zero') seriesBuckets.get('green')!.push(s);
      });
    } else if (isDozen) {
      seriesBuckets.set('red', []); seriesBuckets.set('white', []); seriesBuckets.set('green', []);
      sorted.forEach(c => {
        const v = c.close; const s: Candle = { time: Number(c.time), open: c.open, high: c.high, low: c.low, close: c.close };
        if (v >= 1 && v <= 12) seriesBuckets.get('red')!.push(s);
        else if (v >= 13 && v <= 24) seriesBuckets.get('white')!.push(s);
        else if (v >= 25 && v <= 36) seriesBuckets.get('green')!.push(s);
      });
    } else if (isSpecialGame) {
      seriesBuckets.set('green', []); seriesBuckets.set('red', []);
      sorted.forEach(c => {
        const v = c.close; const s: Candle = { time: Number(c.time), open: c.open, high: c.high, low: c.low, close: c.close };
        const belongs = (gameType === 'VoisinsDuZero' && isVoisinDuZero(v)) ||
          (gameType === 'Orphelins' && isOrphelins(v)) ||
          (gameType === 'TiersDuCylindre' && isTiersDuCylindre(v)) ||
          (gameType === 'PlayZero' && isPlayZero(v));
        if (belongs || v === 0) seriesBuckets.get('green')!.push(s); else seriesBuckets.get('red')!.push(s);
      });
    } else {
      seriesBuckets.set('default', sorted.map(c => ({ time: Number(c.time), open: c.open, high: c.high, low: c.low, close: c.close })));
    }

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const animateSeries = (key: string, candles: Candle[], durationMs: number) => {
      const s = seriesMapRef.current.get(key);
      if (!s || candles.length === 0) return;
      const prevTime = lastCandleTimeRef.current.get(key) ?? null;
      const last = candles[candles.length - 1];
      const currentTime = last.time;

      // seed if first time
      if (prevTime === null) {
        s.setData(candles.map(c => ({ time: c.time as UTCTimestamp, open: c.open, high: c.high, low: c.low, close: c.close })));
        lastCandleTimeRef.current.set(key, currentTime);
        lastRenderedCandleRef.current.set(key, { time: currentTime, open: last.open, high: last.high, low: last.low, close: last.close });
        return;
      }

      const pre = candles.slice(0, -1);
      const end = last;
      const startSeed = currentTime > prevTime
        ? (pre[pre.length - 1] ? { open: pre[pre.length - 1].close, high: pre[pre.length - 1].close, low: pre[pre.length - 1].close, close: pre[pre.length - 1].close } : { open: end.open, high: end.high, low: end.low, close: end.open })
        : (lastRenderedCandleRef.current.get(key) && lastRenderedCandleRef.current.get(key)!.time === currentTime
          ? lastRenderedCandleRef.current.get(key)!
          : { time: currentTime, open: end.open, high: end.high, low: end.low, close: end.close });

      s.setData(pre.map(c => ({ time: c.time as UTCTimestamp, open: c.open, high: c.high, low: c.low, close: c.close })));

      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      const startTs = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - startTs) / durationMs);
        const e = easeOutCubic(t);
        const lerp = (a: number, b: number) => a + (b - a) * e;
        const startOpen = (startSeed as { open: number }).open;
        const startHigh = (startSeed as { high: number }).high;
        const startLow = (startSeed as { low: number }).low;
        const startClose = (startSeed as { close: number }).close;
        s.update({
          time: currentTime as UTCTimestamp,
          open: lerp(startOpen, end.open),
          high: lerp(startHigh, end.high),
          low: lerp(startLow, end.low),
          close: lerp(startClose, end.close),
        });
        if (t < 1) {
          animFrameRef.current = requestAnimationFrame(step);
        } else {
          lastCandleTimeRef.current.set(key, currentTime);
          lastRenderedCandleRef.current.set(key, { time: currentTime, open: end.open, high: end.high, low: end.low, close: end.close });
          s.setData(candles.map(c => ({ time: c.time as UTCTimestamp, open: c.open, high: c.high, low: c.low, close: c.close })));
          animFrameRef.current = null;
        }
      };
      animFrameRef.current = requestAnimationFrame(step);
    };

    seriesBuckets.forEach((candles, key) => animateSeries(key, candles, 1000));
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
      <div ref={chartContainerRef} style={{ width: '100%', overflow: 'hidden' }} />
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
            width: '160px',
            minHeight: '120px',
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
            Resultados
          </div>
          <div style={{ fontSize: '20px', margin: '8px 0px', color: 'white', fontWeight: 'bold' }}>
            {Math.round(100 * tooltipData.price) / 100}
          </div>
          <div style={{ margin: '8px 0', fontSize: '13px' }}>
            <div>Abre: <b>{tooltipData.open}</b> {tooltipData.openTag && `(${translateRouletteTag(tooltipData.openTag)})`}</div>
            <div>Cierra: <b>{tooltipData.close}</b> {tooltipData.closeTag && `(${translateRouletteTag(tooltipData.closeTag)})`}</div>

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