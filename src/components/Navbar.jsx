import { Link } from "react-router-dom";
import { FiHome, FiPlusCircle, FiInfo, FiMenu } from "react-icons/fi";
import { useState } from "react";
import CreatePostPage from "../pages/CreatePostPage";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-indigo-400">
          🧱 Fullstack Block
        </Link>

        {/* Desktop Nav */}
        <button onClick={() => setModalOpen(true)}>➕ Beitrag erstellen</button>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FiMenu />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-2 space-y-2">
          <MobileLink to="/createPostPage" label="Beitrag erstellen" />
        </div>
      )}
      <CreatePostPage
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        addPost={addPost}
      />
    </header>
  );
}
