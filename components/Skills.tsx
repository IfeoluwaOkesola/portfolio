const skills = [
  {
    category: "Backend",
    items: ["Node.js", "NestJS", "GraphQL", "REST APIs"],
  },
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "C#"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL", "MSSQL"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS (EC2, S3)", "Docker", "Nginx", "CI/CD (GitHub Actions)"],
  },
  {
    category: "Tools & Others",
    items: ["Swagger", "Postman", "Git", "Contentful CMS"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
          Core Stack
        </p>
        <h2 className="text-3xl font-bold mb-10">Skills</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((group, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-3xl shadow-sm border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-4">{group.category}</h3>

              <div className="flex flex-wrap gap-3">
                {group.items.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-gray-100 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}