import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Reactions from "./pages/Reactions";
import ReactionDetails from "./pages/ReactionDetails";
import { useAppDispatch } from "./store/typed-hooks";
import { fetchReactions } from "./store/reactions/reaction-thunk";
import { authActions } from "./store/auth/auth";
import MyReactions from "./pages/MyReactions";
import ChangePassword from "./pages/ChangePassword";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchReactions());

    const user = localStorage.getItem("loggedUser");
    if (!user) return;

    const userObject = JSON.parse(user);
    dispatch(authActions.login(userObject));
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="/reactions" />} />
        <Route path="/reactions" element={<Reactions />} />
        <Route path="/reactions/:reactionId" element={<ReactionDetails />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/my-reactions" element={<MyReactions />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
