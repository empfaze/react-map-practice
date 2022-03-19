import { FC, KeyboardEvent } from "react";
import useHttp from "../../hooks/useHttp";
import useInput from "../../hooks/useInput";
import { useTypedActions } from "../../hooks/useTypedActions";
import Spinner from "../Spinner/Spinner";

import classes from "./Input.module.scss";

function checkValidity(str: string): boolean {
  return str.trim().length > 0 && !str.includes(">") && !str.includes("<");
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

  function searchHandler() {
    const request = adress.replaceAll(" ", "+");
    sendRequest(request);
    resetAndBlur();
  }

  function searchFromKeyboardHandler(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && isAdressValid) {
      searchHandler();
    }
  }

  function searchFromButtonHandler() {
    if (isAdressValid) searchHandler();
  }

  const inputInvalid = hasError ? classes["invalid"] : "";
  const paraIsVisible = hasError ? classes["form__para"] : classes["hidden"];

  return (
    <div className={classes["form-wrapper"]}>
      {isLoading && <Spinner />}
      {!isLoading && error && (
        <div className={classes["error-wrapper"]}>
          <p className={classes["error-para"]}>{error}</p>
          <button onClick={resetError} className={classes["error-btn"]}>
            Повторить
          </button>
        </div>
      )}
      {!isLoading && !error && (
        <div className={classes["form__content"]}>
          <h2 className={classes["form__title"]}>Введите корректный адрес:</h2>
          <div className={classes["form__manage-controls"]}>
            <div className={classes["form__input"]}>
              <label htmlFor="adress"></label>
              <input
                className={inputInvalid}
                type="text"
                name="adress"
                id="adress"
                value={adress}
                onChange={adressChangeHandler}
                onBlur={adressBlurHandler}
                onKeyDown={searchFromKeyboardHandler}
                placeholder="город Москва, улица Ленина, дом 2"
              />
            </div>
            <button
              className={classes["form__button"]}
              onClick={searchFromButtonHandler}
            >
              Искать
            </button>
          </div>
          <p className={paraIsVisible}>Пожалуйста, введите корректный адрес</p>
        </div>
      )}
    </div>
  );
};

export default InputAdress;
