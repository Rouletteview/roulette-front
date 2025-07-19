import { useCallback, useEffect, useRef } from 'react';
import { UTCTimestamp } from 'lightweight-charts';

interface ChartPosition {
    from: UTCTimestamp;
    to: UTCTimestamp;
}

export const useChartPosition = (chartType: string, gameType: string, selectedTable: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chartRef = useRef<any>(null);
    const isRestoring = useRef(false);
    const currentKey = useRef<string>('');

    const getStorageKey = useCallback(() => {
        return `chartPosition_${chartType}_${gameType}_${selectedTable}`;
    }, [chartType, gameType, selectedTable]);

    const getInitialRange = useCallback(() => {
        const key = getStorageKey();
        const savedPosition = sessionStorage.getItem(key);

        if (savedPosition) {
            try {
                const position: ChartPosition = JSON.parse(savedPosition);

                return {
                    from: position.from,
                    to: position.to,
                };
            } catch (error) {
                console.warn(' Error parsing saved position:', error);
            }
        }


        const now = Math.floor(Date.now() / 1000);
        const thirtyMinutesAgo = now - (30 * 60);


        return {
            from: thirtyMinutesAgo as UTCTimestamp,
            to: now as UTCTimestamp,
        };
    }, [getStorageKey]);

    const savePosition = useCallback(() => {
        if (!chartRef.current || isRestoring.current) return;

        try {
            const timeScale = chartRef.current.timeScale();
            const visibleRange = timeScale.getVisibleRange();

            if (visibleRange) {
                const position: ChartPosition = {
                    from: visibleRange.from as UTCTimestamp,
                    to: visibleRange.to as UTCTimestamp,
                };

                const key = getStorageKey();
                sessionStorage.setItem(key, JSON.stringify(position));

            }
        } catch (error) {
            console.warn(' Error saving chart position:', error);
        }
    }, [getStorageKey]);

    const setDefaultRange = useCallback(() => {
        if (!chartRef.current) return;

        const now = Math.floor(Date.now() / 1000);
        const thirtyMinutesAgo = now - (30 * 60);

        const timeScale = chartRef.current.timeScale();
        timeScale.setVisibleRange({
            from: thirtyMinutesAgo as UTCTimestamp,
            to: now as UTCTimestamp,
        });

    }, []);

    const restorePosition = useCallback(() => {
        if (!chartRef.current) {
            console.log('📊 No chart reference available');
            return;
        }

        try {
            const key = getStorageKey();
            console.log('📊 Looking for saved position with key:', key);

            const savedPosition = sessionStorage.getItem(key);
            console.log('📊 Saved position found:', savedPosition);

            if (savedPosition) {
                const position: ChartPosition = JSON.parse(savedPosition);
                const timeScale = chartRef.current.timeScale();

                console.log('📊 Attempting to restore position:', position);

                isRestoring.current = true;
                currentKey.current = key;

                // Try to set the visible range, but catch any errors
                try {
                    timeScale.setVisibleRange({
                        from: position.from,
                        to: position.to,
                    });
                    console.log('✅ Position restored successfully');
                } catch (setRangeError) {
                    console.warn('⚠️ Could not set visible range, chart may not have data yet:', setRangeError);
                    // Don't throw, just log the warning
                }

                setTimeout(() => {
                    isRestoring.current = false;
                }, 200);
            } else {
                console.log('📊 No saved position found, setting default range');
                isRestoring.current = true;

                setDefaultRange();
                setTimeout(() => {
                    isRestoring.current = false;
                }, 200);
            }
        } catch (error) {
            console.warn('Error restoring chart position:', error);
            isRestoring.current = false;
        }
    }, [getStorageKey, setDefaultRange]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setChartRef = useCallback((chart: any) => {
        chartRef.current = chart;

        if (chart) {
            isRestoring.current = false;

            const timeScale = chart.timeScale();
            timeScale.subscribeVisibleTimeRangeChange(() => {
                if (!isRestoring.current) {
                    savePosition();
                }
            });

            // Don't immediately attempt to restore - wait for data to be loaded
            // The chart components will call restorePosition when data is available
        }
    }, [restorePosition, savePosition, getStorageKey]);


    useEffect(() => {
        const newKey = getStorageKey();

        if (currentKey.current && currentKey.current !== newKey) {

            sessionStorage.removeItem(currentKey.current);
            console.log('🗑️ Cleared old chart position for:', currentKey.current);

            const keysToRemove = Object.keys(sessionStorage).filter(key =>
                key.startsWith('chartPosition_') &&
                (key.includes(chartType) || key.includes(gameType) || key.includes(selectedTable))
            );

            keysToRemove.forEach(key => {
                if (key !== newKey) {
                    sessionStorage.removeItem(key);
                    console.log('🗑️ Cleared related position:', key);
                }
            });
        }

        currentKey.current = newKey;
    }, [getStorageKey, chartType, gameType, selectedTable]);


    useEffect(() => {
        const handleBeforeUnload = () => {
            console.log('🔄 Before unload - saving position');
            savePosition();
        };

        const handleSaveChartPosition = () => {
            console.log('💾 Save chart position event triggered');
            savePosition();
        };

        const handleSetDefaultRange = () => {
            console.log('📊 Set default range event triggered');
            setDefaultRange();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('saveChartPosition', handleSaveChartPosition);
        window.addEventListener('setDefaultRange', handleSetDefaultRange);

        return () => {
            savePosition();
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('saveChartPosition', handleSaveChartPosition);
            window.removeEventListener('setDefaultRange', handleSetDefaultRange);
        };
    }, [savePosition, setDefaultRange]);


    useEffect(() => {
        const interval = setInterval(() => {
            savePosition();
        }, 5000);

        return () => clearInterval(interval);
    }, [savePosition]);

    const clearAllPositions = useCallback(() => {
        const keys = Object.keys(sessionStorage);
        keys.forEach(key => {
            if (key.startsWith('chartPosition_')) {
                sessionStorage.removeItem(key);
                console.log('🗑️ Cleared position:', key);
            }
        });
    }, []);

    const clearCurrentPosition = useCallback(() => {
        const key = getStorageKey();
        if (sessionStorage.getItem(key)) {
            sessionStorage.removeItem(key);

        }
    }, [getStorageKey]);

    return {
        setChartRef,
        savePosition,
        restorePosition,
        setDefaultRange,
        getInitialRange,
        clearAllPositions,
        clearCurrentPosition,
    };
}; 