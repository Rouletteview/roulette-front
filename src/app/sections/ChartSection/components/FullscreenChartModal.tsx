import React, { useState, useEffect } from 'react';
import { selectChartTypes } from '../../../../types/chart/types';

interface FullscreenChartModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    chartType: string;
    selectedTableLabel: string;
}

export const FullscreenChartModal: React.FC<FullscreenChartModalProps> = ({
    isOpen,
    onClose,
    children,
    chartType,
    selectedTableLabel,
}) => {
    const [isClosing, setIsClosing] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
        } else if (isClosing) {
            const timeout = setTimeout(() => setShouldRender(false), 300);
            return () => clearTimeout(timeout);
        } else {
            setShouldRender(false);
        }
    }, [isOpen, isClosing]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 300);
    };

    if (!shouldRender) return null;

    const chartTypeLabel = selectChartTypes.find(type => type.type === chartType)?.label || chartType;

    return (
        <div
            className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ease-in-out ${isOpen && !isClosing
                    ? 'opacity-100 visible'
                    : 'opacity-0 invisible'
                }`}
        >
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={handleClose}
            />

            <div
                className={`relative h-full flex flex-col transform transition-all duration-300 ease-in-out ${isOpen && !isClosing
                        ? 'translate-y-0 scale-100'
                        : 'translate-y-4 scale-95'
                    }`}
            >
                <div className="flex items-center justify-between p-4 bg-[#0d1b2a]/95 backdrop-blur-sm border-b border-gray-700/50 shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#D9A425] rounded-full animate-pulse"></div>
                            <span className="text-white text-sm font-medium">{chartTypeLabel}</span>
                        </div>
                        <span className="text-gray-400 text-xs">•</span>
                        <span className="text-gray-400 text-xs truncate max-w-[120px]">{selectedTableLabel}</span>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-3 text-white hover:bg-gray-700/50 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 bg-[#0d1b2a] p-2 sm:p-4 overflow-hidden">
                    <div className="h-full w-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}; 