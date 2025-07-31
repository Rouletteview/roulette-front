import { Slider } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';

const SliderComponent = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const defaultValue = 250;
    const [value, setValue] = useState(defaultValue);
    const debounceRef = useRef<NodeJS.Timeout>();


    useEffect(() => {
        const paramValue = searchParams.get('results');
        if (paramValue) {
            const parsedValue = parseInt(paramValue);
            if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 500) {
                setValue(parsedValue);
            }
        }
    }, []);

    const handleValueChange = (newValue: number) => {
        setValue(newValue);


        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }


        debounceRef.current = setTimeout(() => {
            if (newValue !== defaultValue) {
                setSearchParams(prev => {
                    prev.set('results', newValue.toString());
                    return prev;
                });
            } else {
                setSearchParams(prev => {
                    prev.delete('results');
                    return prev;
                });
            }
        }, 500);
    };


    useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, []);

    return (
        <div className='w-full flex flex-col gap-2 text-white mb-12 h'>
            <h1 className='text-sm font-bold text-center'>Cantidad de resultados</h1>
            <div className='flex items-center gap-2 w-full text-[12px] '>
                <span>0</span>
                <Slider
                    defaultValue={defaultValue}
                    value={value}
                    onChange={handleValueChange}
                    min={0}
                    max={500}
                    tooltip={{ open: true, placement: 'bottom', color: '#00000000', autoAdjustOverflow: false }}
                    className="w-full z-[99]"
                    styles={{
                        rail: { backgroundColor: '#B7D9E2' }
                    }}
                />
                <span>500</span>
            </div>

        </div>
    )
}

export default SliderComponent;