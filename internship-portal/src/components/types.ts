export type DepartmentName = "Finance" | "Technology" | "Marketing" | "Operations" | "HR";
export type Status = "Active" | "Inactive" | "On Leave";

export interface Intern {
  id: number;
  name: string;
  email: string;
  department: DepartmentName;
  startDate: string;
  status: Status;
  avatar: string;
  reason?: string;
  supervisorId?: number;
}

export interface Department {
  id: number;
  name: DepartmentName;
  internCount: number;
  headCount: number;
  color: string;
}

export interface Supervisor {
  id: number;
  name: string;
  email: string;
  department: DepartmentName;
  internCount: number;
  avatar: string;
}

export interface AttendanceRecord {
  id: number;
  internId: number;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: "Present" | "Absent" | "Late";
}

export interface EvaluationCriterion {
  name: string;
  score: number; // 1-5
}

export interface Evaluation {
  id: number;
  internId: number;
  internName: string;
  supervisorId: number;
  supervisorName: string;
  criteria: EvaluationCriterion[];
  overallScore: number; // 1-5
  feedback: string;
  date: string;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: "intern" | "staff";
  department?: DepartmentName;
  supervisorId?: number;
  supervisorName?: string;
  startDate?: string;
  bio?: string;
  phone?: string;
}

export const DEPARTMENTS: DepartmentName[] = [
  "Finance",
  "Technology",
  "Marketing",
  "Operations",
  "HR",
];

// NOTE: `reason` holds free-text leave/inactivity context (e.g. medical, family).
// This is mock data for the demo only. If this becomes real intern data, gate
// visibility of `reason` to staff/HR roles only — don't expose it to other interns
// or on any public-facing view.
export const MOCK_INTERNS: Intern[] = [
  { id: 1, name: "Sophia Nguyen", email: "sophia.nguyen@intern.co", department: "Finance", startDate: "2026-01-15", status: "Active", avatar: "SN", supervisorId: 1 },
  { id: 2, name: "Marcus Chen", email: "marcus.chen@intern.co", department: "Technology", startDate: "2026-01-20", status: "Active", avatar: "MC", supervisorId: 2 },
  { id: 3, name: "Amelia Torres", email: "amelia.torres@intern.co", department: "Marketing", startDate: "2026-02-03", status: "Active", avatar: "AT", supervisorId: 3 },
  { id: 4, name: "James Okafor", email: "james.okafor@intern.co", department: "Operations", startDate: "2026-02-10", status: "Inactive", avatar: "JO", supervisorId: 1, reason: "Medical leave — expected return 2026-08-01" },
  { id: 5, name: "Priya Sharma", email: "priya.sharma@intern.co", department: "HR", startDate: "2026-02-14", status: "Active", avatar: "PS", supervisorId: 4 },
  { id: 6, name: "Luca Ferreira", email: "luca.ferreira@intern.co", department: "Finance", startDate: "2026-03-01", status: "Active", avatar: "LF", supervisorId: 1 },
  { id: 7, name: "Yuki Tanaka", email: "yuki.tanaka@intern.co", department: "Technology", startDate: "2026-03-05", status: "Active", avatar: "YT", supervisorId: 2 },
  { id: 8, name: "Nia Williams", email: "nia.williams@intern.co", department: "Marketing", startDate: "2026-03-11", status: "Inactive", avatar: "NW", supervisorId: 3, reason: "Academic break — returning next semester" },
  { id: 9, name: "Oliver Beckett", email: "oliver.beckett@intern.co", department: "Finance", startDate: "2026-03-18", status: "Active", avatar: "OB", supervisorId: 1 },
  { id: 10, name: "Sara Kowalski", email: "sara.kowalski@intern.co", department: "Operations", startDate: "2026-04-01", status: "Active", avatar: "SK", supervisorId: 4 },
  { id: 11, name: "Darius Osei", email: "darius.osei@intern.co", department: "Technology", startDate: "2026-04-07", status: "On Leave", avatar: "DO", supervisorId: 2, reason: "Family emergency — 2 weeks" },
  { id: 12, name: "Elena Popescu", email: "elena.popescu@intern.co", department: "HR", startDate: "2026-04-14", status: "Active", avatar: "EP", supervisorId: 4 },
  { id: 13, name: "Arjun Patel", email: "arjun.patel@intern.co", department: "Finance", startDate: "2026-04-21", status: "On Leave", avatar: "AP", supervisorId: 1, reason: "Personal leave — 1 week" },
  { id: 14, name: "Chiara Romano", email: "chiara.romano@intern.co", department: "Marketing", startDate: "2026-05-05", status: "Active", avatar: "CR", supervisorId: 3 },
  { id: 15, name: "Felix Braun", email: "felix.braun@intern.co", department: "Technology", startDate: "2026-05-12", status: "Active", avatar: "FB", supervisorId: 2 },
  { id: 16, name: "Amara Diallo", email: "amara.diallo@intern.co", department: "Operations", startDate: "2026-05-19", status: "Active", avatar: "AD", supervisorId: 4 },
  { id: 17, name: "Noah Jansen", email: "noah.jansen@intern.co", department: "HR", startDate: "2026-05-26", status: "Inactive", avatar: "NJ", supervisorId: 4, reason: "Program completed — offboarded" },
  { id: 18, name: "Isabella Cruz", email: "isabella.cruz@intern.co", department: "Finance", startDate: "2026-06-02", status: "Active", avatar: "IC", supervisorId: 1 },
  { id: 19, name: "Kevin Adeyemi", email: "kevin.adeyemi@intern.co", department: "Marketing", startDate: "2026-06-09", status: "Active", avatar: "KA", supervisorId: 3 },
  { id: 20, name: "Zoe Fischer", email: "zoe.fischer@intern.co", department: "Technology", startDate: "2026-06-15", status: "Active", avatar: "ZF", supervisorId: 2 }
];

