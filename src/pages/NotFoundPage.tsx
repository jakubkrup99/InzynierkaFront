import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-indigo-600 mb-4">404</h1>
          <div className="relative inline-block">
            <svg
              className="w-32 h-32 mx-auto text-indigo-400 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Oops! Page Not Found
        </h2>

        <p className="text-gray-600 mb-8 text-lg">
          The page you're looking for doesn't exist or has been moved. Check the
          URL or return to the home page.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoHome}
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
          >
            Go Home
          </button>

          <button
            onClick={handleGoBack}
            className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors border-2 border-indigo-600 shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
          >
            Go Back
          </button>
        </div>

        <div className="mt-12 text-gray-500 text-sm">
          <p>If this problem persists, please contact support.</p>
        </div>
      </div>
    </div>
  );
}
