export interface DailyForecast {
    date: string;
    temperatureMean: number;
    windSpeed: number;
    windDirection: string;
    windDirectionLabel: string;
    windGusts: number;
    tempMin: number;
    tempMax: number;
    waveHeight?: number | null,
}