import { Fragment } from "react";

import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main className={classes.main}>{children}</main>
    </Fragment>
  );
};

export default Layout;
