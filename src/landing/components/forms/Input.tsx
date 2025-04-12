import { UseFormRegisterReturn } from "react-hook-form";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useEffect } from "react";

interface InputProps {
    name: string;
    type?: string;
    placeholder?: string;
    register?: UseFormRegisterReturn;
    error?: string;
    icon?: string;
    className?: string;
    options?: { value: string; label: string }[]; 
}

const Input = ({
    type = 'text',
    placeholder,
    register,
    error,
    icon,
    className,
    options,
}: InputProps) => {

    useEffect(() => {
        if (type === 'date') {
            const inputElement = document.getElementById("date-input") as HTMLInputElement;

            if (inputElement) {
                const today = new Date();
                const eighteenYearsAgo = new Date(
                    today.getFullYear() - 18,
                    today.getMonth(),
                    today.getDate()
                ).toISOString();

                flatpickr(inputElement, {
                    dateFormat: "d-m-Y",
                    maxDate: eighteenYearsAgo,
                    disableMobile: true,
                });
            }
        }
    }, [type]);

    return (
        <div className="flex flex-col space-y-1">
        <div className="relative">
            {options ? (
                <select
                    {...register}
                    className={`bg-[#404040] py-3 px-4 w-full rounded-[10px] text-white text-lg placeholder-white appearance-none ${error ? "border border-red-500" : ""
                        } focus:border-white focus:ring-white disabled:pointer-events-none ${icon ? "pr-10" : ""
                        } ${className}`}
                    defaultValue=""
                >
                    <option value="" disabled>{placeholder}</option>
                    {options.map((opt, index) => (
                        <option key={index} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    id={type === 'date' ? 'date-input' : 'text-input'}
                    type={type}
                    placeholder={placeholder}
                    {...register}
                    className={`bg-[#404040] py-3 px-4 w-full rounded-[10px] text-white text-lg placeholder-white ${error ? "border border-red-500" : ""
                        } focus:border-white focus:ring-white disabled:pointer-events-none ${icon ? "pr-10" : ""
                        } ${className}`}
                />
            )}
    
            {icon && (
                <span className="absolute inset-y-0 right-4 flex items-center text-white pointer-events-none">
                    <img src={icon} alt="" />
                </span>
            )}
        </div>
    
        {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
    
    );
};

export default Input;
