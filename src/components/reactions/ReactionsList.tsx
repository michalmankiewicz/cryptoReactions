import ReactionItem from "./ReactionItem";
import classes from "./ReactionsList.module.css";
import NewReaction from "./NewReaction";
import { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/typed-hooks";
import { fetchReactions } from "../../store/reactions/reaction-thunk";
import LoadingSpinner from "../UI/LoadingSpinner";
import Reaction from "../../model/Reaction";

const ReactionsList = () => {
  const reactions = useAppSelector((state) => state.reactions.reactions);

  const fetchingStatus = useAppSelector((state) => state.reactions.status);

  const sortedReactions = [...reactions].sort((a, b) => {
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();

    return timeB - timeA;
  });

  return (
    <Fragment>
      <NewReaction />

      <ul className={classes.list}>
        {fetchingStatus === "pending" ? (
          <LoadingSpinner />
        ) : (
          sortedReactions.map((reaction) => (
            <ReactionItem
              key={reaction.id}
              id={reaction.id}
              authorId={reaction.authorId}
              date={reaction.date}
              crypto={reaction.crypto}
              price={reaction.price}
              author={reaction.author}
              text={reaction.text}
            />
          ))
        )}
      </ul>
    </Fragment>
  );
};

export default ReactionsList;
