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
import { useBetStatusStore } from '../../../stores/betStatusStore';
import LostBet from '../../components/bet/LostBet';
import SuccessBet from '../../components/bet/SuccessBet';
import PlacedBet from '../../components/bet/PlacedBet';
import { Query } from '../../../graphql/generated/types';
import SliderComponent from '../../components/slider/Slider';






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

const ChartSection: React.FC<{ subscriptionData: Partial<Query> | undefined, handleStartFreeSubscription: () => void }> = ({ subscriptionData, handleStartFreeSubscription }) => {


    const freeSubscription = subscriptionData?.GetCurrentUserSubscription?.Payments

    const endFreeDate = subscriptionData?.GetCurrentUserSubscription?.EndDate


    useQueryParamsCleanup();

    const { betResult } = useBetStatusStore();


    const isBlocked = !subscriptionData?.GetCurrentUserSubscription;


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

        <section className="bg-[#121418F2] py-6 lg:pt-10 lg:pb-6 px-6 lg:px-24 relative">
            {/* <BetModal open={isOpen} onClose={() => setIsOpen(false)} /> */}
            {freeSubscription?.length === 0 && (
                <div className="flex justify-end w-full">
                    <div className="bg-[#121418F2] border-2 border-black px-6 py-2 rounded-2xl lg:hidden block mb-2">

                        <h1 className="text-white text-[12px] font-medium">
                            Tu periodo de prueba termina el: <span className="text-[#D9A425]">{endFreeDate ? new Date(endFreeDate).toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ''}</span>
                        </h1>


                    </div>
                </div>

            )}

            {/* header */}
            <ChartHeader
                selectedType={state.selectedType}
                gameType={state.gameType}
                selectedTable={state.selectedTable}
                selectedTableLabel={state.selectedTableLabel}
            />


            <div className="relative">
                {isBlocked && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#121418CC] pointer-events-auto">
                        <div className='max-w-[900px] w-full'>
                            <h1 className='font-bold text-white text-[20px] md:text-[40px] text-center font-sans'>Para disfrutar de Roulettes View accede a  nuestros <a href='/subscription' className='text-[#D9A425] underline'>planes de suscripción</a> o <span onClick={handleStartFreeSubscription} className='text-[#D9A425] underline cursor-pointer'>activa tu prueba gratuita</span></h1>
                        </div>

                    </div>
                )}
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
                            freeSubscription={freeSubscription || []}
                            endFreeDate={endFreeDate ? new Date(endFreeDate).toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ''}
                        />
                    </div>
                </section>
                <section className="flex flex-col lg:flex-row w-full gap-4">
                    <div className="order-2 lg:order-1 w-full lg:flex-1 lg:mx-2.5 flex flex-col">
                        <div className="flex flex-col-reverse lg:flex-row w-full gap-4">
                            <div className="flex flex-row w-full">
                                <div className="flex flex-col w-full">
                                    <div
                                        ref={chartContainerRef}
                                        className="relative bg-[#0d1b2a] p-4 flex flex-col items-center lg:items-start w-full max-w-full overflow-x-hidden"
                                    >
                                        <Controls
                                            setIsChartFullscreen={setFullscreen}
                                            onZoomIn={onZoomIn}
                                            onZoomOut={onZoomOut}
                                        />
                                        <div className='absolute top-28 right-28 z-50'>
                                            {/* {
                                                state.selectedType &&
                                                state.gameType &&
                                                state.selectedTable &&
                                                !chartLoading && (
                                                    <Update
                                                        selectedType={state.selectedType}
                                                        gameType={state.gameType}
                                                        selectedTable={state.selectedTable}
                                                        loading={chartLoading}
                                                    />
                                                )
                                            } */}

                                        </div>
                                        <div className='absolute top-28 left-1/2  z-50 pointer-events-none'>
                                            {betResult?.status === 'Won' ? (
                                                <SuccessBet value={betResult.value || ''} />
                                            ) : betResult?.status === 'Lost' ? (
                                                <LostBet value={betResult.value || ''} />
                                            ) : betResult?.status === 'Placed' ? (
                                                <PlacedBet value={betResult.value || ''} />
                                            ) : null}
                                        </div>
                                        <ChartRenderer
                                            selectedType={state.selectedType}
                                            gameType={state.gameType}
                                            selectedTable={state.selectedTable}
                                            chartFormattedData={chartFormattedData}
                                            chartContainerWidth={chartContainerWidth}
                                            chartLoading={chartLoading}
                                            onChartReady={handleChartReady}
                                        />


                                    </div>

                                    <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-6 mt-4 relative">
                                        <div className="block lg:hidden w-full">
                                            <div className='lg:hidden flex'>
                                                <SliderComponent />
                                            </div>

                                            <BetSection
                                                tableId={state.selectedTable}
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
                                <div className='hidden lg:flex'>
                                    <SliderComponent />
                                </div>
                                <div className="hidden lg:flex">

                                    <BetSection
                                        tableId={state.selectedTable}
                                        gameType={state.gameType}
                                        probabilities={probabilities}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>


            <FullscreenChartModal
                isOpen={state.isChartFullscreen}
                onClose={() => setFullscreen(false)}
                chartType={state.selectedType}
                selectedTableLabel={state.selectedTableLabel}
            >
                <div className='absolute top-28 right-28 z-50'>
                    {/* {
                        state.selectedType &&
                        state.gameType &&
                        state.selectedTable &&
                        !chartLoading && (
                            <Update
                                selectedType={state.selectedType}
                                gameType={state.gameType}
                                selectedTable={state.selectedTable}
                            />
                        )
                    } */}
                </div>
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

                {/* <div className="absolute bottom-4 right-4 left-4 flex justify-end pointer-events-none">
                    <div className="pointer-events-auto">
                        <Update
                            selectedType={state.selectedType}
                            gameType={state.gameType}
                            selectedTable={state.selectedTable}
                        />
                    </div>
                </div> */}
            </FullscreenChartModal>


        </section>
    );
};

export default ChartSection; 