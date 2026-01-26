import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg max-w-2xl w-full text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          AI-Powered Resume Screener
        </h1>

        <p className="text-gray-600 text-lg mb-8 md:mb-12 leading-relaxed">
          Upload your resume, get AI-driven insights, match with jobs, and
          prepare for interviews — all in one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login" className="w-full sm:w-auto">
            <button className="w-full px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Login
            </button>
          </Link>

          <Link href="/register" className="w-full sm:w-auto">
            <button className="w-full px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
