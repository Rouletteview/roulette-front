import React from 'react';

interface TableSkeletonProps {
    rows?: number;
    className?: string;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({
    rows = 5,
    className = ""
}) => {
    // Crear diferentes tamaños para simular contenido real
    const getRandomWidth = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return (
        <div className={`w-auto sm:min-w-2xl lg:min-w-4xl mx-auto overflow-x-auto rounded-xl shadow-lg bg-white text-gray-800 py-4 sm:py-6 md:py-8 mb-8 sm:mb-12 md:mb-16 ${className}`}>
            <table className="min-w-full text-sm text-left">
                <thead className="bg-[#F9FAFC] uppercase text-xs text-gray-500 font-light">
                    <tr>
                        <th className="px-4 sm:px-4 md:px-8 py-3 hidden lg:table-cell">
                            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </th>
                        <th className="px-4 sm:px-4 md:px-8 py-3">
                            <div className="w-24 h-3 bg-gray-200 rounded animate-pulse"></div>
                        </th>
                        <th className="px-2 sm:px-4 md:px-8 py-3">
                            <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors odd:bg-white even:bg-[#F9FAFC]">
                            <td className="px-4 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 hidden lg:table-cell">
                                <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
                            </td>
                            <td className="px-4 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4">
                                <div className="space-y-2">
                                    <div
                                        className="h-4 bg-gray-200 rounded animate-pulse"
                                        style={{ width: `${getRandomWidth(24, 40)}px` }}
                                    ></div>
                                    <div
                                        className="h-3 bg-gray-200 rounded animate-pulse"
                                        style={{ width: `${getRandomWidth(16, 28)}px` }}
                                    ></div>
                                </div>
                            </td>
                            <td className="px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4">
                                <div
                                    className="h-4 bg-gray-200 rounded animate-pulse"
                                    style={{ width: `${getRandomWidth(12, 20)}px` }}
                                ></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableSkeleton; 