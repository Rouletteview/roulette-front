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
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, value, onChange, label, className, defaultLabel }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            setOpen((prev) => !prev);
        } else if (e.key === 'Escape') {
            setOpen(false);
        }
    };

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className={`relative min-w-[215px] ${className || ''}`} ref={dropdownRef}>
            {label && <span className="block mb-1 text-base text-white font-medium">{label}</span>}
            <button
                type="button"
                className="w-full flex justify-between items-center bg-[#121418F2] border-2 border-[#000000] rounded-lg px-4 py-2 text-left text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#D9A425] transition"
                onClick={() => setOpen((prev) => !prev)}
                onKeyDown={handleKeyDown}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span>{selectedOption ? selectedOption.label : defaultLabel}</span>
                <svg className={`ml-2 w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {open && (
                <ul
                    className="absolute z-20 mt-2 w-full bg-[#404040] border border-[#444] rounded-xl shadow-lg py-2 max-h-72 overflow-y-auto animate-fade-in"
                    tabIndex={-1}
                    role="listbox"
                >
                    {options.map((opt) => (
                        <li
                            key={opt.value}
                            className={`px-5 py-2 cursor-pointer text-[17px] font-medium rounded-md transition-colors
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
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomDropdown; 