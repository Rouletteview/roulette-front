import React from 'react';
import { ChartType } from '../../../../types/chart/types';
import { GameType } from '../../../../hooks/useFormattedChartData';
import { selectChartTypes, selectChartZoneTypes } from '../../../../types/chart/types';

interface ChartHeaderProps {
    selectedType: ChartType | '';
    gameType: GameType | '';
    selectedTable: string;
    selectedTableLabel: string;
}

export const ChartHeader: React.FC<ChartHeaderProps> = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-x-6 items-baseline">
            <h1 className="text-xl lg:text-5xl text-white font-medium">
                Sistema de <span className="font-bold">Gráficos</span> en vivo
            </h1>
            <a
                href=""
                className="text-sm lg:text-[18px] text-[#D9A425] underline font-medium"
            >
                ver video tutorial de como operar en el gráfico
            </a>
        </div>
    );
};

export const ChartStatus: React.FC<ChartHeaderProps> = ({
    selectedType,
    gameType,
    selectedTable,
    selectedTableLabel,
}) => {
    const getStatusMessage = () => {
        if (!selectedType && !gameType && !selectedTable) {
            return <span className="text-gray-400">Selecciona un tipo de gráfico, una zona y una mesa para comenzar</span>;
        }
        if (!gameType && !selectedTable) {
            return <span className="text-gray-400">Selecciona un tipo de zona y una mesa para comenzar</span>;
        }
        if (!selectedType && !gameType) {
            return <span className="text-gray-400">Selecciona un tipo de gráfico y una zona para continuar</span>;
        }
        if (!selectedType && !selectedTable) {
            return <span className="text-gray-400">Selecciona un tipo de gráfico y una mesa para continuar</span>;
        }
        if (!selectedType) {
            return <span className="text-gray-400">Selecciona un tipo de gráfico para continuar</span>;
        }
        if (!selectedTable) {
            return <span className="text-gray-400">Selecciona una mesa para continuar</span>;
        }
        if (!gameType) {
            return <span className="text-gray-400">Selecciona una zona para continuar</span>;
        }

        return (
            <>
                <span className="text-[#D9A425]">
                    {selectChartTypes.find(type => type.type === selectedType)?.label}
                </span>
                , zona del grafico{' '}
                <span className="text-[#D9A425]">
                    {selectChartZoneTypes.find(zone => zone.zone === gameType)?.label}
                </span>
                , operando en el mercado de{' '}
                <span className="text-[#D9A425]">{selectedTableLabel}</span>
            </>
        );
    };

    return (
        <div className="lg:mx-8">
            <h1 className="text-base lg:text-xl text-white font-medium inline-block border-x-1 border-white px-2">
                {getStatusMessage()}
            </h1>
        </div>
    );
}; 