export type AqiStatus =
  | "Good"
  | "Satisfactory"
  | "Moderate"
  | "Poor"
  | "Very Poor"
  | "Severe";

export interface IChartData {
  data: number;
}

export type Trend = "Inc" | "Dec";

export interface AirQualityData {
  city: string;
  aqi: number;
  timestamp: Date;
  lastUpdated: string;
  trend?: Trend;
  status: [AqiStatus, string];
  chartData?: IChartData[];
}
