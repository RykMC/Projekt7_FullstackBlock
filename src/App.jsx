import { Route, Routes } from "react-router-dom";
import PostDetailsPage from "./pages/PostDetailsPage";
import MainLayout from "./layout/MainLayout";
import CreatePostPage from "./pages/CreatePostPage";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="createPost" element={<CreatePostPage />} /> 
          <Route path="details" element={<PostDetailsPage />} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
