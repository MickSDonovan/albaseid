import { useState } from "react";

function Base64() {
  const [avatar, setAvatar] = useState(
    "https://img.daisyui.com/images/profile/demo/superperson@192.webp"
  );
  const [base64Image, setBase64Image] = useState("");

  // Fonction appelée quand l'utilisateur choisit une image
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Création d'un FileReader
      const reader = new FileReader();

      // Quand la lecture est terminée
      reader.onloadend = () => {
        setAvatar(reader.result); // on remplace l'avatar par l'image base64
        setBase64Image(reader.result); // on garde la version base64
      };

      // Lire le fichier en base64
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="flex-grow flex flex-col items-center pt-5 gap-2">
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

        {/* Bouton pour déclencher l'input */}
        <label htmlFor="uploadInput" className="btn btn-primary cursor-pointer">
          Changer Avatar
        </label>

        <p>
          Le but du jeu ici est de télécharger une nouvelle image pour l'avatar.
        </p>

        {/* Affiche la chaîne base64 (juste pour debug) */}
        {base64Image && (
          <textarea
            className="w-96 h-32 p-2 border rounded mt-4 text-xs"
            value={base64Image}
            readOnly
          />
        )}
      </div>
    </div>
  );
}

export default Base64;
