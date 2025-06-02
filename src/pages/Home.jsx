import { useEffect, useState } from "react";
import CreatePostPage from "./CreatePostPage";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);

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
  console.log(posts);

  // ✅ Neues Post direkt zur Liste hinzufügen
  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

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

        <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-md hover:shadow-xl transition">
          <h3 className="text-2xl font-bold text-amber-400 mb-2">
            📝 Letzter Beitrag
          </h3>
          {posts.length === 0 ? (
            <p className="text-gray-400">Noch keine Beiträge vorhanden.</p>
          ) : (
            <ul className="space-y-4">
              {posts.map((post, index) => (
                <li key={index} className="bg-gray-800 p-4 rounded shadow">
                  <h3 className="text-amber-300 font-bold">{post.title}</h3>
                  <p className="text-gray-300">{post.content}</p>
                  <p className="text-xs text-gray-500 mt-2">{post.author}</p>
                  {/* <p className="text-xs text-gray-500 mt-2">{post.date}</p> */}
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(post.date).toLocaleDateString("de-DE")}
                  </p>
                </li>
              ))}
            </ul>
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

      {/* 🧠 Modal erhält jetzt addPost Callback */}
      <CreatePostPage
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        addPost={addPost}
      />
    </>
  );
}
