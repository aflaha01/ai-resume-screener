/* Author: Aflaha on Jan 30, 2026 
   Purpose: Defines the Profile TypeScript interface used for user profile data across the application. 
   Props: None 
*/

export interface Profile {
  name: string;
  email: string;
  phone: string;
  summary: string[];
  skills: string[];
  education: string[];
  experience: string[];
  projects: string[];
  certifications: string[];
}
