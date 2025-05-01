import { lazy } from "react";
import { chartTypes } from "../../../types/types";

export const CHART = {
    [chartTypes.Candlestick]: lazy(() => import("./CandleChart")),
    [chartTypes.Area]: lazy(() => import('./AreaChart')),
    [chartTypes.Lineal]: lazy(() => import('./LineChart')),
    [chartTypes.VerticalColumn]: lazy(() => import('./HistogramChart'))
    //mas componentes
} as const;



export const CHART_LABELS: Record<chartTypes, string> = {
    [chartTypes.Candlestick]: "Gráfico de velas",
    [chartTypes.Area]: "Gráfico de área",
    [chartTypes.Lineal]: "Gráfico lineal",
    [chartTypes.VerticalColumn]: "Gráfico de columna vertical",
    [chartTypes.HorizontalColumn]: "Gráfico de columna horizontal"
};