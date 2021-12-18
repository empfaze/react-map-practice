import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { adressActions } from "../store/slices/adress";

const allActions = {
  ...adressActions,
};

export const useTypedActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};
