import { useState } from "react";

export default function CreatePostPage({ isOpen, onClose, addPost }) {
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    content: "",
    cover: "",
    date: "",
  });

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Fehler beim Speichern");

      const result = await response.json();
      addPost(result.data);
      alert("Beitrag erfolgreich erstellt");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Fehler beim Erstellen des Beitrags");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4">
      <div className="bg-gray-800 border border-gray-700 text-white w-full max-w-xl rounded-xl p-6 shadow-xl space-y-4">
        <h2 className="text-2xl font-bold text-amber-400 mb-2">
          📝 Neuer Beitrag
        </h2>

        <input
          type="text"
          placeholder="Autor"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        <input
          type="text"
          placeholder="Titel"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        <textarea
          placeholder="Inhalt..."
          rows={5}
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        <input
          type="text"
          placeholder="Cover URL"
          value={formData.cover}
          onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        <div className="flex justify-end gap-4 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition"
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
}
