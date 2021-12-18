import { FC, KeyboardEvent } from "react";
import useHttp from "../../hooks/useHttp";
import useInput from "../../hooks/useInput";
import { useTypedActions } from "../../hooks/useTypedActions";
import Spinner from "../Spinner/Spinner";

import classes from "./Input.module.scss";

function checkValidity(str: string): boolean {
  return str.length > 0;
}

const InputAdress: FC = () => {
  const { addPlace } = useTypedActions();

  const {
    value: adress,
    hasError,
    valueIsValid: isAdressValid,
    valueChangeHandler: adressChangeHandler,
    valueBlurHandler: adressBlurHandler,
    reset,
  } = useInput(checkValidity);

  function handleData(data: string, adress: string): void {
    const coordArr = data.split(" ");
    const place = {
      id: Date.now(),
      adress,
      lat: Number(coordArr[0]),
      lng: Number(coordArr[1]),
    };

    addPlace(place);
  }
  const { error, isLoading, sendRequest, resetError } = useHttp(handleData);

  function resetAndBlur(): void {
    const inputAdress: HTMLInputElement | null =
      document.querySelector("#adress");
    if (inputAdress) {
      inputAdress.blur();
      reset();
    }
  }

  async function searchHandler(
    e: KeyboardEvent<HTMLInputElement>
  ): Promise<void> {
    if (e.key === "Enter" && isAdressValid) {
      const request = adress.replaceAll(" ", "+");
      sendRequest(request);
      resetAndBlur();
    }
  }

  const inputInvalid = hasError ? classes["invalid"] : "";
  const paraIsVisible = hasError ? "" : classes["hidden"];

  return (
    <div className={classes["form-wrapper"]}>
      {isLoading && <Spinner />}
      {!isLoading && error && (
        <div className={classes["error-wrapper"]}>
          <p className={classes["error-para"]}>Запрос неверный...</p>
          <button onClick={resetError} className={classes["error-btn"]}>
            Повторить
          </button>
        </div>
      )}
      {!isLoading && !error && (
        <div className={classes["input"]}>
          <label htmlFor="adress">Введите корректный адрес:</label>
          <input
            className={inputInvalid}
            type="text"
            name="adress"
            id="adress"
            value={adress}
            onChange={adressChangeHandler}
            onBlur={adressBlurHandler}
            onKeyDown={searchHandler}
            placeholder="город Москва, улица Ленина, дом 2"
          />
          <p className={paraIsVisible}>Пожалуйста, введите корректный адрес</p>
        </div>
      )}
    </div>
  );
};

export default InputAdress;
