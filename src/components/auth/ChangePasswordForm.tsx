import classes from "./ChangePasswordForm.module.css";
import { Fragment, useState, useEffect } from "react";
import Card from "../UI/Card";
import { useAppDispatch, useAppSelector } from "../../store/typed-hooks";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../store/auth/auth-thunk";

let initiated = false;

const ChangePasswordForm = () => {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fetchingStatus = useAppSelector((state) => state.auth.status);
  const errorMessage = useAppSelector((state) => state.auth.errorMessage);
  const token = useAppSelector((state) => state.auth.loggedUser.token);

  useEffect(() => {
    if (!initiated) {
      initiated = !initiated;
    } else {
      navigate("/reactions", { replace: true });
      initiated = !initiated;
    }
  }, [token]);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (enteredPassword.trim().length < 6) {
      setIsError(true);
      return;
    }

    dispatch(changePassword({ token, newPassword: enteredPassword }));
    setEnteredPassword("");
    setIsError(false);
  };
  const passwordChangeHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setEnteredPassword(event.target.value);
  };

  return (
    <Fragment>
      <h2 className="title">Change Password</h2>
      <Card>
        <form onSubmit={submitHandler} className={classes.form}>
          <input
            onChange={passwordChangeHandler}
            className={classes.control}
            type="password"
            value={enteredPassword}
          />
          {isError && (
            <p className="error">
              Wrong Password. It should have more than 6 digits
            </p>
          )}
          {fetchingStatus === "error" && (
            <p className="error">{errorMessage}</p>
          )}
          <button className={`btn ${classes.action}`}>Change password</button>
        </form>
        {fetchingStatus === "pending" && (
          <div className={classes["login-overlay"]}>
            <LoadingSpinner />
          </div>
        )}
      </Card>
    </Fragment>
  );
};

export default ChangePasswordForm;
