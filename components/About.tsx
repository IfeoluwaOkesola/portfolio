export default function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
          About Me
        </p>

        <h2 className="text-3xl font-bold mb-6">Building systems that solve real problems</h2>

        <div className="space-y-5 text-lg text-gray-700 leading-relaxed">
          <p>
            I am a backend engineer with over 3 years of experience building scalable,
            secure, and efficient systems. I specialize in designing robust APIs and
            backend architectures using technologies like NestJS, TypeScript, and Node.js.
          </p>

          <p>
            In my work, I have engineered systems that automate decision-making processes,
            reduce manual intervention, and improve operational efficiency. From rule-based
            driver tracking systems to fintech platforms with secure KYC flows, I focus on
            building solutions that have measurable impact.
          </p>

          <p>
            Beyond backend development, I also work with cloud infrastructure and DevOps
            practices, including containerized deployments, CI/CD pipelines, and AWS
            services. I enjoy thinking through architecture, performance, maintainability,
            and long-term scalability.
          </p>
        </div>
      </div>
    </section>
  );
}