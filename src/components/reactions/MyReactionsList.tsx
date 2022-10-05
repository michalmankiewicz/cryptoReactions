import classes from "./MyReactionsList.module.css";
import { Fragment } from "react";
import ReactionItem from "./ReactionItem";
import Reaction from "../../model/Reaction";
import { useAppSelector } from "../../store/typed-hooks";

import LoadingSpinner from "../UI/LoadingSpinner";

const MyReactionsList = () => {
  const reactions = useAppSelector((state) => state.reactions.reactions);
  const userId = useAppSelector((state) => state.auth.loggedUser.userId);
  const fetchingStatus = useAppSelector((state) => state.reactions.status);
  const userReactions: Reaction[] = reactions.filter(
    (reaction) => reaction.authorId === userId
  );
  return (
    <Fragment>
      <h2 className="title">My reactions</h2>
      <ul className={classes["my-reactions"]}>
        {fetchingStatus === "pending" && <LoadingSpinner />}
        {fetchingStatus === "fullfilled" &&
          userReactions.length > 0 &&
          userReactions.map((reaction) => (
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
          ))}
        {fetchingStatus === "fullfilled" && userReactions.length === 0 && (
          <p className="message">No reactions</p>
        )}
      </ul>
    </Fragment>
  );
};

export default MyReactionsList;
