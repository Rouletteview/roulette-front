import React, { useState, useRef, useEffect } from 'react';


interface Option {
    label: string;
    value: string;
}

interface CustomDropdownProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    label?: string;
    className?: string;
    defaultLabel: string;
    searchable?: boolean;
    searchQuery?: string;
    onSearchQueryChange?: (query: string) => void;
    paginated?: boolean;
    page?: number;
    onPageChange?: (page: number) => void;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
    loading?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
    options,
    value,
    onChange,
    label,
    className,
    defaultLabel,
    searchable = false,
    searchQuery = '',
    onSearchQueryChange,
    paginated = false,
    page = 1,
    onPageChange,
    hasNextPage = false,
    hasPrevPage = false,
    loading = false,
}) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            setOpen((prev) => !prev);
        } else if (e.key === 'Escape') {
            setOpen(false);
        }
    };

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className={`relative w-full sm:w-[180px] md:w-[200px] lg:w-[215px] ${className || ''}`} ref={dropdownRef}>
            {label && <span className="block mb-1 text-xs sm:text-sm md:text-base text-white font-medium">{label}</span>}
            <button
                type="button"
                className="w-full flex justify-between items-center text-xs sm:text-sm md:text-base bg-[#121418F2] border-2 border-[#000000] rounded-lg px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-left text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#D9A425] transition"
                onClick={() => setOpen((prev) => !prev)}
                onKeyDown={handleKeyDown}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className="truncate">{selectedOption ? selectedOption.label : defaultLabel}</span>
                <svg className={`ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {open && (
                <div className="absolute z-20 mt-2 w-full bg-[#404040] border border-[#444] rounded-xl shadow-lg py-2 max-h-60 sm:max-h-72 overflow-hidden animate-fade-in" tabIndex={-1}>

                    {searchable && (
                        <div className="px-2 sm:px-3 md:px-4 pb-2 border-b border-[#333]">
                            <input
                                type="text"
                                className="w-full px-2 sm:px-3 py-1 rounded-md bg-[#181818] text-[#D9A425] placeholder-[#D9A425] border border-[#333] focus:outline-none focus:ring-2 focus:ring-[#D9A425] text-xs sm:text-sm"
                                placeholder="Buscar..."
                                value={searchQuery}
                                onChange={e => onSearchQueryChange && onSearchQueryChange(e.target.value)}
                                autoFocus
                            />
                        </div>
                    )}

                    <div className="max-h-36 sm:max-h-48 overflow-y-auto custom-scrollbar">
                        <ul role="listbox">
                            {loading ? (

                                <div className="flex flex-col items-center justify-center my-4 h-32 sm:h-48">
                                    <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-[#D9A425]"></div>
                                    <p className="text-white mt-2 sm:mt-4 text-xs sm:text-sm">Cargando datos...</p>
                                </div>

                            ) : options.length === 0 ? (
                                <li className="px-3 sm:px-4 md:px-5 py-2 text-[#D9A425] text-center text-xs sm:text-sm">Sin resultados</li>
                            ) : (
                                options.map((opt) => (
                                    <li
                                        key={opt.value}
                                        className={`px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 cursor-pointer text-sm sm:text-base md:text-[17px] font-medium rounded-md transition-colors
                ${opt.value === value ? 'bg-[#181818] text-[#D9A425]' : 'text-[#D9A425] hover:bg-[#181818]'}
              `}
                                        role="option"
                                        aria-selected={opt.value === value}
                                        onClick={() => {
                                            onChange(opt.value);
                                            setOpen(false);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                onChange(opt.value);
                                                setOpen(false);
                                            }
                                        }}
                                        tabIndex={0}
                                    >
                                        <span className=" block">{opt.label}</span>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                    {/* Paginación */}
                    {paginated && (
                        <div className="flex items-center justify-center gap-2 sm:gap-4 px-2 sm:px-3 md:px-4 pb-2 w-full border-t border-[#333]">
                            <button
                                className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-[#D9A425] font-medium transition-colors text-lg sm:text-xl md:text-2xl ${!hasPrevPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#181818]'}`}
                                onClick={() => {
                                    if (hasPrevPage && onPageChange) {
                                        onPageChange(page - 1);
                                    }
                                }}
                                disabled={!hasPrevPage}
                                type="button"
                                aria-label="Anterior"
                            >
                                {/* Flecha izquierda */}
                                <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 19L8 12L15 5" stroke="#D9A425" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <span className="text-[#D9A425] text-xs sm:text-sm min-w-[60px] sm:min-w-[70px] text-center select-none">
                                Página {page}
                            </span>
                            <button
                                className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-[#D9A425] font-medium transition-colors text-lg sm:text-xl md:text-2xl ${!hasNextPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#181818]'}`}
                                onClick={() => {
                                    if (hasNextPage && onPageChange) {
                                        onPageChange(page + 1);
                                    }
                                }}
                                disabled={!hasNextPage}
                                type="button"
                                aria-label="Siguiente"
                            >
                                {/* Flecha derecha */}
                                <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 5L16 12L9 19" stroke="#D9A425" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown; 