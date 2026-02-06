/* Author: Aflaha on Feb 1, 2026 
   Purpose: Renders the main dashboard page for authenticated users 
   Props: None 
*/

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
        <p className="text-gray-600 mb-6">Welcome to your dashboard!</p>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Dashboard</h2>
          <p className="text-gray-600">
            This is a simple dashboard page. Your profile has been successfully submitted.
          </p>
        </div>
      </div>
    </div>
  );
}