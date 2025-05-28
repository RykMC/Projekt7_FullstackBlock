import { Route, Routes } from "react-router-dom";
import PostDetailsPage from "./pages/PostDetailsPage";
import MainLayout from "./layout/MainLayout";
import CreatePostPage from "./pages/CreatePostPage";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Unser Fullstack Block</h1>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path element={<Home />} />
          <Route path="createPost" element={<CreatePostPage />} />
          <Route path="details" element={<PostDetailsPage />} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
