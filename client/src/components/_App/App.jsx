// Routes
import { Link, Route, Routes } from "react-router";

// Pages
import UploadPage from "../../pages/UploadPage/UploadPage";
import DownloadUseState from "../../pages/UploadPage/components/DonwloadUseState";
import Base64 from "../../pages/UploadPage/components/Base64";

// Styles
import "./App.css";

function App() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <header className="bg-blue-600 w-full p-4 text-white text-center flex gap-x-2">
        <Link to="/home">ALBASEID</Link>
        <Link to="/upload-page">Upload</Link>
      </header>
      <main className=" w-full">
        <Routes>
          {/* Route parent */}
          <Route path="/upload-page" element={<UploadPage />}>
            {/* Route enfant qui s'affiche dans l'Outlet */}
            <Route path="download-usestate" element={<DownloadUseState />} />
            <Route path="base-64" element={<Base64 />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
