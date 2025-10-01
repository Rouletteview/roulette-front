import { useEffect, useRef, useState } from 'react';
import {
  createChart,
  ColorType,
  IChartApi,
  CandlestickSeries,
  MouseEventParams,
  UTCTimestamp,

} from 'lightweight-charts';
import { translateRouletteTag, getYAxisTicks, isVoisinDuZero, isOrphelins, isTiersDuCylindre, isPlayZero } from '../../../utils/formatters/rouletterNumbers';
import { useChartPosition } from '../../../hooks/useChartPosition';

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
  const tooltipRef = useRef<HTMLDivElement>(null);


  const urlParams = new URLSearchParams(window.location.search);
  const chartType = urlParams.get('chartType') || 'Candlestick';
  const selectedTable = urlParams.get('table') || '';

  // console.log('🔄 CandleChart - chartType:', chartType, 'gameType:', gameType, 'selectedTable:', selectedTable);

  const { setChartRef, getInitialRange } = useChartPosition(chartType, gameType || '', selectedTable);

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
    if (!chartContainerRef.current) return;

    const yTicks = getYAxisTicks(gameType, chartType);


    const debugKey = `chartPosition_${chartType}_${gameType || ''}_${selectedTable}`;
    let savedPosition = sessionStorage.getItem(debugKey);




    if (!savedPosition) {
      const allChartPositionKeys = Object.keys(sessionStorage).filter(key =>
        key.startsWith('chartPosition_') &&
        key.includes(gameType || '') &&
        key.includes(selectedTable)
      );

      for (const key of allChartPositionKeys) {
        const position = sessionStorage.getItem(key);
        if (position) {
          console.log('📊 CandleChart - found position with key:', key, position);
          savedPosition = position;
          break;
        }
      }
    }

    let initialRange;
    if (savedPosition) {
      try {
        const position = JSON.parse(savedPosition);
        initialRange = {
          from: position.from,
          to: position.to,
        };

      } catch (error) {
        console.warn('📊 CandleChart - error parsing saved position:', error);
        initialRange = getInitialRange();
      }
    } else {
      initialRange = getInitialRange();
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
    setChartRef(chart);

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
        borderVisible: false,
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
    }

    if (!data || !Array.isArray(data)) {
      console.log('CandleChart: No valid data');
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

      if (gameType === '') {
        const seriesToUse = redSeries || whiteSeries || greenSeries || defaultSeries;
        if (seriesToUse) {
          seriesToUse.createPriceLine({
            price: 18,
            color: '#D9A425',
            lineWidth: 3,
            lineStyle: 1,
            axisLabelVisible: true,
            title: '',
          });
        }
      }

      if (gameType === '') {
        const seriesToUse = redSeries || whiteSeries || greenSeries || defaultSeries;
        if (seriesToUse) {
          seriesToUse.createPriceLine({
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

      chart.timeScale().setVisibleRange(initialRange);
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
      const candleData = data.find(d => d.time === time);

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
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div ref={chartContainerRef} style={{ width: '100%', overflow: 'hidden' }} />
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
            {/* <div>Máximo: <b>{tooltipData.high}</b></div>
            <div>Mínimo: <b>{tooltipData.low}</b></div> */}
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