import { CHART } from "../app/components/chart/constants";

type ChartType = keyof typeof CHART;

interface Props {
  type: ChartType;
}

export function getChart({ type }: Props) {
  return CHART[type];
}
