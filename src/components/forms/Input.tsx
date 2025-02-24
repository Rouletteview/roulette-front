import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
    name: string;
    type?: string;
    placeholder?: string;
    register: UseFormRegisterReturn;
    error?: string;
}


const Input = ({ name, type = 'text', placeholder, register, error }: InputProps) => {
    return (
        <div className="flex flex-col space-y-1 max-w-[413px]">
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                {...register}
                className={`bg-[#404040] py-3 px-4 w-full  rounded-[10px] text-white text-lg placeholder-white border ${error ? "border-red-500" : ""} focus:border-white focus:ring-white disabled:pointer-events-none`}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    )
}

export default Input
