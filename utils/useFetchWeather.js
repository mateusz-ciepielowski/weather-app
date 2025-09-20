import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchWeather = () => {
  const [location, setLocation] = useState([]);
  const [weatherData, setWeatherData] = useState(undefined);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const getWeatherData = async () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude: lat, longitude: long } = position.coords;
        if (location.length === 0) setLocation([lat, long]);
      });

      if (location.length === 0) return;
      const { data } = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7`
      );
      setWeatherData(data);
      console.log(data);
    };
    getWeatherData();
  }, [API_KEY, location, time]);

  setInterval(() => {
    setTime(
      new Date().toLocaleTimeString("pl-PL", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, 1000 * 30);

  return { weatherData, time };
};
