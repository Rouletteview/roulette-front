import React from 'react';
import { Suspense } from 'react';
import CandleChart from '../../../components/chart/CandleChart';
import AreaChart from '../../../components/chart/AreaChart';
import LineChart from '../../../components/chart/LineChart';
import HistogramChart from '../../../components/chart/HistogramChart';
import { ChartType } from '../../../../types/chart/types';
import { GameType } from '../../../../hooks/useFormattedChartData';
import { UTCTimestamp } from 'lightweight-charts';

interface ChartRendererProps {
    selectedType: ChartType | '';
    gameType: GameType | '';
    selectedTable: string;
    chartFormattedData: unknown[];
    chartContainerWidth: number;
    chartLoading: boolean;
    onChartReady: (chart: unknown, chartType: string) => void;
    isFullscreen?: boolean;
}

const ChartPlaceholder = () => (
    <div className="flex items-center justify-center w-full h-[550px] bg-[#0d1b2a]">
        <div className="text-center">
            <h2 className="text-white text-xl font-medium mb-2">
                Selecciona un tipo de gráfico, una zona y un mercado
            </h2>
            <p className="text-gray-400">
                Por favor, elige un tipo de gráfico, una zona y un mercado para visualizar los datos
            </p>
        </div>
    </div>
);

const LoadingChart = ({ height = 550 }: { height?: number }) => (
    <div
        className="flex items-center justify-center w-full bg-[#0d1b2a]"
        style={{ height: `${height}px` }}
    >
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9A425] mx-auto mb-4"></div>
            <p className="text-white text-sm">Cargando datos del gráfico...</p>
        </div>
    </div>
);

export const ChartRenderer: React.FC<ChartRendererProps> = ({
    selectedType,
    gameType,
    selectedTable,
    chartFormattedData,
    chartContainerWidth,
    chartLoading,
    onChartReady,
    isFullscreen = false,
}) => {
    const chartWidth = isFullscreen ? 1000 : (chartContainerWidth || 320);
    const chartHeight = isFullscreen ? 620 : 550;

    const renderChart = () => {

        if (chartLoading) {
            return <LoadingChart height={chartHeight} />;
        }

        if (!selectedType || !gameType || !selectedTable) {
            return <ChartPlaceholder />;
        }

        const commonProps = {
            width: chartWidth,
            height: chartHeight,
            loading: chartLoading,
            gameType,
            onChartReady: (chart: unknown) => onChartReady(chart, selectedType),
        };

        switch (selectedType) {
            case 'Candlestick':
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (chartFormattedData.length > 0 && (chartFormattedData[0] as any)?.data && (chartFormattedData[0] as any).data.length > 0) {
                    return (
                        <CandleChart
                            {...commonProps}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            data={(chartFormattedData[0] as any).data as unknown as {
                                time: UTCTimestamp;
                                open: number;
                                high: number;
                                low: number;
                                close: number;
                                openTag?: string;
                                closeTag?: string;
                                isRedAndBlack?: boolean;
                            }[]}
                        />
                    );
                }
                return <LoadingChart height={chartHeight} />;

            case 'Area':
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return <AreaChart {...commonProps} data={chartFormattedData as any} />;

            case 'Lineal':
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return <LineChart {...commonProps} data={chartFormattedData as any} />;

            case 'VerticalColumn':
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return <HistogramChart {...commonProps} data={chartFormattedData as any} />;

            default:
                return <ChartPlaceholder />;
        }
    };

    return (
        <Suspense fallback={<LoadingChart height={chartHeight} />}>
            <div className="lg:cursor-default cursor-pointer relative group w-full max-w-full overflow-hidden">
                <div className=" inset-0 bg-black/0 hover:bg-black/10 transition-all duration-200 lg:hidden pointer-events-none z-10 rounded-lg " />
                {renderChart()}
            </div>
        </Suspense>
    );
}; 