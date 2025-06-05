import { useState, useEffect } from "react";

export default function EditPostModal({ isOpen, onClose, post, onSave }) {
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    content: "",
    cover: "",
    date: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Initialisiere Formular, wenn Modal geöffnet und Post vorhanden
  useEffect(() => {
    if (isOpen && post) {
      setFormData({
        id: post.id || "",
        author: post.author || "",
        title: post.title || "",
        content: post.content || "",
        cover: post.cover || "",
        date: post.date
          ? post.date.split("T")[0]
          : new Date().toISOString().split("T")[0],
      });
    }
  }, [isOpen, post]);

  // Eingabeänderung
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Speichern
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!post?.id) return setError("Fehlende Post-ID!");

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/posts/${post.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Fehler beim Speichern (${response.status})`);
      }
      const result = await response.json();
      console.log("Result", result);

      onSave(result.data[0]); // Parent informieren
      onClose(); // Modal schließen
    } catch (err) {
      console.error("Fehler beim Aktualisieren:", err);
      setError(
        "Beitrag konnte nicht gespeichert werden. Bitte erneut versuchen."
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-gray-800 text-white w-full max-w-xl rounded-xl shadow-xl border border-gray-700">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-amber-400">
              Beitrag bearbeiten
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              ✖
            </button>
          </div>

          {error && (
            <div className="bg-red-900/40 border border-red-700 text-red-300 p-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <InputField
              label="Titel"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <InputField
              label="Autor"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
            <TextareaField
              label="Inhalt"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
            <InputField
              label="Cover-URL"
              name="cover"
              value={formData.cover}
              onChange={handleChange}
            />
            <InputField
              label="Datum"
              name="date"
              value={formData.date}
              onChange={handleChange}
              type="date"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg"
              disabled={isSaving}
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center"
              disabled={isSaving}
            >
              {isSaving ? "Speichern..." : "Speichern"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 🔧 Input-Komponente
function InputField({ label, name, value, onChange, type = "text", required }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm text-gray-300 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
    </div>
  );
}

// 🔧 Textarea-Komponente
function TextareaField({ label, name, value, onChange, required }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm text-gray-300 mb-1">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        rows={6}
        onChange={onChange}
        required={required}
        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
    </div>
  );
}
