import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import EditPostModal from "./EditPostModal";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log("useParams ID:", useParams);
  // console.log("ID:", id);
  // State für Modal und Aktionen
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionMessage, setActionMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchPostDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/posts/${id}`
        );
        if (!response.ok) {
          throw new Error(
            `Fehler beim Laden des Beitrags (${response.status})`
          );
        }
        const json = await response.json();
        // console.log(json);
        setPost(json.data);

        // DEBUG: Konsolenausgabe zum Überprüfen des Posts
        console.log("Geladener Post:", json.data);

        setError(null);
      } catch (err) {
        console.error("Fehler beim Laden des Beitrags:", err);
        setError(
          "Der Beitrag konnte nicht geladen werden. Bitte versuche es später erneut."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  // Funktion zum Formatieren des Datums
  const formatDate = (dateString) => {
    if (!dateString) return "Kein Datum verfügbar";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Ungültiges Datum";
    }
    return date.toLocaleDateString("de-DE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // HIER IST DIE FEHLENDE FUNKTION
  // Handler zum Speichern der bearbeiteten Post-Daten
  const handleSaveEdit = (updatedPost) => {
    setPost(updatedPost);
    console.log("HandleSave", updatedPost);
    setActionMessage({
      type: "success",
      text: "Beitrag wurde erfolgreich aktualisiert.",
    });

    // Nachricht nach 3 Sekunden ausblenden
    setTimeout(() => setActionMessage({ type: "", text: "" }), 3000);
  };

  // Handler zum Löschen des Posts (DELETE-Methode)
  const handleDelete = async () => {
    setIsDeleting(true);
    setActionMessage({
      type: "success",
      text: "Beitrag wurde erfolgreich gelöscht!",
    });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/posts/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Fehler beim Löschen (${response.status})`);
      }

      // Zur Hauptseite zurückkehren nach erfolgreichem Löschen
      setActionMessage({
        type: "success",
        text: "Beitrag wurde erfolgreich gelöscht.",
      });

      // Kurze Verzögerung, damit der Benutzer die Erfolgsmeldung sehen kann
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error("Fehler beim Löschen:", err);
      setActionMessage({
        type: "error",
        text: "Der Beitrag konnte nicht gelöscht werden. Bitte versuche es später erneut.",
      });
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Zurück-Button */}
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Zurück zur Übersicht
          </Link>
        </div>

        {/* Ladezustand */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        )}

        {/* Fehler */}
        {error && !loading && (
          <div className="bg-red-900/40 border border-red-700 text-red-300 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Fehler</h3>
            <p>{error}</p>
          </div>
        )}

        {/* Aktionsmeldungen */}
        {actionMessage.text && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              actionMessage.type === "success"
                ? "bg-green-900/40 border border-green-700 text-green-300"
                : "bg-red-900/40 border border-red-700 text-red-300"
            }`}
          >
            <p>{actionMessage.text}</p>
          </div>
        )}

        {/* Post-Detail */}
        {post && !loading && !error && (
          <>
            <article className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden">
              {/* Cover-Bild (falls vorhanden) */}
              {post.cover && (
                <div className="w-full h-40 bg-black/20 flex items-center justify-center rounded-lg overflow-hidden">
                  <img
                    src={post.cover}
                    alt={post.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}

              {/* Post-Inhalt */}
              <div className="p-6 sm:p-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-amber-400 mb-4">
                  {post.title}
                </h1>

                <div className="flex items-center text-gray-400 mb-6">
                  <span className="mr-4">
                    <span className="font-semibold text-cyan-300">Autor:</span>{" "}
                    {post.author}
                  </span>
                  <span>
                    <span className="font-semibold text-cyan-300">Datum:</span>{" "}
                    {formatDate(post.date)}
                  </span>
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-gray-200 whitespace-pre-line leading-relaxed">
                    {post.content}
                  </p>
                </div>
              </div>
            </article>

            {/* Aktionsbuttons */}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-lg transition flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Bearbeiten
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-medium rounded-lg transition flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Löschen
              </button>
            </div>
          </>
        )}

        {/* Edit Post Modal */}
        <EditPostModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEdit}
          post={post}
        />

        {/* Löschen-Bestätigungsdialog */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-red-400 mb-4">
                Beitrag löschen
              </h3>
              <p className="text-gray-300 mb-6">
                Bist du sicher, dass du diesen Beitrag löschen möchtest? Diese
                Aktion kann nicht rückgängig gemacht werden.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-lg transition"
                  disabled={isDeleting}
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-medium rounded-lg transition flex items-center"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
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
                      Löschen...
                    </>
                  ) : (
                    <>Ja, löschen</>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
