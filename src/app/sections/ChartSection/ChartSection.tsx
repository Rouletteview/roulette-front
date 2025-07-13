import React, { useRef, useEffect, useState } from 'react';
import { useQueryParamsCleanup } from '../../../hooks/useQueryParamsCleanup';
import { useChartSectionState } from './hooks/useChartSectionState';
import { useChartData } from './hooks/useChartData';
import { useChartControls } from './hooks/useChartControls';
import { ChartHeader, ChartStatus } from './components/ChartHeader';
import { ChartControls } from './components/ChartControls';
import { ChartRenderer } from './components/ChartRenderer';
import Controls from '../../components/Controls';
import NumbersDisplay from '../../components/NumbersDisplay';
import UserInfo from '../../components/UserInfo';
import Update from '../../components/Update';
import { FullscreenChartModal } from './components/FullscreenChartModal';
import BetSection from '../BetSection/BetSection';
// import BetModal from '../../components/BetModal';

function useContainerWidth() {
    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);



    useEffect(() => {
        function updateWidth() {
            if (ref.current) {
                setWidth(ref.current.offsetWidth);
            }
        }
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    return [ref, width] as const;
}

const ChartSection: React.FC = () => {

    useQueryParamsCleanup();


    const {
        state,
        handleTypeChange,
        handleGameTypeChange,
        handleTableChange,
        handleMarketSearch,
        handleMarketPageChange,
        setFullscreen,
    } = useChartSectionState();

    const {
        tableOptions,
        chartFormattedData,
        formattedNumbers,
        probabilities,
        marketLoading,
        chartLoading,
        marketHasNextPage,
        marketHasPrevPage,
    } = useChartData(
        state.selectedType,
        state.gameType,
        state.selectedTable,
        state.debouncedSearch,
        state.marketPage
    );

    const {
        handleChartReady,
        handleZoomIn,
        handleZoomOut,
    } = useChartControls();

    const [chartContainerRef, chartContainerWidth] = useContainerWidth();


    useEffect(() => {
        if (state.selectedTable && tableOptions.length > 0) {
            const tableOption = tableOptions.find((option: { label: string; value: string }) => option.value === state.selectedTable);
            if (tableOption && tableOption.label !== state.selectedTableLabel) {
                handleTableChange(state.selectedTable, tableOption.label);
            }
        }
    }, [tableOptions, state.selectedTable, state.selectedTableLabel]);

    const onZoomIn = () => handleZoomIn(state.selectedType);
    const onZoomOut = () => handleZoomOut(state.selectedType);



    return (

        <section className="bg-[#121418F2] py-6 lg:pt-10 lg:pb-6 px-6 lg:px-24">
            {/* <BetModal open={isOpen} onClose={() => setIsOpen(false)} /> */}
            <div className="flex justify-end w-full">
                <div className="bg-[#121418F2] border-2 border-black px-6 py-2 rounded-2xl lg:hidden block mb-2">
                    <h1 className="text-white text-[12px] font-medium">
                        Tu periodo de prueba termina el: <span className="text-[#D9A425]">23/03/25</span>
                    </h1>
                </div>
            </div>

            {/* header */}
            <ChartHeader
                selectedType={state.selectedType}
                gameType={state.gameType}
                selectedTable={state.selectedTable}
                selectedTableLabel={state.selectedTableLabel}
            />

            {/* chart controls */}
            <section className="my-10">
                <div className="flex flex-col gap-9 lg:gap-2">
                    <ChartStatus
                        selectedType={state.selectedType}
                        gameType={state.gameType}
                        selectedTable={state.selectedTable}
                        selectedTableLabel={state.selectedTableLabel}
                    />

                    <ChartControls
                        selectedType={state.selectedType}
                        gameType={state.gameType}
                        selectedTable={state.selectedTable}
                        tableOptions={tableOptions}
                        marketSearch={state.marketSearch}
                        marketPage={state.marketPage}
                        marketHasNextPage={marketHasNextPage}
                        marketHasPrevPage={marketHasPrevPage}
                        marketLoading={marketLoading}
                        onTypeChange={handleTypeChange}
                        onGameTypeChange={handleGameTypeChange}
                        onTableChange={handleTableChange}
                        onMarketSearch={handleMarketSearch}
                        onMarketPageChange={handleMarketPageChange}
                    />
                </div>
            </section>

            {/* chart section */}
            <section className="flex flex-col lg:flex-row w-full gap-4">
                <div className="order-2 lg:order-1 w-full lg:flex-1 lg:mx-2.5 flex flex-col">
                    <div className="flex flex-col-reverse lg:flex-row w-full gap-4">
                        <div className="flex flex-row w-full">
                            <div className="flex flex-col w-full">
                                <div
                                    ref={chartContainerRef}
                                    className="relative flex-1 bg-[#0d1b2a] p-4 flex flex-col items-center lg:items-start w-full max-w-full overflow-x-hidden"
                                >
                                    <Controls
                                        setIsChartFullscreen={setFullscreen}
                                        onZoomIn={onZoomIn}
                                        onZoomOut={onZoomOut}
                                    />

                                    <ChartRenderer
                                        selectedType={state.selectedType}
                                        gameType={state.gameType}
                                        selectedTable={state.selectedTable}
                                        chartFormattedData={chartFormattedData}
                                        chartContainerWidth={chartContainerWidth}
                                        chartLoading={chartLoading}
                                        onChartReady={handleChartReady}
                                    />

                                    <Update
                                        selectedType={state.selectedType}
                                        gameType={state.gameType}
                                        selectedTable={state.selectedTable}
                                        loading={chartLoading}
                                    />
                                </div>

                                <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-6 mt-4">
                                    <div className="block lg:hidden w-full">
                                        <BetSection
                                            gameType={state.gameType}
                                            probabilities={probabilities}
                                        />
                                    </div>
                                    <NumbersDisplay
                                        numbers={formattedNumbers}
                                        loading={chartLoading}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 flex-col items-center lg:items-start gap-4">
                            <UserInfo />
                            <div className="hidden lg:flex">
                                <BetSection
                                    gameType={state.gameType}
                                    probabilities={probabilities}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <FullscreenChartModal
                isOpen={state.isChartFullscreen}
                onClose={() => setFullscreen(false)}
                chartType={state.selectedType}
                selectedTableLabel={state.selectedTableLabel}
            >
                <ChartRenderer
                    selectedType={state.selectedType}
                    gameType={state.gameType}
                    selectedTable={state.selectedTable}
                    chartFormattedData={chartFormattedData}
                    chartContainerWidth={chartContainerWidth}
                    chartLoading={chartLoading}
                    onChartReady={handleChartReady}
                    isFullscreen={true}
                />

                <div className="absolute bottom-4 right-4 left-4 flex justify-end pointer-events-none">
                    <div className="pointer-events-auto">
                        <Update
                            selectedType={state.selectedType}
                            gameType={state.gameType}
                            selectedTable={state.selectedTable}
                        />
                    </div>
                </div>
            </FullscreenChartModal>


        </section>
    );
};

export default ChartSection; 