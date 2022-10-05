import classes from "./Nav.module.css";
import { useAppSelector, useAppDispatch } from "../../store/typed-hooks";
import { authActions } from "../../store/auth/auth";
import Card from "../UI/Card";
import { Link, NavLink } from "react-router-dom";

const Nav = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const username = useAppSelector((state) => state.auth.loggedUser.username);

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <nav className={classes.nav}>
      {isAuth && (
        <div className={classes.account}>
          <div className={classes.avatar}>{username[0].toUpperCase()}</div>
          <div className={classes["account-modal"]}>
            <Card>
              <h3 className={classes.greeting}>Hi, {username}!</h3>
              <ul className={classes["nav-links"]}>
                <NavLink
                  to="/my-reactions"
                  className={(NavData) =>
                    NavData.isActive
                      ? `${classes["nav-link"]} ${classes.active}`
                      : classes["nav-link"]
                  }
                >
                  My reactions
                </NavLink>
                <NavLink
                  to="/change-password"
                  className={(NavData) =>
                    NavData.isActive
                      ? `${classes["nav-link"]} ${classes.active}`
                      : classes["nav-link"]
                  }
                >
                  Change password
                </NavLink>
                <li onClick={logoutHandler} className={classes["nav-link"]}>
                  Logout
                </li>
              </ul>
            </Card>
          </div>
        </div>
      )}

      {!isAuth && (
        <Link to="/login" className={`btn ${classes.login}`}>
          Log in
        </Link>
      )}
    </nav>
  );
};

export default Nav;
