"use client";
import { useFetchWeather } from "@/utils/useFetchWeather";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import {
  ArrowDown,
  Cloud,
  CloudRain,
  Droplet,
  Sun,
  Thermometer,
  Wind,
} from "@deemlol/next-icons";
import React from "react";
import Image from "next/image";
import HourBox from "@/components/forecast/HourBox";

const Forecast = () => {
  const { forecast: params } = useParams();

  const { weatherData } = useFetchWeather();

  const todayWeather = weatherData
    ? weatherData.forecast.forecastday.filter((day) => day.date === params)[0]
    : null;

  console.log(todayWeather);

  return (
    <main className="md:h-full flex flex-col items-center m-auto px-8">
      {todayWeather && (
        <>
          <h1 className="text-3xl">
            {todayWeather ? (
              new Date(todayWeather.date).toLocaleDateString()
            ) : (
              <span className="h-full">Loading...</span>
            )}
          </h1>

          <section>
            <div>
              {todayWeather.hour.map((hour, i) => (
                <Accordion key={i} square={false} className="md:w-xl">
                  <AccordionSummary
                    expandIcon={<ArrowDown size={18} color="#000" />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <div className="flex items-center justify-end gap-6">
                      <Typography component="span">
                        {hour.time.slice(-5)}
                      </Typography>
                      <Image
                        src={`https:${hour.condition.icon}`}
                        width={42}
                        height={42}
                        alt={hour.condition.text}
                      />
                      <Typography component="span">
                        {hour.temp_c.toFixed(0)}°C
                      </Typography>
                      <div className="flex gap-2">
                        <Typography component="span">
                          {hour.chance_of_rain.toFixed(0)}%
                        </Typography>
                        <CloudRain size={24} color="#000" />
                      </div>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails className="grid grid-cols-2 grid-rows-3 gap-4 justify-items-center">
                    <HourBox
                      label="Feels like"
                      data={`${hour.feelslike_c.toFixed(0)}°C`}
                    >
                      <Thermometer size={16} color="#000" />
                    </HourBox>
                    <HourBox label="Wind" data={`${hour.wind_kph}km/h`}>
                      <Wind size={16} color="#000" />
                    </HourBox>
                    <HourBox label="Cloud cover" data={`${hour.cloud}%`}>
                      <Cloud size={16} color="#000" />
                    </HourBox>
                    <HourBox label="Humidity" data={`${hour.humidity}%`}>
                      <Droplet size={16} color="#000" />
                    </HourBox>
                    <HourBox label="UV" data={`${hour.uv}`}>
                      <Sun size={16} color="#000" />
                    </HourBox>
                    <HourBox label="Precipitation" data={`${hour.precip_mm}mm`}>
                      <Wind size={16} color="#000" />
                    </HourBox>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </section>
          <footer>
            Powered by{" "}
            <a href="https://www.weatherapi.com/" title="Free Weather API">
              WeatherAPI.com
            </a>
          </footer>
        </>
      )}
    </main>
  );
};

export default Forecast;
