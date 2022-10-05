import classes from "./NewComment.module.css";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/typed-hooks";
import Card from "../UI/Card";
import { Link, useParams } from "react-router-dom";
import { sendNewComments } from "../../store/comments/comment-thunk";

const NewComment = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const { username, userId } = useAppSelector((state) => state.auth.loggedUser);
  const dispatch = useAppDispatch();
  const textInputRef = useRef<HTMLInputElement>(null);
  const [textError, setTextError] = useState(false);
  const params = useParams();
  const { reactionId } = params;

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;

    if (!enteredText || enteredText.length === 0) {
      setTextError(true);
      return;
    }

    const newComment = {
      author: username,
      authorId: userId,
      date: new Date().toISOString(),
      id: Math.random(),
      text: enteredText,
    };

    dispatch(sendNewComments({ newComment, reactionId }));

    textInputRef.current!.value = "";
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <input className={classes.input} type="text" ref={textInputRef} />

        <button className="btn">POST</button>
      </form>
      {textError && <p className="error">Comment can not be empty!</p>}
      {!isAuth && (
        <div className={classes["login-overlay"]}>
          <Link to="/login" className={`btn ${classes.login}`}>
            Login to comment
          </Link>
        </div>
      )}
    </Card>
  );
};

export default NewComment;
