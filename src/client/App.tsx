
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import MyPost from "./components/MyPost";
import Profile from "./components/Profile";




function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/posts/*" element={<MyPost />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