export const MOCK_DEPARTMENTS: Department[] = [
  { id: 1, name: "Finance", internCount: 5, headCount: 1, color: "#059669" },
  { id: 2, name: "Technology", internCount: 5, headCount: 1, color: "#08738a" },
  { id: 3, name: "Marketing", internCount: 4, headCount: 1, color: "#d97706" },
  { id: 4, name: "Operations", internCount: 3, headCount: 1, color: "#7c3aed" },
  { id: 5, name: "HR", internCount: 3, headCount: 1, color: "#dc2626" },
];

export const MOCK_SUPERVISORS: Supervisor[] = [
  { id: 1, name: "Sarah Johnson", email: "sarah.johnson@company.com", department: "Finance", internCount: 5, avatar: "SJ" },
  { id: 2, name: "David Kim", email: "david.kim@company.com", department: "Technology", internCount: 5, avatar: "DK" },
  { id: 3, name: "Maria Gonzalez", email: "maria.gonzalez@company.com", department: "Marketing", internCount: 4, avatar: "MG" },
  { id: 4, name: "Robert Chen", email: "robert.chen@company.com", department: "Operations", internCount: 3, avatar: "RC" },
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id: 1, internId: 1, date: "2026-06-22", checkIn: "08:55", checkOut: "17:05", status: "Present" },
  { id: 2, internId: 1, date: "2026-06-23", checkIn: "09:10", checkOut: "17:00", status: "Late" },
  { id: 3, internId: 1, date: "2026-06-24", checkIn: "08:45", checkOut: "17:15", status: "Present" },
  { id: 4, internId: 2, date: "2026-06-22", checkIn: "08:50", checkOut: "17:00", status: "Present" },
  { id: 5, internId: 2, date: "2026-06-23", checkIn: "08:55", checkOut: "17:10", status: "Present" },
  { id: 6, internId: 2, date: "2026-06-24", checkIn: "09:20", checkOut: "17:00", status: "Late" },
  { id: 7, internId: 3, date: "2026-06-22", checkIn: "08:30", checkOut: "17:30", status: "Present" },
  { id: 8, internId: 3, date: "2026-06-23", checkIn: "08:35", checkOut: "17:25", status: "Present" },
  { id: 9, internId: 3, date: "2026-06-24", status: "Absent" },
  { id: 10, internId: 4, date: "2026-06-22", checkIn: "09:00", checkOut: "17:00", status: "Present" },
  { id: 11, internId: 4, date: "2026-06-23", checkIn: "09:05", checkOut: "17:00", status: "Present" },
  { id: 12, internId: 4, date: "2026-06-24", checkIn: "09:00", checkOut: "17:00", status: "Present" },
];

export const MOCK_EVALUATIONS: Evaluation[] = [
  { id: 1, internId: 1, internName: "Sophia Nguyen", supervisorId: 1, supervisorName: "Sarah Johnson", criteria: [
    { name: "Performance", score: 4 },
    { name: "Communication", score: 5 },
    { name: "Punctuality", score: 4 },
    { name: "Teamwork", score: 5 },
  ], overallScore: 4.5, feedback: "Sophia shows excellent analytical skills and strong communication with the team. Could improve on meeting deadlines.", date: "2026-06-15" },
  { id: 2, internId: 2, internName: "Marcus Chen", supervisorId: 2, supervisorName: "David Kim", criteria: [
    { name: "Performance", score: 5 },
    { name: "Communication", score: 4 },
    { name: "Punctuality", score: 5 },
    { name: "Teamwork", score: 4 },
  ], overallScore: 4.5, feedback: "Marcus is a top performer with exceptional technical skills. Could be more proactive in team discussions.", date: "2026-06-15" },
  { id: 3, internId: 3, internName: "Amelia Torres", supervisorId: 3, supervisorName: "Maria Gonzalez", criteria: [
    { name: "Performance", score: 3 },
    { name: "Communication", score: 4 },
    { name: "Punctuality", score: 3 },
    { name: "Teamwork", score: 4 },
  ], overallScore: 3.5, feedback: "Amelia has good creative ideas but needs to work on consistency and time management.", date: "2026-06-10" },
  { id: 4, internId: 5, internName: "Priya Sharma", supervisorId: 4, supervisorName: "Robert Chen", criteria: [
    { name: "Performance", score: 5 },
    { name: "Communication", score: 5 },
    { name: "Punctuality", score: 5 },
    { name: "Teamwork", score: 5 },
  ], overallScore: 5, feedback: "Outstanding performance across all areas. Priya is a model intern.", date: "2026-06-20" },
  { id: 5, internId: 7, internName: "Yuki Tanaka", supervisorId: 2, supervisorName: "David Kim", criteria: [
    { name: "Performance", score: 4 },
    { name: "Communication", score: 3 },
    { name: "Punctuality", score: 4 },
    { name: "Teamwork", score: 3 },
  ], overallScore: 3.5, feedback: "Yuki is technically strong but needs to improve communication skills and engage more with the team.", date: "2026-06-18" },
];

export const MOCK_PROFILE: UserProfile = {
  id: 1,
  name: "Marcus Chen",
  email: "marcus.chen@intern.co",
  role: "intern",
  department: "Technology",
  supervisorId: 2,
  supervisorName: "David Kim",
  startDate: "2026-01-20",
  bio: "Computer Science student passionate about frontend development and user experience design.",
  phone: "+1 (555) 123-4567",
};
