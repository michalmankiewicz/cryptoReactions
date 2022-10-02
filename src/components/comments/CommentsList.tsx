import CommentItem from "./CommentItem";
import classes from "./CommentsList.module.css";
import { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/typed-hooks";
import { fetchComments } from "../../store/comments/comment-thunk";
import { useParams } from "react-router-dom";
import NewComment from "./NewComment";
import LoadingSpinner from "../UI/LoadingSpinner";

const CommentsList = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const comments = useAppSelector((state) => state.comments.comments);
  const fetchingStatus = useAppSelector((state) => state.comments.status);

  const { reactionId } = params;
  console.log(reactionId);
  useEffect(() => {
    if (reactionId) dispatch(fetchComments(reactionId));
    else return;
  }, [reactionId]);

  return (
    <div className={classes["comments-container"]}>
      <h2>Comments</h2>

      <NewComment />
      {fetchingStatus === "pending" && <LoadingSpinner />}
      {fetchingStatus === "fullfilled" && (
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
    </div>
  );
};

export default CommentsList;
