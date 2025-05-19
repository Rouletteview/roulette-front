import { useMemo } from 'react';
import { CandlestickData, LineData, AreaData, HistogramData } from 'lightweight-charts';

const generateTimeSeries = (count: number, startTime: number = Date.now() / 1000) => {
    return Array.from({ length: count }, (_, i) => startTime - (count - i) * 60);
};

export const useMockCandleData = (count: number = 100) => {
    return useMemo(() => {
        const times = generateTimeSeries(count);
        let lastClose = 0.5; 

        return times.map(time => {
            const volatility = 0.3; 
            const open = lastClose;
            const close = Math.max(0, Math.min(1, lastClose + (Math.random() - 0.5) * volatility));
            const high = Math.max(open, close) + Math.random() * volatility * 0.5;
            const low = Math.min(open, close) - Math.random() * volatility * 0.5;

            lastClose = close;

            return {
                time,
                open,
                high: Math.min(1, high), 
                low: Math.max(0, low),  
                close,
            } as CandlestickData;
        });
    }, [count]);
};

export const useMockLineData = (count: number = 100) => {
    return useMemo(() => {
        const times = generateTimeSeries(count);
        let lastValue = 0.5; 

        return times.map(time => {
            const volatility = 0.25;
            const value = Math.max(0, Math.min(1, lastValue + (Math.random() - 0.5) * volatility));
            lastValue = value;

            return {
                time,
                value,
            } as LineData;
        });
    }, [count]);
};

export const useMockAreaData = (count: number = 100) => {
    return useMemo(() => {
        const times = generateTimeSeries(count);
        let lastValue = 0.5; 

        return times.map(time => {
            const volatility = 0.25; 
            const value = Math.max(0, Math.min(1, lastValue + (Math.random() - 0.5) * volatility));
            lastValue = value;

            return {
                time,
                value,
            } as AreaData;
        });
    }, [count]);
};

export const useMockHistogramData = (count: number = 100) => {
    return useMemo(() => {
        const times = generateTimeSeries(count);
        let lastValue = 0.5; 
        let previousValue = 0.5; 

        return times.map(time => {
            const volatility = 0.3; 
            const value = Math.max(0, Math.min(1, lastValue + (Math.random() - 0.5) * volatility));
            const isHigher = value > previousValue;
            previousValue = value;
            lastValue = value;

            return {
                time,
                value,
                color: isHigher ? 'rgba(32, 178, 108, 1)' : 'rgba(239, 83, 80, 1)', 
            } as HistogramData;
        });
    }, [count]);
}; 