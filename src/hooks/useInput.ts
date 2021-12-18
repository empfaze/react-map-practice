import { ChangeEvent, useReducer } from "react";
import { ActionTypes, AdressAction, IAdress } from "../types/adress";

const useInput = function (checkValidity: (str: string) => boolean) {
  const initialInputValueState: IAdress = {
    value: "",
    isTouched: false,
  };
  function setInputValueState(
    state = initialInputValueState,
    action: AdressAction
  ): IAdress {
    switch (action.type) {
      case ActionTypes.CHANGE:
        return { value: action.payload!, isTouched: state.isTouched };
      case ActionTypes.BLUR:
        return { value: state.value, isTouched: true };
      case ActionTypes.RESET:
        return { value: "", isTouched: false };
      default:
        return initialInputValueState;
    }
  }

  const [inputValue, dispatchInputValue] = useReducer(
    setInputValueState,
    initialInputValueState
  );

  const valueIsValid = checkValidity(inputValue.value);
  const hasError = !valueIsValid && inputValue.isTouched;

  const valueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchInputValue({ type: ActionTypes.CHANGE, payload: e.target.value });
  };
  const valueBlurHandler = () => {
    dispatchInputValue({ type: ActionTypes.BLUR });
  };
  const reset = () => {
    dispatchInputValue({ type: ActionTypes.RESET });
  };

  return {
    value: inputValue.value,
    valueIsValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};
export default useInput;
