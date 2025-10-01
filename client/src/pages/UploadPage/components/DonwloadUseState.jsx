import { useState } from "react";

function DownloadUseState() {
  const [avatar, setAvatar] = useState(
    "https://img.daisyui.com/images/profile/demo/superperson@192.webp"
  );

  // Fonction appelée quand l'utilisateur choisit une image
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
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
      </div>
    </div>
  );
}

export default DownloadUseState;
