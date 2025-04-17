import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">Network Scanner</h1>
      <p className="text-lg mb-8 text-gray-700">
        Welcome! Scan your local network and view connected devices.
      </p>
      <div className="flex space-x-4">
      <Link
        to="/signup"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Sign up
      </Link>
      <Link
        to="/signin"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Sign In
      </Link>
      </div>
    </div>
  );
};

export default MainPage;
