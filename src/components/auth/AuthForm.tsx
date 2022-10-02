import classes from "./AuthForm.module.css";
import Card from "../UI/Card";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/typed-hooks";
import { authActions } from "../../store/auth/auth";
import { useNavigate } from "react-router-dom";
import { sendNewUserData, fetchUserData } from "../../store/auth/auth-thunk";
import LoadingSpinner from "../UI/LoadingSpinner";
import Error from "../UI/Error";

const AuthForm = () => {
  const fetchingStatus = useAppSelector((state) => state.auth.status);
  const errorMessage = useAppSelector((state) => state.auth.errorMessage);
  const navigate = useNavigate();

  useEffect(() => {
    if (fetchingStatus === "fullfilled")
      navigate("/reactions", { replace: true });
    else return;
  }, [fetchingStatus]);

  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredNickname, setEnteredNickname] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const dispatch = useAppDispatch();

  const isEmailValid =
    enteredEmail.includes("@") && enteredEmail.trim().length > 6;
  const isPasswordValid = enteredPassword.trim().length > 6;
  const isNicknameValid = enteredNickname.trim().length > 3;

  const isFormValid =
    isEmailValid && isPasswordValid && (isLoggingIn || isNicknameValid);

  const toggleForm = () => {
    setIsLoggingIn(!isLoggingIn);
  };

  const changeEmailHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    // console.log(event.ta);
    setEnteredEmail(event.target.value);
  };
  const changePasswordHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setEnteredPassword(event.target.value);
  };

  const changeNicknameHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setEnteredNickname(event.target.value);
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    setIsTouched(true);

    if (!isFormValid) {
      console.log("Form not valid", isEmailValid, isPasswordValid);
      return;
    }

    if (isLoggingIn)
      dispatch(
        fetchUserData({ email: enteredEmail, password: enteredPassword })
      );
    else
      dispatch(
        sendNewUserData({ email: enteredEmail, password: enteredPassword })
      );

    // console.log(isEmailValid, isPasswordValid);

    setIsTouched(false);
    setEnteredEmail("");
    setEnteredNickname("");
    setEnteredPassword("");
  };

  const emailInputErrorClasses =
    !isEmailValid && isTouched ? classes.error : "";
  const passwordInputErrorClasses =
    !isPasswordValid && isTouched ? classes.error : "";
  const nicknameInputErrorClasses =
    !isNicknameValid && isTouched ? classes.error : "";

  return (
    <section className={classes.auth}>
      <h1>{isLoggingIn ? "Log In" : "Sing In"}</h1>
      <form onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            value={enteredEmail}
            type="email"
            id="email"
            required
            onChange={changeEmailHandler}
            className={emailInputErrorClasses}
          />
          {!isEmailValid && isTouched && (
            <p className={classes.error}>Wrong Email</p>
          )}
        </div>

        {!isLoggingIn && (
          <div className={classes.control}>
            <label htmlFor="nickname">Your Nickname</label>
            <input
              value={enteredNickname}
              type="text"
              id="nickname"
              required
              onChange={changeNicknameHandler}
              className={nicknameInputErrorClasses}
            />
            {!isNicknameValid && isTouched && (
              <p className={classes.error}>
                Wrong Password. It should have more than 4 digits
              </p>
            )}
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            value={enteredPassword}
            type="password"
            id="password"
            required
            onChange={changePasswordHandler}
            className={passwordInputErrorClasses}
          />
          {!isPasswordValid && isTouched && (
            <p className={classes.error}>
              Wrong Password. It should have more than 6 digits
            </p>
          )}
        </div>
        {fetchingStatus === "error" && (
          <p className={classes.error}>{errorMessage}</p>
        )}
        <div className={classes.actions}>
          <button type="submit" className="btn">
            {isLoggingIn ? "Log In" : "Sing In"}
          </button>

          <button onClick={toggleForm} type="button" className={classes.toggle}>
            {isLoggingIn ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
      {fetchingStatus === "pending" && (
        <div className={classes["login-overlay"]}>
          <LoadingSpinner />
        </div>
      )}
    </section>
  );
};

export default AuthForm;
