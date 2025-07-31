import React from 'react';

interface PaginationProps {
    currentPage: number;
    onPreviousPage: () => void;
    onNextPage: () => void;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    onPreviousPage,
    onNextPage,
    hasNextPage = true,
    hasPreviousPage = true,
    className = ""
}) => {
    return (
        <div className={`flex items-center justify-center gap-2 px-4 py-3 text-sm bg-[#F4F7FCBF] text-gray-500 ${className}`}>
            <button
                onClick={onPreviousPage}
                disabled={!hasPreviousPage}
                className="bg-white disabled:bg-gray-200 text-gray-500 px-2 py-1 border border-gray-300 rounded-md font-semibold cursor-pointer disabled:cursor-not-allowed hover:bg-gray-50 disabled:hover:bg-gray-200 transition-colors"
                aria-label="Página anterior"
            >
                &lt;
            </button>

            <span className="px-2 font-medium">
                {currentPage}
            </span>

            <button
                onClick={onNextPage}
                disabled={!hasNextPage}
                className="bg-white disabled:bg-gray-200 text-gray-500 px-2 py-1 border border-gray-300 rounded-md font-semibold cursor-pointer disabled:cursor-not-allowed hover:bg-gray-50 disabled:hover:bg-gray-200 transition-colors"
                aria-label="Página siguiente"
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination; 