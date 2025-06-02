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

  // Formular initialisieren, wenn sich der Post ändert oder das Modal geöffnet wird
  useEffect(() => {
    if (post && isOpen) {
      setFormData({
        ...post,
        date: post.date
          ? post.date.split("T")[0]
          : new Date().toISOString().split("T")[0],
      });
    }
  }, [post, isOpen]);

  // Handler für Änderungen im Formular
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handler zum Speichern der Änderungen
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/posts/${post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Fehler beim Speichern (${response.status})`);
      }

      const result = await response.json();
      onSave(result.data); // Aktualisierte Daten an Parent-Komponente übergeben
      onClose(); // Modal schließen
    } catch (err) {
      console.error("Fehler beim Aktualisieren:", err);
      setError(
        "Der Beitrag konnte nicht aktualisiert werden. Bitte versuche es später erneut."
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center overflow-y-auto p-4">
      <div
        className="relative bg-gray-800/95 border border-gray-700 text-white w-full max-w-md 
        rounded-xl shadow-xl mx-auto my-8 transition-all transform 
        md:max-w-lg lg:max-w-xl"
      >
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-amber-400">
              Beitrag bearbeiten
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-900/40 border border-red-700 text-red-300 rounded">
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Titel
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>

            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Autor
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author || ""}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Inhalt
              </label>
              <textarea
                id="content"
                name="content"
                rows="6"
                value={formData.content || ""}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              ></textarea>
            </div>

            <div>
              <label
                htmlFor="cover"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Cover URL (optional)
              </label>
              <input
                type="text"
                id="cover"
                name="cover"
                value={formData.cover || ""}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Datum
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date || ""}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-lg transition"
                disabled={isSaving}
              >
                Abbrechen
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition flex items-center"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Speichern...
                  </>
                ) : (
                  <>Speichern</>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
