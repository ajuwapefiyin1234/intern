export type TaskStatus = "Not Started" | "In Progress" | "Completed" | "Blocked";

export type PortalTask = {
  id: number;
  title: string;
  description: string;
  category: "Learning" | "Project" | "Administrative";
  status: TaskStatus;
  progress: number;
  dueDate: string;
  blocker?: string;
};

export type PortalAnnouncement = {
  id: number;
  title: string;
  body: string;
  author: string;
  date: string;
  audience: string;
  pinned?: boolean;
};

export const portalTasks: PortalTask[] = [
  {
    id: 1,
    title: "Complete React fundamentals module",
    description: "Go through the official React docs and complete all exercises.",
    category: "Learning",
    status: "Completed",
    progress: 100,
    dueDate: "Jun 10",
  },
  {
    id: 2,
    title: "Build internship portal dashboard UI",
    description: "Design and implement the main dashboard layout using React.",
    category: "Project",
    status: "In Progress",
    progress: 65,
    dueDate: "Jun 30",
  },
  {
    id: 3,
    title: "TypeScript generics deep-dive",
    description: "Study generics, utility types, and conditional types.",
    category: "Learning",
    status: "In Progress",
    progress: 40,
    dueDate: "Jul 5",
  },
  {
    id: 4,
    title: "Weekly status report",
    description: "Submit week 25 status update to the team.",
    category: "Administrative",
    status: "Blocked",
    progress: 20,
    dueDate: "Jun 27",
    blocker:
      "Waiting for project spec documents from the Product team before I can complete the report.",
  },
];

export const portalAnnouncements: PortalAnnouncement[] = [
  {
    id: 1,
    title: "Welcome to Week 25 - Mid-Program Check-In",
    body:
      "Hi everyone! We're at the halfway mark of the internship program. Please ensure your task logs are up to date before the end of this week.",
    author: "Patricia Osei",
    date: "Jun 22, 2026",
    audience: "All Interns",
    pinned: true,
  },
  {
    id: 2,
    title: "Technology Team Sprint Planning - June 30",
    body:
      "All Technology interns: please attend the sprint planning session on June 30 at 10:00 AM in Conference Room B.",
    author: "Daniel Kim",
    date: "Jun 20, 2026",
    audience: "Technology Dept.",
  },
  {
    id: 3,
    title: "Finance Interns - Q2 Deadline Reminder",
    body:
      "Q2 reconciliation tasks are due by June 28. Please reach out if you need additional access or data.",
    author: "Linda Eze",
    date: "Jun 19, 2026",
    audience: "Finance Dept.",
    pinned: true,
  },
  {
    id: 4,
    title: "Holiday Notice - July 4",
    body:
      "The office will be closed on July 4. Task deadlines falling on that date will be automatically extended to July 5.",
    author: "Patricia Osei",
    date: "Jun 18, 2026",
    audience: "All Interns",
  },
];

export const departmentProgress = [
  { name: "Finance", count: 3, progress: 62 },
  { name: "Technology", count: 4, progress: 78 },
  { name: "Marketing", count: 2, progress: 39 },
  { name: "Operations", count: 1, progress: 18 },
  { name: "HR", count: 2, progress: 38 },
];
