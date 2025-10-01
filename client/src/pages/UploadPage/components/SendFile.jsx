import { useState, useRef } from "react";

function SendFile() {
  const [avatar, setAvatar] = useState(
    "https://img.daisyui.com/images/profile/demo/superperson@192.webp"
  );
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const objectUrlRef = useRef(null);

  // 1) Sélection du fichier + aperçu local
  const handleImageUpload = (event) => {
    const f = event.target.files?.[0];
    if (!f) return;

    // Nettoie un ancien ObjectURL si besoin
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    const previewUrl = URL.createObjectURL(f);
    objectUrlRef.current = previewUrl;

    setFile(f);
    setAvatar(previewUrl);
    setError("");
  };

  // 2) Envoi en multipart/form-data
  const handleSend = async () => {
    if (!file) {
      setError("Aucun fichier sélectionné.");
      return;
    }

    try {
      setIsUploading(true);
      setError("");

      const formData = new FormData();
      // IMPORTANT: le nom du champ doit être "file" pour matcher ton code formidable
      formData.append("file", file, file.name);

      const res = await fetch("http://localhost:3032/api/upload", {
        method: "POST",
        body: formData, // ne PAS mettre manuellement Content-Type
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Upload failed (${res.status})`);
      }

      const data = await res.json(); // { url: "http://localhost:3031/uploads/..." }
      console.log("Upload successful:", data);
      if (data?.url) {
        // Remplace l’aperçu local par l’URL servie par ton backend
        setAvatar(data.url);
        // Libère l’ObjectURL local, maintenant qu’on a l’URL finale
        if (objectUrlRef.current) {
          URL.revokeObjectURL(objectUrlRef.current);
          objectUrlRef.current = null;
        }
      } else {
        throw new Error("Réponse inattendue du serveur.");
      }
    } catch (e) {
      setError(e.message || "Erreur lors de l’upload.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="flex-grow flex flex-col items-center pt-5 gap-3">
        <div className="avatar">
          <div className="w-56 rounded">
            <img src={avatar} alt="Avatar" />
          </div>
        </div>

        {/* Input caché pour sélectionner un fichier */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          id="uploadInput"
          className="hidden"
        />

        <div className="flex gap-2">
          {/* Bouton pour ouvrir le picker */}
          <label
            htmlFor="uploadInput"
            className="btn btn-primary cursor-pointer"
          >
            Choisir une image
          </label>

          {/* Bouton d’envoi */}
          <button
            className="btn btn-secondary"
            onClick={handleSend}
            disabled={!file || isUploading}
          >
            {isUploading ? "Envoi..." : "Envoyer"}
          </button>
        </div>

        <p>Le but du jeu ici est de télécharger l’image vers le serveur.</p>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    </div>
  );
}

export default SendFile;
