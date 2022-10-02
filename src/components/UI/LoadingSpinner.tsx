import { CircleNotch } from "phosphor-react";
import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return <CircleNotch className={classes.spinner} />;
};

export default LoadingSpinner;
