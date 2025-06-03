import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreatePostPage from "./CreatePostPage";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const addPost = async (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:3000/posts");
        if (!res.ok) throw new Error("Fehler beim Laden");
        const json = await res.json();
        // Reverse the array to show newest posts first
        setPosts(json.data.reverse());
      } catch (err) {
        console.error("Fehler beim Laden:", err);
      }
    };
    fetchPosts();
  }, []);
  console.log("Posts Check", posts);

  return (
    <>
      <div className="space-y-8 px-4 md:px-10 py-6">
        <div>
          <h2 className="text-3xl font-extrabold text-cyan-300 mb-2">
            Willkommen zurück 👋
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Hier kannst du neue Beiträge erstellen, vorhandene ansehen oder mehr
            über deinen Fullstack Block erfahren.
          </p>
        </div>

        <div className="bg-gray-600 border border-gray-700 p-6 rounded-xl shadow-md hover:shadow-xl transition">
          <h3 className="text-2xl font-bold text-amber-400 mb-4">
            📝 Letzte Beiträge
          </h3>

          {posts.length === 0 ? (
            <p className="text-gray-400">Noch keine Beiträge vorhanden.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {posts.map((post, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded shadow">
                  <Link to={`/posts/${post.id}`} className="block">
                    <h3 className="text-amber-300 font-bold hover:text-amber-200 transition">
                      {post.title}
                    </h3>
                    <p className="text-gray-300">
                      {post.content}
                      {/* // {.substring(0, 10)} */}
                      {/* {post.content.length > 10 ? "..." : ""} */}
                    </p>
                    <div className="flex justify-between mt-2">
                      <p className="text-xs text-gray-500">{post.author}</p>
                      <p className="text-xs text-gray-500">
                        {post.date
                          ? new Date(post.date).toLocaleDateString("de-DE")
                          : "Kein Datum"}
                      </p>
                    </div>
                    <div className="mt-2 text-right">
                      <span className="text-xs text-cyan-500 hover:text-cyan-400 transition">
                        Weiterlesen →
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-indigo-500 hover:bg-indigo-600 cursor-pointer text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            ➕ Beitrag erstellen
          </button>

          <span className="text-sm text-gray-500">
            ... oder sieh dir bestehende Beiträge an.
          </span>
        </div>
      </div>

      <CreatePostPage
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        addPost={addPost}
      />
    </>
  );
}
