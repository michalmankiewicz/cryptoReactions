import { Link } from "react-router-dom";
import Nav from "../nav/Nav";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <Link to="/reactions" className={classes.logo}>
        CryptoReactions
      </Link>
      <Nav />
    </header>
  );
};

export default MainNavigation;
