import { Route, Routes } from "react-router-dom";
import { Identify, Chat } from "../components";

const Router = () => (
  <Routes>
    <Route exact path="/" element={<Identify />} />
    <Route exact path="/chat" element={<Chat />} />
    <Route path="*" element={<Identify />} />
  </Routes>
);

export default Router;
