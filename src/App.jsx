import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostDetailsPage from "./pages/PostDetailsPage";
import MainLayout from "./layout/MainLayout";
import CreatePostPage from "./pages/CreatePostPage";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/details" element={<PostDetailsPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
export default App;
