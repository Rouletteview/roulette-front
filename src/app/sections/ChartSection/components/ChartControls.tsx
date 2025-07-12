import React from 'react';
import CustomDropdown from '../../../components/CustomDropdown';
import HistoryIcon from '../../../components/icon/HistoryIcon';
import { ChartType } from '../../../../types/chart/types';
import { GameType } from '../../../../hooks/useFormattedChartData';
import { selectChartTypes, selectChartZoneTypes } from '../../../../types/chart/types';

interface ChartControlsProps {
    selectedType: ChartType | '';
    gameType: GameType | '';
    selectedTable: string;
    tableOptions: Array<{ label: string; value: string }>;
    marketSearch: string;
    marketPage: number;
    marketHasNextPage: boolean;
    marketHasPrevPage: boolean;
    marketLoading: boolean;
    onTypeChange: (value: string) => void;
    onGameTypeChange: (value: string) => void;
    onTableChange: (value: string, label?: string) => void;
    onMarketSearch: (query: string) => void;
    onMarketPageChange: (page: number) => void;
}

export const ChartControls: React.FC<ChartControlsProps> = ({
    selectedType,
    gameType,
    selectedTable,
    tableOptions,
    marketSearch,
    marketPage,
    marketHasNextPage,
    marketHasPrevPage,
    marketLoading,
    onTypeChange,
    onGameTypeChange,
    onTableChange,
    onMarketSearch,
    onMarketPageChange,
}) => {
    const chartTypeOptions = selectChartTypes.map(type => ({
        label: type.label,
        value: type.type,
    }));

    const chartZoneOptions = selectChartZoneTypes.map(zone => ({
        label: zone.label,
        value: zone.zone
    }));

    return (
        <div className="flex justify-between">
            <div className="flex flex-wrap gap-1 text-start items-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-1 w-full">
                    <CustomDropdown
                        defaultLabel="Tipo de gráfico"
                        options={chartTypeOptions}
                        value={selectedType}
                        onChange={onTypeChange}
                        className="mr-2"
                    />

                    <CustomDropdown
                        defaultLabel="Zona de gráfico"
                        options={chartZoneOptions}
                        value={gameType}
                        onChange={onGameTypeChange}
                        className="mr-2"
                    />

                    <CustomDropdown
                        defaultLabel="Mercado a operar"
                        paginated
                        searchable
                        options={tableOptions}
                        value={selectedTable}
                        onChange={onTableChange}
                        searchQuery={marketSearch}
                        onSearchQueryChange={onMarketSearch}
                        page={marketPage}
                        onPageChange={onMarketPageChange}
                        hasNextPage={marketHasNextPage}
                        hasPrevPage={marketHasPrevPage}
                        loading={marketLoading}
                        className="mr-2"
                    />

                    <div className="ml-4">
                        <a href="/historial" className="flex items-baseline gap-x-1.5">
                            <HistoryIcon />
                            <span className="text-white text-sm font-medium underline underline-offset-1">
                                ver historial
                            </span>
                        </a>
                    </div>
                </div>
            </div>

           
            <div className="bg-[#121418F2] border-2 border-black px-6 py-2 rounded-2xl hidden lg:block">
                <h1 className="text-white text-lg font-medium">
                    Tu periodo de prueba termina el: <span className="text-[#D9A425]">23/03/25</span>
                </h1>
            </div>
        </div>
    );
}; 