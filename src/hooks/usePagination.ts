import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';

interface UsePaginationProps {
    defaultPage?: number;
    defaultLimit?: number;
    paramName?: string;
}

interface UsePaginationReturn {
    currentPage: number;
    limit: number;
    skip: number;
    handlePreviousPage: () => void;
    handleNextPage: () => void;
    resetToFirstPage: () => void;
}

export const usePagination = ({
    defaultPage = 1,
    defaultLimit = 10,
    paramName = 'page'
}: UsePaginationProps = {}): UsePaginationReturn => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(defaultPage);

    const page = parseInt(searchParams.get(paramName) || defaultPage.toString());
    const limit = defaultLimit;
    const skip = (page - 1) * limit;

    useEffect(() => {
        setCurrentPage(page);
    }, [page]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1) {
            setSearchParams(prev => {
                prev.set(paramName, newPage.toString());
                return prev;
            });
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        handlePageChange(currentPage + 1);
    };

    const resetToFirstPage = () => {
        handlePageChange(1);
    };

    return {
        currentPage,
        limit,
        skip,
        handlePreviousPage,
        handleNextPage,
        resetToFirstPage
    };
}; 