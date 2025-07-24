import { Slider } from 'antd';
import { useState } from 'react';

const SliderComponent = () => {
    const [value, setValue] = useState(250);
 

    return (
        <div className='w-full flex flex-col gap-2 text-white mb-12 h'>
            <h1 className='text-sm font-bold text-center'>Cantidad de resultados</h1>
            <div className='flex items-center gap-2 w-full text-[12px] '>
                <span>00</span>
                <Slider
                    defaultValue={30}
                    value={value}
                    onChange={setValue}
                    min={0}
                    max={500}
                    tooltip={{ open: true, placement: 'bottom', color: '#00000000', autoAdjustOverflow: false }}
                    className="w-full"
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