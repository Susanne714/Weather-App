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

    miniForecast?: MiniForecastSection[];
}

export interface MiniForecastSection {
    interval: string;
    highest: {
        temp: number;
        code: number;
        hour: number;
        windSpeed: number;
        windDirection: string;
        windDirectionLabel: string;
        windGusts: number;
    };
    lowest: {
        temp: number;
        code: number;
        hour: number;
        windSpeed: number;
        windDirection: string;
        windDirectionLabel: string;
        windGusts: number;
    };
    isDayTime: boolean;

    display: {
        temp: number;
        code: number;
        hour: number;
        windSpeed: number;
        windDirection: string;
        windDirectionLabel: string;
        windGusts: number;
    };
}