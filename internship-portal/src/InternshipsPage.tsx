import { ArrowRight, Filter, MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { internshipPostings } from "./portalData";
import "./InternshipsPage.css";

type InternshipsPageProps = {
  darkMode: boolean;
};

const departments = ["All", "Technology", "Finance", "Marketing", "HR"];

export default function InternshipsPage({ darkMode }: InternshipsPageProps) {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All");

  const filteredPostings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return internshipPostings.filter((posting) => {
      const matchesDepartment =
        department === "All" || posting.department === department;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        posting.title.toLowerCase().includes(normalizedQuery) ||
        posting.summary.toLowerCase().includes(normalizedQuery) ||
        posting.skills.some((skill) =>
          skill.toLowerCase().includes(normalizedQuery)
        );

      return matchesDepartment && matchesQuery;
    });
  }, [department, query]);

  return (
    <main className={`internships-page ${darkMode ? "dark" : "light"}`}>
      <section className="internships-hero">
        <span>Open internships</span>
        <h1>Choose the team where you want to grow.</h1>
        <p>
          Browse early program tracks across technology, finance, marketing,
          people operations, and cross-functional work.
        </p>
      </section>

      <section className="internship-controls" aria-label="Internship filters">
        <label className="internship-search">
          <Search size={17} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search roles or skills"
          />
        </label>

        <div className="department-tabs" aria-label="Departments">
          <Filter size={16} />
          {departments.map((item) => (
            <button
              key={item}
              type="button"
              className={item === department ? "active" : ""}
              onClick={() => setDepartment(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="posting-grid">
        {filteredPostings.map((posting) => (
          <article key={posting.id} className="posting-card">
            <div className="posting-card-header">
              <span>{posting.department}</span>
              <strong>{posting.status}</strong>
            </div>
            <h2>{posting.title}</h2>
            <p>{posting.summary}</p>
            <div className="posting-meta">
              <span>
                <MapPin size={15} />
                {posting.location}
              </span>
              <span>{posting.duration}</span>
            </div>
            <div className="skill-row">
              {posting.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
            <Link to="/signup" className="posting-action">
              Start application
              <ArrowRight size={16} />
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
