import { ChatCircleDots } from "phosphor-react";
import { Link, useParams } from "react-router-dom";
import Card from "../UI/Card";
import classes from "./ReactionItem.module.css";

type ReactionProp = {
  authorId: string;
  id: number;
  date: string;
  crypto: string;
  price: number;
  author: string;
  text: string;
};

const ReactionItem = (props: ReactionProp) => {
  const date = new Date(props.date);
  console.log(date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minutes =
    date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();

  const params = useParams();
  const { reactionId } = params;

  return (
    <Card>
      <figure className={classes.reaction}>
        <figcaption className={classes.title}>
          <div className={classes.author}>{props.author}</div>
          <div className={classes["title-text"]}>on ${props.crypto}</div>
          <img
            src={`../assets/${props.crypto}.svg`}
            className={classes["crypto-icon"]}
            alt={`${props.crypto} coin`}
          />
        </figcaption>
        <blockquote className={classes.text}>{props.text}</blockquote>
        <div className={classes["more-info"]}>
          {reactionId === undefined && (
            <Link
              to={`../reactions/${props.id.toString()}`}
              className={classes.comments}
            >
              <ChatCircleDots className={classes.icon} /> <span>Comments</span>
            </Link>
          )}
          <p className={classes.date}>
            Posted on: {day}/{month}/{year} {hour}:{minutes}
          </p>
        </div>
      </figure>
    </Card>
  );
};

export default ReactionItem;
