import classes from "./Filters.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const Filters = (props: { filter: string }) => {
  const navigate = useNavigate();

  const dropdownChangeHandler = (
    event: React.FocusEvent<HTMLSelectElement>
  ) => {
    console.log(event.target.value);
    navigate({
      pathname: "",
      search: `?filter=${event.target.value}`,
    });
  };

  return (
    <div>
      <select
        value={props.filter}
        onChange={dropdownChangeHandler}
        className={classes.filters}
      >
        <option value="All" className={classes.filter}>
          All
        </option>
        <option value="BTC" className={classes.filter}>
          BTC
        </option>
        <option value="ETH" className={classes.filter}>
          ETH
        </option>
        <option value="ADA" className={classes.filter}>
          ADA
        </option>
        <option value="ATOM" className={classes.filter}>
          ATOM
        </option>
      </select>
    </div>
  );
};

export default Filters;
