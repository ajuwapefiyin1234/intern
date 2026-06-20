import {
  BadgeDollarSign,
  BriefcaseBusiness,
  Code2,
  LineChart,
  Megaphone,
  Users,
} from "lucide-react";

export type InternshipPosting = {
  id: number;
  title: string;
  department: string;
  location: string;
  duration: string;
  status: "Open" | "Closing soon";
  summary: string;
  skills: string[];
  highlights: string[];
};

export const internshipPostings: InternshipPosting[] = [
  {
    id: 1,
    title: "Frontend Engineering Intern",
    department: "Technology",
    location: "Hybrid",
    duration: "12 weeks",
    status: "Open",
    summary:
      "Build React interfaces, improve accessibility, and ship polished product experiences with a mentor.",
    skills: ["React", "TypeScript", "UI systems"],
    highlights: [
      "Pair with product engineers on production UI work.",
      "Improve reusable components and accessibility details.",
      "Present a polished feature demo at the end of the program.",
    ],
  },
  {
    id: 2,
    title: "Finance Operations Intern",
    department: "Finance",
    location: "On-site",
    duration: "10 weeks",
    status: "Open",
    summary:
      "Support reporting, reconcile program expenses, and learn how finance teams guide operational decisions.",
    skills: ["Excel", "Reporting", "Analysis"],
    highlights: [
      "Prepare weekly reporting packs for program leads.",
      "Assist with reconciliations and expense categorization.",
      "Learn how finance data supports department planning.",
    ],
  },
  {
    id: 3,
    title: "Growth Marketing Intern",
    department: "Marketing",
    location: "Remote",
    duration: "12 weeks",
    status: "Closing soon",
    summary:
      "Plan campaign experiments, create content briefs, and measure acquisition across digital channels.",
    skills: ["Content", "Analytics", "Campaigns"],
    highlights: [
      "Draft campaign briefs for candidate awareness.",
      "Analyze channel performance and summarize insights.",
      "Support social and email content production.",
    ],
  },
  {
    id: 4,
    title: "People Programs Intern",
    department: "HR",
    location: "Hybrid",
    duration: "8 weeks",
    status: "Open",
    summary:
      "Help run onboarding, mentorship matching, feedback cycles, and intern community programming.",
    skills: ["Coordination", "People ops", "Communication"],
    highlights: [
      "Coordinate onboarding moments and intern check-ins.",
      "Support mentorship matching and feedback collection.",
      "Help improve the candidate-to-intern handoff.",
    ],
  },
];

export const featuredDepartments = [
  {
    name: "Technology",
    summary:
      "Product engineering, QA, data, design systems, and applied automation work.",
    icon: Code2,
  },
  {
    name: "Finance",
    summary:
      "Budget tracking, reporting, forecasting, reconciliation, and operational finance.",
    icon: BadgeDollarSign,
  },
  {
    name: "Marketing",
    summary:
      "Campaign strategy, social content, research, brand storytelling, and analytics.",
    icon: Megaphone,
  },
  {
    name: "HR",
    summary:
      "Recruiting support, onboarding, mentorship programs, and employee experience.",
    icon: Users,
  },
];

export const candidateMilestones = [
  {
    title: "Profile",
    status: "Complete",
    icon: BriefcaseBusiness,
  },
  {
    title: "Application",
    status: "In review",
    icon: LineChart,
  },
  {
    title: "Interview",
    status: "Pending",
    icon: Users,
  },
];
