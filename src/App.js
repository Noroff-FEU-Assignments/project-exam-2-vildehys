import HomePage from "./components/pages/home/HomePage";
import NavLayout from "./components/layout/NavLayout";
import Register from "./components/pages/login/Register";
import Login from "./components/pages/login/Login";
import ProfileDetails from "./components/pages/admin/profiles/ProfileDetails";
import Profiles from "./components/pages/admin/profiles/Profiles";
import UserPage from "./components/pages/admin/user/UserPage";
import Posts from "./components/pages/admin/posts/Posts";
import PostDetails from "./components/pages/admin/posts/PostDetails";
import NewPost from "./components//pages/admin/posts/NewPost";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./sass/styles.scss";

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <Router>
          <NavLayout />
          <Routes>
            <Route path="/" exact element={<HomePage />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="/user/:name" element={<UserPage />}></Route>
            <Route path="/posts" element={<Posts />}></Route>
            <Route path="/posts/:id" element={<PostDetails />}></Route>
            <Route path="/profiles" element={<Profiles />}></Route>
            <Route path="/profile/:name" element={<ProfileDetails />}></Route>
            <Route path="/new-post" element={<NewPost />}></Route>
          </Routes>
        </Router>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
