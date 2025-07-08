import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { translateRouletteTag } from '../../../utils/formatters/rouletterNumbers';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Datos mock para el histograma horizontal
const data = [
    { name: 'Red', value: 12, color: 'rgba(32, 178, 108, 1)' },
    { name: 'Black', value: 18, color: 'rgba(217, 164, 37, 1)' },
    { name: 'Green', value: 5, color: 'rgba(38, 166, 154, 1)' },
    { name: 'Zero', value: 9, color: 'rgba(141, 52, 249, 1)' },
    { name: 'Odd', value: 15, color: 'rgba(255, 82, 82, 1)' },
    { name: 'Even', value: 10, color: 'rgba(255, 193, 7, 1)' },
    { name: 'Low', value: 8, color: 'rgba(33, 150, 243, 1)' },
    { name: 'High', value: 14, color: 'rgba(76, 175, 80, 1)' },
    { name: 'FirstDozen', value: 7, color: 'rgba(255, 152, 0, 1)' },
    { name: 'SecondDozen', value: 11, color: 'rgba(233, 30, 99, 1)' },
    { name: 'ThirdDozen', value: 13, color: 'rgba(63, 81, 181, 1)' },
    { name: 'FirstColumn', value: 6, color: 'rgba(0, 188, 212, 1)' },
    { name: 'SecondColumn', value: 17, color: 'rgba(205, 220, 57, 1)' },
    { name: 'ThirdColumn', value: 4, color: 'rgba(121, 85, 72, 1)' },
    { name: 'Dozen1', value: 16, color: 'rgba(158, 158, 158, 1)' },
    { name: 'Dozen2', value: 3, color: 'rgba(244, 67, 54, 1)' },
    { name: 'Dozen3', value: 19, color: 'rgba(0, 150, 136, 1)' },
    { name: 'Column1', value: 2, color: 'rgba(103, 58, 183, 1)' },
    { name: 'Column2', value: 20, color: 'rgba(255, 235, 59, 1)' },
    { name: 'Column3', value: 1, color: 'rgba(255, 87, 34, 1)' },
];

const HorizontalHistogramChart: React.FC = () => {
    const chartData = {
        labels: data.map(item => translateRouletteTag(item.name)),
        datasets: [
            {
                label: 'Probabilidades',
                data: data.map(item => item.value),
                backgroundColor: data.map(item => item.color),
                borderColor: data.map(item => item.color),
                borderWidth: 0,
                borderRadius: 4,
                borderSkipped: false,
            },
        ],
    };

    const options = {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.95)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'rgba(255,255,255,0.2)',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: false,
                titleFont: {
                    family: "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif",
                    size: 13,
                    weight: 600,
                },
                bodyFont: {
                    family: "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif",
                    size: 16,
                    weight: 700,
                },
                callbacks: {
                    title: function (context: any[]) {
                        return context[0].label;
                    },
                    label: function (context: any) {
                        return `Valor: ${context.parsed.x}`;
                    },
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255,255,255,0.1)',
                    drawBorder: false,
                },
                ticks: {
                    color: 'white',
                    font: {
                        family: "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif",
                        size: 12,
                    },
                },
                border: {
                    color: 'rgba(255,255,255,0.1)',
                },
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: 'white',
                    font: {
                        family: "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif",
                        size: 13,
                    },
                },
                border: {
                    color: 'rgba(255,255,255,0.1)',
                },
            },
        },
        animation: {
            duration: 800,
            easing: 'easeInOutQuart' as const,
        },
    };

    return (
        <div
            style={{
                width: '100%',
                background: '#0d1b2a',
                borderRadius: 16,
                boxShadow: '0 2px 8px #0003',
                padding: 24,
                position: 'relative'
            }}
        >
            <h2 style={{ fontWeight: 600, fontSize: 20, marginBottom: 16, color: 'white' }}>
                Histograma Horizontal (Chart.js)
            </h2>

            <div style={{ height: '400px' }}>
                <Bar data={chartData} options={options} />
            </div>

            <div style={{ position: 'absolute', right: 24, top: 24, color: '#fff8', fontSize: 13 }}>
                Histograma horizontal con datos de ruleta
            </div>
        </div>
    );
};

export default HorizontalHistogramChart;