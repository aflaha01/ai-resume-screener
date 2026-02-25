"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HRService } from "@/services/hr.service";
import { HRProfile } from "@/types/hr";
import { Building2, Briefcase,Edit, Users, FileText} from "lucide-react";
import Link from "next/link";
import { MEDIA_BASE_URL } from "@/lib/api";

/**
  Author: Aflaha on Feb 12, 2026
  Purpose: Renders the HR dashboard page, showing company profile information,Allows     navigation to job-related actions.
  Props: None
 */


export default function HRDashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<HRProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const hrService = new HRService();

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await hrService.getHRProfile();
        setProfile(data);
      } catch (err: any) {
        router.push("/hr/profile");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              {/* Company Logo */}
              <div className="flex-shrink-0">
                {profile.logo ? (
                  <img
                  src={`${MEDIA_BASE_URL}${profile.logo}`}
                  alt={profile.company_name}
                  className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="text-blue-600" size={32} />
                  </div>
                )}
              </div>

              {/* Company Info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{profile.company_name}</h2>
                <div className="flex items-center mt-1 text-gray-600">
                  <Briefcase size={16} className="mr-1" />
                  <span>{profile.industry}</span>
                </div>
              </div>
            </div>

            <Link
              href="/hr/profile/edit"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
            >
              <Edit size={16} className="mr-2" />
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <stat.icon className="text-blue-600" size={24} />
                </div>
              </div>
              <div className="mt-4">
                <Link href={stat.link} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  {stat.action} →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="text-center text-gray-500 py-8">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-900">No recent activity</p>
              <p className="text-sm text-gray-500 mt-1">Start posting jobs to see activity here</p>
              <Link
                 href="/hr/job-posting"
                 className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                 <Users size={16} className="mr-2" />
                 Post a Job
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const stats = [
  {
    label: "Active Jobs",
    value: "0",
    icon: Briefcase,
    action: "Post a job",
    link: "/hr/job-posting"
  },
  {
    label: "Total Applicants",
    value: "0",
    icon: Users,
    action: "View applicants",
    link: "/hr/applicants"
  },
  {
    label: "Shortlisted",
    value: "0",
    icon: FileText,
    action: "Review shortlisted",
    link: "/hr/shortlisted"
  }
];