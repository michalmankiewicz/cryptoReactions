import Comment from "../../model/Comment";
import classes from "./CommentItem.module.css";

const CommentItem = (props: Comment) => {
  return (
    <li className={classes.comment}>
      <h2 className={classes.author}>{props.author}</h2>
      <div className={classes["comment-card"]}>
        <p className={classes.text}>{props.text}</p>
      </div>
    </li>
  );
};

export default CommentItem;
