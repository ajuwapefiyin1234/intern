export type Department = "Finance" | "Technology" | "Marketing" | "Operations" | "HR";
export type Status = "Active" | "Inactive";

export interface Intern {
  id: number;
  name: string;
  email: string;
  department: Department;
  startDate: string;
  status: Status;
  avatar: string;
  reason?: string;
}

export const DEPARTMENTS: Department[] = [
  "Finance",
  "Technology",
  "Marketing",
  "Operations",
  "HR",
];

export const MOCK_INTERNS: Intern[] = [
  { id: 1, name: "Sophia Nguyen", email: "sophia.nguyen@intern.co", department: "Finance", startDate: "2026-01-15", status: "Active", avatar: "SN" },
  { id: 2, name: "Marcus Chen", email: "marcus.chen@intern.co", department: "Technology", startDate: "2026-01-20", status: "Active", avatar: "MC" },
  { id: 3, name: "Amelia Torres", email: "amelia.torres@intern.co", department: "Marketing", startDate: "2026-02-03", status: "Active", avatar: "AT" },
  { id: 4, name: "James Okafor", email: "james.okafor@intern.co", department: "Operations", startDate: "2026-02-10", status: "Inactive", avatar: "JO" },
  { id: 5, name: "Priya Sharma", email: "priya.sharma@intern.co", department: "HR", startDate: "2026-02-14", status: "Active", avatar: "PS" },
  { id: 6, name: "Luca Ferreira", email: "luca.ferreira@intern.co", department: "Finance", startDate: "2026-03-01", status: "Active", avatar: "LF" },
  { id: 7, name: "Yuki Tanaka", email: "yuki.tanaka@intern.co", department: "Technology", startDate: "2026-03-05", status: "Active", avatar: "YT" },
  { id: 8, name: "Nia Williams", email: "nia.williams@intern.co", department: "Marketing", startDate: "2026-03-11", status: "Inactive", avatar: "NW" },
  { id: 9, name: "Oliver Beckett", email: "oliver.beckett@intern.co", department: "Finance", startDate: "2026-03-18", status: "Active", avatar: "OB" },
  { id: 10, name: "Sara Kowalski", email: "sara.kowalski@intern.co", department: "Operations", startDate: "2026-04-01", status: "Active", avatar: "SK" },
  { id: 11, name: "Darius Osei", email: "darius.osei@intern.co", department: "Technology", startDate: "2026-04-07", status: "Active", avatar: "DO" },
  { id: 12, name: "Elena Popescu", email: "elena.popescu@intern.co", department: "HR", startDate: "2026-04-14", status: "Active", avatar: "EP" },
  { id: 13, name: "Arjun Patel", email: "arjun.patel@intern.co", department: "Finance", startDate: "2026-04-21", status: "Inactive", avatar: "AP" },
  { id: 14, name: "Chiara Romano", email: "chiara.romano@intern.co", department: "Marketing", startDate: "2026-05-05", status: "Active", avatar: "CR" },
  { id: 15, name: "Felix Braun", email: "felix.braun@intern.co", department: "Technology", startDate: "2026-05-12", status: "Active", avatar: "FB" },
  { id: 16, name: "Amara Diallo", email: "amara.diallo@intern.co", department: "Operations", startDate: "2026-05-19", status: "Active", avatar: "AD" },
  { id: 17, name: "Noah Jansen", email: "noah.jansen@intern.co", department: "HR", startDate: "2026-05-26", status: "Inactive", avatar: "NJ" },
  { id: 18, name: "Isabella Cruz", email: "isabella.cruz@intern.co", department: "Finance", startDate: "2026-06-02", status: "Active", avatar: "IC" },
  { id: 19, name: "Kevin Adeyemi", email: "kevin.adeyemi@intern.co", department: "Marketing", startDate: "2026-06-09", status: "Active", avatar: "KA" },
  { id: 20, name: "Zoe Fischer", email: "zoe.fischer@intern.co", department: "Technology", startDate: "2026-06-15", status: "Active", avatar: "ZF" }
];
