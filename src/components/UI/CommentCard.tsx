import classes from "./CommentCard.module.css";

type Props = {
  children?: React.ReactNode;
};

const CommentCard = ({ children }: Props) => {
  return <div className={classes.card}>{children}</div>;
};

export default CommentCard;
