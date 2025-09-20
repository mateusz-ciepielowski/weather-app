"use client";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUp,
  Cloud,
  Droplet,
  Sun,
  Thermometer,
  Wind,
} from "@deemlol/next-icons";
import Link from "next/link";
import { useFetchWeather } from "../utils/useFetchWeather.js";
import HourBox from "@/components/forecast/HourBox.jsx";

export default function Home() {
  const { weatherData, time } = useFetchWeather();

  return (
    <main className="flex flex-col items-center md:h-dvh md:w-[800px] m-auto gap-8">
      <h1 className="text-4xl text-center my-2">Weather app</h1>
      {weatherData && (
        <>
          <section className="flex flex-col gap-8 justify-center items-center bg-weather-box rounded-2xl w-80  md:w-128 md:h-128 text-black">
            <div className="flex items-center gap-2">
              <p className="text-5xl">
                {weatherData.current.temp_c.toFixed(0)}°C
              </p>
              <Image
                src={`https:${weatherData.current.condition.icon}`}
                width={100}
                height={100}
                alt={weatherData.current.condition.text}
              />
              <div className="flex flex-col items-center">
                <p>
                  {weatherData.location.name}, {weatherData.location.country}
                </p>
                <p>Today</p>
                <p className="text-4xl">{time}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-3 gap-4 justify-items-center">
              <HourBox
                label="Feels like"
                data={`${weatherData.current.feelslike_c.toFixed(0)}°C`}
              >
                <Thermometer size={16} color="#000" />
              </HourBox>
              <HourBox
                label="Wind"
                data={`${weatherData.current.wind_kph}km/h`}
              >
                <Wind size={16} color="#000" />
              </HourBox>
              <HourBox
                label="Cloud cover"
                data={`${weatherData.current.cloud}%`}
              >
                <Cloud size={16} color="#000" />
              </HourBox>
              <HourBox
                label="Humidity"
                data={`${weatherData.current.humidity}%`}
              >
                <Droplet size={16} color="#000" />
              </HourBox>
              <HourBox label="UV" data={`${weatherData.current.uv}`}>
                <Sun size={16} color="#000" />
              </HourBox>
              <HourBox
                label="Precipitation"
                data={`${weatherData.current.precip_mm}mm`}
              >
                <Wind size={16} color="#000" />
              </HourBox>
            </div>
          </section>
          <section>
            <h3 className="text-center text-4xl my-4">7-day forecast</h3>
            <div className="flex flex-col items-center md:flex-row gap-4">
              {weatherData.forecast.forecastday.map((day, i) => (
                <Link key={i} href={day.date}>
                  <div className="flex flex-col items-center bg-weather-box text-black rounded-2xl w-36 h-24">
                    <p>{new Date(day.date).toLocaleDateString()}</p>
                    <Image
                      src={`https:${day.day.condition.icon}`}
                      width={40}
                      height={40}
                      alt={day.day.condition.text}
                    />
                    <div className="flex justify-center items-center">
                      <ArrowDown size={18} color="#000" />
                      <p>{day.day.mintemp_c.toFixed(0)}°C /</p>
                      <ArrowUp size={18} color="#000" />
                      <p>{day.day.maxtemp_c.toFixed(0)}°C </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
      <footer>
        Powered by{" "}
        <a href="https://www.weatherapi.com/" title="Free Weather API">
          WeatherAPI.com
        </a>
      </footer>
    </main>
  );
}
