import { useRef, useCallback } from 'react';

export const useChartControls = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chartRefs = useRef<{ [key: string]: any }>({});

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChartReady = useCallback((chart: any, chartType: string) => {
        chartRefs.current[chartType] = chart;
    }, []);

    const handleZoomIn = useCallback((selectedType: string) => {
        const currentChart = chartRefs.current[selectedType];
        if (currentChart?.timeScale) {
            const timeScale = currentChart.timeScale();
            const visibleRange = timeScale.getVisibleRange();
            if (visibleRange) {
                const timeDiff = visibleRange.to - visibleRange.from;
                const newTimeDiff = timeDiff * 0.5;
                const center = (visibleRange.from + visibleRange.to) / 2;
                timeScale.setVisibleRange({
                    from: center - newTimeDiff / 2,
                    to: center + newTimeDiff / 2,
                });
            }
        }
    }, []);

    const handleZoomOut = useCallback((selectedType: string) => {
        const currentChart = chartRefs.current[selectedType];
        if (currentChart?.timeScale) {
            const timeScale = currentChart.timeScale();
            const visibleRange = timeScale.getVisibleRange();
            if (visibleRange) {
                const timeDiff = visibleRange.to - visibleRange.from;
                const newTimeDiff = timeDiff * 2;
                const center = (visibleRange.from + visibleRange.to) / 2;
                timeScale.setVisibleRange({
                    from: center - newTimeDiff / 2,
                    to: center + newTimeDiff / 2,
                });
            }
        }
    }, []);

    return {
        chartRefs,
        handleChartReady,
        handleZoomIn,
        handleZoomOut,
    };
}; 