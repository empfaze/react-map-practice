import { FC } from "react";
import Adresslist from "../AdressList/AdressList";
import InputAdress from "../Input/Input";

import classes from "./Content.module.scss";

const Content: FC = () => {
  return (
    <div className={classes["content-wrapper"]}>
      <InputAdress />
      <Adresslist />
    </div>
  );
};

export default Content;
