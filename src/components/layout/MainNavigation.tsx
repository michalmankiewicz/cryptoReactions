import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useAppSelector, useAppDispatch } from "../../store/typed-hooks";
import { authActions } from "../../store/auth/auth";

const MainNavigation = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const username = useAppSelector((state) => state.auth.loggedUser.username);

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <header className={classes.header}>
      <Link to="/reactions" className={classes.logo}>
        CryptoReactions
      </Link>
      <nav className={classes.nav}>
        <ul>
          {isAuth && <a className={classes["my-reactions"]}>{username}</a>}
          {isAuth ? (
            <a className="btn" onClick={logoutHandler}>
              Log out
            </a>
          ) : (
            <Link to="/login" className="btn">
              Log in
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
