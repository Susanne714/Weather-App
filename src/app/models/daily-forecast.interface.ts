export interface DailyForecast {
    date: string;
    dateLabel: string,
    temperatureMean: number;
    weatherCode: number;
    windSpeed: number;
    windDirection: string;
    windDirectionLabel: string;
    windGusts: number;
    tempMin: number;
    tempMax: number;
    waveHeight?: number | null,
    uvIndex: number,
    daylightDuration: number,
}