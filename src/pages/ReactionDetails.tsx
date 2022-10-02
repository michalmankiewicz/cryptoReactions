import ReactionItem from "../components/reactions/ReactionItem";
import CommentsList from "../components/comments/CommentsList";
import { Fragment, useEffect } from "react";
import { useAppSelector } from "../store/typed-hooks";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NewComment from "../components/comments/NewComment";

const ReactionDetails = () => {
  const chosenReaction = useAppSelector((state) => state.reactions.reactions);
  const reactionsFetchingStatus = useAppSelector(
    (state) => state.reactions.status
  );

  const id = "0.7825971060012058";

  return (
    <Fragment>
      {reactionsFetchingStatus === "fullfilled" && (
        <ReactionItem
          key={chosenReaction[0].id}
          id={chosenReaction[0].id}
          authorId={chosenReaction[0].authorId}
          date={chosenReaction[0].date}
          crypto={chosenReaction[0].crypto}
          price={chosenReaction[0].price}
          author={chosenReaction[0].author}
          text={chosenReaction[0].text}
        />
      )}

      {reactionsFetchingStatus === "pending" && <LoadingSpinner />}
      <CommentsList />
    </Fragment>
  );
};

export default ReactionDetails;
