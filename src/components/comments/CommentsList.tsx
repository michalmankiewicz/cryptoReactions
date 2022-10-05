import CommentItem from "./CommentItem";
import classes from "./CommentsList.module.css";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/typed-hooks";
import { fetchComments } from "../../store/comments/comment-thunk";
import { useParams } from "react-router-dom";
import NewComment from "./NewComment";
import LoadingSpinner from "../UI/LoadingSpinner";

const CommentsList = () => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => state.comments.comments);
  const fetchingStatus = useAppSelector((state) => state.comments.status);

  const params = useParams();
  const { reactionId } = params;

  useEffect(() => {
    if (reactionId) dispatch(fetchComments(reactionId));
    else return;
  }, [reactionId, dispatch]);

  return (
    <div className={classes["comments-container"]}>
      <h2>Comments</h2>

      <NewComment />
      {fetchingStatus === "pending" && <LoadingSpinner />}
      {fetchingStatus === "fullfilled" && comments.length > 0 && (
        <ul className={classes.comments}>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              id={comment.id}
              date={comment.date}
              authorId={comment.authorId}
              text={comment.text}
              author={comment.author}
            />
          ))}
        </ul>
      )}
      {fetchingStatus === "fullfilled" &&
        (comments.length === 0 || !comments) && (
          <p className="message">No comments</p>
        )}
    </div>
  );
};

export default CommentsList;
