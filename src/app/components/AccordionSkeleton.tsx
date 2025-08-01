import React from 'react';

interface AccordionSkeletonProps {
    items?: number;
    className?: string;
}

const AccordionSkeleton: React.FC<AccordionSkeletonProps> = ({
    items = 5,
    className = ""
}) => {
    // Crear diferentes tamaños para simular contenido real
    const getRandomWidth = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {Array.from({ length: items }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex-1 space-y-2">
                                <div
                                    className="h-5 bg-gray-200 rounded animate-pulse"
                                    style={{ width: `${getRandomWidth(120, 200)}px` }}
                                ></div>
                                <div
                                    className="h-4 bg-gray-200 rounded animate-pulse"
                                    style={{ width: `${getRandomWidth(80, 150)}px` }}
                                ></div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
                                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-3">
                        <div className="flex justify-between items-center">
                            <div className="space-y-2">
                                <div
                                    className="h-4 bg-gray-200 rounded animate-pulse"
                                    style={{ width: `${getRandomWidth(60, 100)}px` }}
                                ></div>
                                <div
                                    className="h-3 bg-gray-200 rounded animate-pulse"
                                    style={{ width: `${getRandomWidth(40, 80)}px` }}
                                ></div>
                            </div>
                            <div className="flex space-x-2">
                                <div className="w-12 h-8 bg-gray-200 rounded animate-pulse"></div>
                                <div className="w-12 h-8 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AccordionSkeleton; 