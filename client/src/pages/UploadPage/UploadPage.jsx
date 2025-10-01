import { Link, Outlet } from "react-router";

function UploadPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6">
        <h2 className="text-xl font-bold mb-6">Menu</h2>
        <Link
          to="download-usestate"
          className="block mb-4 text-blue-600 hover:underline"
        >
          Download UseState
        </Link>
        <Link to="base-64" className="block mb-4 text-blue-600 hover:underline">
          Base64
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center my-8">
          Upload Your Files
        </h1>

        {/* Ici s'affiche la page enfant */}
        <Outlet />
      </div>
    </div>
  );
}

export default UploadPage;
