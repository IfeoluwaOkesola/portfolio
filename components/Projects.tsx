const projects = [
  {
    title: "Cloud Infrastructure for Retail Microservices",
    description:
      "Provisioned AWS infrastructure for a retail application on Amazon EKS using Terraform, including segmented networking, load balancing, IAM/RBAC access control, and CI/CD workflows.",
    impact: [
      "Designed reproducible infrastructure using Terraform",
      "Deployed microservices to EKS with private worker nodes",
      "Implemented IAM and Kubernetes RBAC for secure access control",
      "Automated terraform plan/apply workflows using GitHub Actions",
      "Deprovisioned infrastructure after validation to optimize cloud costs",
    ],
    stack: [
      "Terraform",
      "AWS",
      "EKS",
      "IAM",
      "RBAC",
      "GitHub Actions",
      "ALB",
      "VPC",
    ],
    github:
      "https://github.com/IfeoluwaOkesola/innovatemart-project-bedrock-infra",
    note: "Infrastructure is currently offline to optimize cloud costs. The repository contains reproducible infrastructure code and setup instructions.",
  },
  {
    title: "Driver Offense Tracking System",
    description:
      "A rule-based backend system that tracks driver violations such as speeding and seatbelt offenses, automatically assigns penalty points, and triggers coaching workflows.",
    impact: [
      "Reduced manual HR intervention through automation",
      "Enabled proactive driver performance monitoring",
      "Improved safety compliance through behavioral tracking",
    ],
    stack: [
      "NestJS",
      "TypeScript",
      "MSSQL",
      "TypeORM",
      "Google Geocoding API",
    ],
    note: "Codebase is private due to company confidentiality.",
  },
  {
    title: "Fintech Currency Exchange Platform (FxPal)",
    description:
      "A secure backend system for a currency exchange platform with real-time processing and multi-level KYC verification.",
    impact: [
      "Implemented BVN and tier-based KYC verification",
      "Integrated real-time financial services",
      "Built scalable architecture using gRPC",
    ],
    stack: ["NestJS", "TypeScript", "MongoDB", "gRPC"],
    note: "Codebase is private due to company confidentiality.",
  },
  {
    title: "QR Code Check-in System",
    description:
      "A real-time check-in/out system designed to improve efficiency and security during high-traffic events.",
    impact: [
      "Reduced check-in time by over 50%",
      "Eliminated manual entry errors",
      "Improved security with trackable access",
    ],
    stack: ["NestJS", "GraphQL", "MongoDB", "Mongoose"],
    note: "Codebase is private due to project confidentiality.",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
          Selected Work
        </p>
        <h2 className="text-3xl font-bold mb-10">Projects</h2>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="p-8 bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300"
            >
              {/* Title */}
              <h3 className="text-2xl font-semibold mb-3">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 mb-5 leading-relaxed">
                {project.description}
              </p>

              {/* Impact */}
              <div className="mb-5">
                <h4 className="font-semibold mb-2">Impact</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {project.impact.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Stack */}
              <div className="flex flex-wrap gap-3 mb-5">
                {project.stack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-gray-100 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* GitHub Button (only shows if exists) */}
              {project.github && (
                <div className="mb-5">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block px-5 py-2 bg-black text-white rounded-xl hover:opacity-90 transition"
                  >
                    View on GitHub
                  </a>
                </div>
              )}

              {/* Note */}
              <p className="text-sm text-gray-500 italic">
                {project.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}