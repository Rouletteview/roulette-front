import { UseFormRegisterReturn } from "react-hook-form";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useEffect } from "react";

interface InputProps {
    name: string;
    type?: string;
    placeholder?: string;
    register: UseFormRegisterReturn;
    error?: string;
}


const Input = ({ type = 'text', placeholder, register, error }: InputProps) => {

    useEffect(() => {
        const inputElement = document.getElementById("date-input") as HTMLInputElement;

        if (inputElement) {
            const today = new Date();
            const eighteenYearsAgo = new Date(
                today.getFullYear() - 18,
                today.getMonth(),
                today.getDate()
            ).toISOString();

            flatpickr(inputElement, {
                dateFormat: "Y-m-d",
                maxDate: eighteenYearsAgo,
                disableMobile: true,
            });
        }
    }, []);

    return (
        <div className="flex flex-col space-y-1 max-w-[413px]">
            <input
                id={type === 'date' ? 'date-input' : 'text-input'}
                placeholder={placeholder}
                {...register}
                className={`bg-[#404040] py-3 px-4 w-ful   rounded-[10px] text-white text-lg placeholder-white ${error ? "border border-red-500" : ""} focus:border-white focus:ring-white disabled:pointer-events-none`}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    )
}

export default Input
