"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, User, Briefcase, LogIn, UserPlus } from "lucide-react";
import { ROLES } from "@/constants/roles";
import { AUTH_ROUTES } from "@/constants/routes";

export default function Navbar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  
  const loginRef = useRef<HTMLDivElement>(null);
  const signupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (loginRef.current && !loginRef.current.contains(event.target as Node)) {
        setLoginOpen(false);
      }
      if (signupRef.current && !signupRef.current.contains(event.target as Node)) {
        setSignupOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-white/95 backdrop-blur-md border-b border-blue-100 px-6 py-3 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          AI Resume Screener
        </Link>

        {/* Actions */}
        <div className="flex gap-4">
          {/* LOGIN DROPDOWN */}
          <div className="relative" ref={loginRef}>
            <button
              onClick={() => {
                setLoginOpen(!loginOpen);
                setSignupOpen(false);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-200 border ${
                loginOpen 
                  ? 'bg-blue-50 text-blue-700 border-blue-200' 
                  : 'text-gray-700 hover:bg-blue-50 border-transparent hover:border-blue-200'
              }`}
            >
              <LogIn className="w-4 h-4" />
              Login
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${loginOpen ? 'rotate-180' : ''}`} />
            </button>

            {loginOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-blue-100 rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2">
                <Link
                  href={AUTH_ROUTES.login[ROLES.HR]}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-all group"
                  onClick={() => setLoginOpen(false)}
                >
                  <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Login as HR</div>
                  </div>
                </Link>
                <Link
                  href={AUTH_ROUTES.login[ROLES.JOB_SEEKER]}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-all group"
                  onClick={() => setLoginOpen(false)}
                >
                  <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Login as Job Seeker</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* SIGNUP DROPDOWN */}
          <div className="relative" ref={signupRef}>
            <button
              onClick={() => {
                setSignupOpen(!signupOpen);
                setLoginOpen(false);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-200 bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg ${
                signupOpen ? 'scale-95 bg-blue-700' : ''
              }`}
            >
              <UserPlus className="w-4 h-4" />
              Sign Up
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${signupOpen ? 'rotate-180' : ''}`} />
            </button>

            {signupOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-blue-100 rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2">
                <Link
                  href={AUTH_ROUTES.register[ROLES.HR]}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-all group"
                  onClick={() => setSignupOpen(false)}
                >
                  <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Signup as HR</div>
                  </div>
                </Link>
                <Link
                  href={AUTH_ROUTES.register[ROLES.JOB_SEEKER]}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-all group"
                  onClick={() => setSignupOpen(false)}
                >
                  <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Signup as Job Seeker</div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}