import ReactionItem from "./ReactionItem";
import classes from "./ReactionsList.module.css";
import NewReaction from "./NewReaction";
import { Fragment } from "react";
import { useAppSelector } from "../../store/typed-hooks";
import LoadingSpinner from "../UI/LoadingSpinner";
import Filters from "../filters/Filters";
import { useLocation } from "react-router-dom";

const ReactionsList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get("filter") || "All";

  const reactions = useAppSelector((state) => state.reactions.reactions);
  const fetchingStatus = useAppSelector((state) => state.reactions.status);

  let filteredReactions;
  if (filter !== "All") {
    filteredReactions = reactions.filter(
      (reaction) => reaction.crypto === filter
    );
  } else filteredReactions = reactions;

  const sortedReactions = [...filteredReactions].sort((a, b) => {
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();

    return timeB - timeA;
  });

  return (
    <Fragment>
      <NewReaction />
      <Filters filter={filter} />

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
