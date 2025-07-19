import React from 'react';

interface StepperProps {
    step: number;
    steps: React.ReactNode[];
}

const Stepper: React.FC<StepperProps> = ({ step, steps }) => (
    <div>
        <div>{steps[step - 1]}</div>
    </div>
);

export default Stepper; 