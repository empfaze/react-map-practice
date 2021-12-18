import { useState } from "react";
import { API_KEY } from "../types/adress";

const useHttp = function (handleData: (str: string, query: string) => void) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function sendRequest(query: string) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&format=json&geocode=${query}`
      );
      const data = await response.json();
      const { pos } =
        data.response.GeoObjectCollection.featureMember[0].GeoObject.Point;
      handleData(pos, query);
    } catch (err) {
      setError("Пожалуйста, введите корректные данные по образцу");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  function resetError(): void {
    setError(null);
    setIsLoading(false);
  }

  return { sendRequest, error, isLoading, resetError };
};
export default useHttp;
