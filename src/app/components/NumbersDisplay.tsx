import { RouletteItem } from "../../utils/formatters/rouletterNumbers";




interface Props {
    numbers: RouletteItem[]
}

const colorClasses = {
    red: "border-red-600 ",
    white: "border-white ",
    green: "border-green-600 ",
};


const NumbersDisplay = ({ numbers }: Props) => {
    return (
        <ul className="flex flex-wrap gap-2 bg-black/30 p-2 rounded">
            {numbers.map((item, i) => (
                <li
                    key={i}
                    className={`w-8 h-8 lg:w-7 lg:h-7 rounded-full border-3 flex items-center justify-center font-medium text-white text-[10px] md:text-xs ${colorClasses[item.color]}`}
                >
                    {item.value}
                </li>
            ))}
        </ul>
    )
}

export default NumbersDisplay
