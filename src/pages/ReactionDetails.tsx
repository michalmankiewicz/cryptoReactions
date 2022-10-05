import ReactionItem from "../components/reactions/ReactionItem";
import CommentsList from "../components/comments/CommentsList";
import { Fragment } from "react";
import { useAppSelector } from "../store/typed-hooks";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useParams, useNavigate } from "react-router-dom";

const ReactionDetails = () => {
  const navigate = useNavigate();
  const reactions = useAppSelector((state) => state.reactions.reactions);
  const params = useParams();
  const { reactionId } = params;
  const reactionsFetchingStatus = useAppSelector(
    (state) => state.reactions.status
  );

  const chosenReaction = reactions.find(
    (reaction) => reaction.id === Number(reactionId)
  );

  if (!chosenReaction) {
    navigate("/not-found");
  }

  return (
    <Fragment>
      {reactionsFetchingStatus === "fullfilled" && chosenReaction && (
        <ReactionItem
          key={chosenReaction.id}
          id={chosenReaction.id}
          authorId={chosenReaction.authorId}
          date={chosenReaction.date}
          crypto={chosenReaction.crypto}
          price={chosenReaction.price}
          author={chosenReaction.author}
          text={chosenReaction.text}
        />
      )}
      {reactionsFetchingStatus === "pending" && <LoadingSpinner />}

      <CommentsList />
    </Fragment>
  );
};

export default ReactionDetails;
