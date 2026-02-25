import Navbar from "@/components/common/Navbar";
import { FileText, Briefcase, Zap } from "lucide-react";

/**
  Author: Aflaha on Jan 30, 2026
  Purpose: Renders the landing page of the application, showcasing
           features of the AI resume screening platform. Includes global navigation via Navbar component.
  Props: None
 */


export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-200">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              AI-Powered Resume Screening
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Screen Resumes Faster with{' '}
              <span className="text-blue-600">AI Intelligence</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
              Upload resumes, get AI insights, match jobs, and hire smarter.
            </p>

            {/* Feature Cards - Simple */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-blue-100 text-center hover:shadow-md transition-shadow">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Smart Parsing</h3>
                <p className="text-sm text-gray-600">Extract key info automatically</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-blue-100 text-center hover:shadow-md transition-shadow">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Job Matching</h3>
                <p className="text-sm text-gray-600">Match candidates with jobs</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-blue-100 text-center hover:shadow-md transition-shadow">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">AI Insights</h3>
                <p className="text-sm text-gray-600">Get detailed analytics</p>
              </div>
            </div>

            {/* Simple Footer */}
            <div className="mt-16 text-sm text-gray-500">
              © 2024 AI Resume Screener
            </div>
          </div>
        </div>
      </main>
    </>
  );
}