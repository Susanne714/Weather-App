export interface HourlyForecast {
    time: string;           //Uhrzeit
    temperature: number;    // Temperatur in °C
    weathercode: number;    // Wettercode open-meteo
    windspeed: number; // Windgeschwindigkeit
    windDirection: string; // Windrichtung
    windDirectionLabel: string; //Windrichtung (ausgeschrieben)
    windgusts: number; //Böen
    relativeHumidity: number; //Luftfeuchtigkeit
    surfacePressure: number, //Luftdruck
    apparentTemperature: number, //gefühlte Temperatur
    windDescription: string, //Erläuterung des Windes (Vorbild: DWD)
    waveHeight?: number | null, //Wellenhöhe
    isDaytime: boolean,
}