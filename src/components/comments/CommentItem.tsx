import Comment from "../../model/Comment";
import classes from "./CommentItem.module.css";

const CommentItem = (props: Comment) => {
  const releaseTimestamp = new Date(props.date).getTime();
  const currentTimestamp = Date.now();
  const timeDiff = (currentTimestamp - releaseTimestamp) / 1000;

  let releaseTime;
  let timeType;

  if (timeDiff < 3600) {
    releaseTime = Math.ceil(timeDiff / 60);
    timeType = "minutes";
  } else if (timeDiff < 86400) {
    releaseTime = Math.ceil(timeDiff / 3600);
    timeType = "hours";
  } else if (timeDiff < 604800) {
    releaseTime = Math.ceil(timeDiff / 86400);
    timeType = "days";
  } else {
    releaseTime = Math.ceil(timeDiff / 604800);
    timeType = "weeks";
  }

  return (
    <li className={classes.comment}>
      <div className={classes.details}>
        <h2 className={classes.author}>{props.author}</h2>
        <span className={classes.release}>
          {releaseTime} {timeType} ago
        </span>
      </div>

      <div className={classes["comment-card"]}>
        <p className={classes.text}>{props.text}</p>
      </div>
    </li>
  );
};

export default CommentItem;
