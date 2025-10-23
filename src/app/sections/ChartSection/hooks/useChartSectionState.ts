import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { ChartType } from '../../../../types/chart/types';
import { GameType } from '../../../../hooks/useFormattedChartData';
import { selectChartTypes, selectChartZoneTypes } from '../../../../types/chart/types';

export interface ChartSectionState {
    selectedType: ChartType | '';
    gameType: GameType | '';
    selectedTable: string;
    selectedTableLabel: string;
    marketSearch: string;
    marketPage: number;
    debouncedSearch: string;
    isChartFullscreen: boolean;
}

export const useChartSectionState = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [state, setState] = useState<ChartSectionState>({
        selectedType: '',
        gameType: '',
        selectedTable: '',
        selectedTableLabel: '',
        marketSearch: '',
        marketPage: 1,
        debouncedSearch: '',
        isChartFullscreen: false,
    });


    useEffect(() => {
        const timer = setTimeout(() => {
            setState(prev => ({ ...prev, debouncedSearch: prev.marketSearch }));
        }, 300);
        return () => clearTimeout(timer);
    }, [state.marketSearch]);


    useEffect(() => {
        const wasFullscreen = sessionStorage.getItem('chartFullscreen') === 'true';
        if (wasFullscreen) {
            setState(prev => ({ ...prev, isChartFullscreen: true }));
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem('chartFullscreen', state.isChartFullscreen ? 'true' : 'false');
    }, [state.isChartFullscreen]);


    useEffect(() => {
        const chartType = searchParams.get('chartType') as ChartType;
        const chartZone = searchParams.get('chartZone') as GameType;
        const table = searchParams.get('table');

        const updates: Partial<ChartSectionState> = {};


        if (chartType && selectChartTypes.some(type => type.type === chartType)) {
            updates.selectedType = chartType;
        }
        if (chartZone && selectChartZoneTypes.some(zone => zone.zone === chartZone)) {
            updates.gameType = chartZone;
        }
        if (table) {
            updates.selectedTable = table;
        }

        if (Object.keys(updates).length > 0) {
            setState(prev => ({ ...prev, ...updates }));
        }
    }, [searchParams]);

    const updateState = (updates: Partial<ChartSectionState>) => {
        setState(prev => ({ ...prev, ...updates }));
    };

    const handleTypeChange = (value: string) => {
        const chartType = value as ChartType;
        updateState({ selectedType: chartType });
        setSearchParams(prev => {
            prev.set('chartType', value);
            return prev;
        });
    };

    const handleGameTypeChange = (value: string) => {
        const gameType = value as GameType;
        updateState({ gameType });
        setSearchParams(prev => {
            prev.set('chartZone', value);
            return prev;
        });
    };

    const handleTableChange = (value: string, label?: string) => {
        updateState({
            selectedTable: value,
            selectedTableLabel: label || ''
        });
        setSearchParams(prev => {
            prev.set('table', value);
            return prev;
        });
    };

    const handleMarketSearch = (query: string) => {
        updateState({
            marketSearch: query,
            marketPage: 1
        });
    };

    const handleMarketPageChange = (page: number) => {
        updateState({ marketPage: page });
    };

    const setFullscreen = (isFullscreen: boolean) => {
        updateState({ isChartFullscreen: isFullscreen });
    };

    const resetState = () => {
        setState({
            selectedType: '',
            gameType: '',
            selectedTable: '',
            selectedTableLabel: '',
            marketSearch: '',
            marketPage: 1,
            debouncedSearch: '',
            isChartFullscreen: false,
        });
        setSearchParams({});
    };

    return {
        state,
        updateState,
        handleTypeChange,
        handleGameTypeChange,
        handleTableChange,
        handleMarketSearch,
        handleMarketPageChange,
        setFullscreen,
        resetState,
    };
}; 