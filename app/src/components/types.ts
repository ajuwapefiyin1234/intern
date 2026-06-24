
export type InternStatus = "Active" | "Inactive" | "On Leave";

export type Intern = {
  id: number;
  name: string;
  email: string;
  department: string;
  startDate: string;
  status: InternStatus;
  avatar: string;
  inactiveReason?: string;
};

export const DEPARTMENTS = [
  "Technology",
  "Finance",
  "Marketing",
  "HR",
  "Operations",
] as const;

export const MOCK_INTERNS: Intern[] = [
  {
    id: 1,
    name: "Sophia Nguyen",
    email: "sophia.nguyen@intern.co",
    department: "Technology",
    startDate: "2026-01-15",
    status: "Active",
    avatar: "SN",
  },
  {
    id: 2,
    name: "Marcus Chen",
    email: "marcus.chen@intern.co",
    department: "Finance",
    startDate: "2026-01-15",
    status: "Active",
    avatar: "MC",
  },
  {
    id: 3,
    name: "James Okafor",
    email: "james.okafor@intern.co",
    department: "Marketing",
    startDate: "2026-02-01",
    status: "Inactive",
    avatar: "JO",
    inactiveReason: "Medical leave — expected return 2026-07-01",
  },
  {
    id: 4,
    name: "Aisha Patel",
    email: "aisha.patel@intern.co",
    department: "Technology",
    startDate: "2026-01-15",
    status: "Active",
    avatar: "AP",
  },
  {
    id: 5,
    name: "Liam Johnson",
    email: "liam.johnson@intern.co",
    department: "HR",
    startDate: "2026-03-01",
    status: "Active",
    avatar: "LJ",
  },
  {
    id: 6,
    name: "Emma Rodriguez",
    email: "emma.rodriguez@intern.co",
    department: "Technology",
    startDate: "2026-01-15",
    status: "Active",
    avatar: "ER",
  },
  {
    id: 7,
    name: "Noah Kim",
    email: "noah.kim@intern.co",
    department: "Finance",
    startDate: "2026-02-15",
    status: "On Leave",
    avatar: "NK",
    inactiveReason: "Personal leave — approved until 2026-06-30",
  },
  {
    id: 8,
    name: "Olivia Martinez",
    email: "olivia.martinez@intern.co",
    department: "Marketing",
    startDate: "2026-03-01",
    status: "Active",
    avatar: "OM",
  },
  {
    id: 9,
    name: "Daniel Lee",
    email: "daniel.lee@intern.co",
    department: "Operations",
    startDate: "2026-02-01",
    status: "Active",
    avatar: "DL",
  },
  {
    id: 10,
    name: "Priya Sharma",
    email: "priya.sharma@intern.co",
    department: "HR",
    startDate: "2026-03-01",
    status: "Active",
    avatar: "PS",
  },
  {
    id: 11,
    name: "Ethan Brown",
    email: "ethan.brown@intern.co",
    department: "Technology",
    startDate: "2026-01-15",
    status: "Inactive",
    avatar: "EB",
    inactiveReason: "Academic break — expected return 2026-08-15",
  },
  {
    id: 12,
    name: "Mia Wilson",
    email: "mia.wilson@intern.co",
    department: "Finance",
    startDate: "2026-02-15",
    status: "Active",
    avatar: "MW",
  },
  {
    id: 13,
    name: "Lucas Garcia",
    email: "lucas.garcia@intern.co",
    department: "Technology",
    startDate: "2026-03-15",
    status: "Active",
    avatar: "LG",
  },
  {
    id: 14,
    name: "Zara Ahmed",
    email: "zara.ahmed@intern.co",
    department: "Marketing",
    startDate: "2026-02-01",
    status: "On Leave",
    avatar: "ZA",
    inactiveReason: "Family emergency — expected return 2026-07-10",
  },
  {
    id: 15,
    name: "Ryan Taylor",
    email: "ryan.taylor@intern.co",
    department: "Technology",
    startDate: "2026-01-15",
    status: "Active",
    avatar: "RT",
  },
];
