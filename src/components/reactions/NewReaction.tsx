import Card from "../UI/Card";
import classes from "./NewReaction.module.css";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/typed-hooks";
import { useRef, useState } from "react";
import { addReaction } from "../../store/reactions/reaction-thunk";
const NewReaction = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const { username, userId } = useAppSelector((state) => state.auth.loggedUser);
  const cryptos = ["BTC", "ETH", "ADA", "ATOM"];
  const textInputRef = useRef<HTMLTextAreaElement>(null);
  const cryptoInputRef = useRef<HTMLSelectElement>(null);
  const [textError, setTextError] = useState(false);
  const dispatch = useAppDispatch();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    const enteredCrypto = cryptoInputRef.current!.value;

    if (!enteredText || enteredText.length === 0) {
      setTextError(true);
      return;
    }

    const newReaction = {
      author: username,
      authorId: userId,
      crypto: enteredCrypto,
      date: new Date().toISOString(),
      id: Math.random(),
      price: 1234545,
      text: enteredText,
    };

    dispatch(addReaction(newReaction));

    console.log(enteredText, enteredCrypto, username, userId);
    textInputRef.current!.value = "";
    cryptoInputRef.current!.value = "BTC";
  };

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <h2 className={classes.title}>Post your reaction</h2>
        <textarea className={classes.input} rows={3} ref={textInputRef} />
        {textError && (
          <p className={classes.error}>Reaction text can not be empty!</p>
        )}
        <div className={classes.actions}>
          <select className={classes.cryptos} ref={cryptoInputRef}>
            {cryptos.map((crypto) => (
              <option key={crypto} value={crypto}>
                {crypto}
              </option>
            ))}
          </select>
          <button className="btn">POST</button>
        </div>
      </form>
      {!isAuth && (
        <div className={classes["login-overlay"]}>
          <Link to="/login" className={`btn ${classes.login}`}>
            Login to discuss
          </Link>
        </div>
      )}
    </Card>
  );
};

export default NewReaction;
