import PostDetailsPage from "./pages/PostDetailsPage";
import MainLayout from "./layout/MainLayout";
import CreatePostPage from "./pages/CreatePostPage";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/details" element={<PostDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
