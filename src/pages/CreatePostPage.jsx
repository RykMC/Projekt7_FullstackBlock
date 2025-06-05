import { useState } from "react";

export default function CreatePostPage({ isOpen, onClose, addPost }) {
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    content: "",
    cover: "",
    date: new Date().toISOString().split("T")[0], // Setzt das heutige Datum als Standard
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const newPostData = { ...formData };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/posts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPostData),
        }
      );

      if (!response.ok) {
        throw new Error(`Fehler beim Speichern: ${response.status}`);
      }
      const res = await response.json();
      const newPost = res.data; // Annahme: Die API gibt das erstellte Objekt zurück

      console.log("newPost vom Server:", newPost);

      // Benachrichtige die übergeordnete Komponente, um den Post hinzuzufügen
      addPost(newPost);

      // Formular zurücksetzen
      setFormData({
        author: "",
        title: "",
        content: "",
        cover: "",
        date: new Date().toISOString().split("T")[0],
      });

      onClose();
    } catch (error) {
      console.error("Fehler beim Erstellen des Beitrags:", error);
      alert("Fehler beim Erstellen des Beitrags");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm flex justify-center items-center overflow-y-auto p-4">
      <div className="relative bg-gray-800/95 border border-gray-700 text-white w-full max-w-md rounded-xl shadow-xl mx-auto my-8 transition-all transform md:max-w-lg lg:max-w-xl">
        <div className="p-4 sm:p-6 overflow-hidden">
          <h2 className="text-2xl font-bold text-amber-400 mb-4">
            📝 Neuer Beitrag
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Autor"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <input
              type="text"
              placeholder="Titel"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <textarea
              placeholder="Inhalt..."
              name="content"
              rows={5}
              value={formData.content}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <input
              type="text"
              placeholder="Cover URL"
              name="cover"
              value={formData.cover}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <input
              type="date"
              value={formData.date}
              name="date"
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <div className="flex justify-end gap-4 pt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 cursor-pointer text-white font-semibold rounded-lg transition"
              >
                Abbrechen
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 cursor-pointer text-white font-semibold rounded-lg transition"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
