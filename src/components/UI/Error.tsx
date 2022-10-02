import classes from "./Error.module.css";

const Error = () => {
  return (
    <div className={classes["error-container"]}>
      <p className={classes["error-message"]}>Something went wrong!</p>
    </div>
  );
};

export default Error;
