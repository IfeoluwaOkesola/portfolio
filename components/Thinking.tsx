export default function Thinking() {
  return (
    <section id="thinking" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
          Engineering Thinking
        </p>

        <h2 className="text-3xl font-bold mb-10">
          How I approach backend systems
        </h2>

        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
          <p>
            I approach backend development by thinking in terms of systems, not just features. 
            My focus is on building architectures that are scalable, maintainable, and resilient 
            under real-world usage.
          </p>

          <p>
            When designing a system, I prioritize clear data flow, separation of concerns, and 
            extensibility. My aim is to ensure that new features can be added with minimal disruption.
          </p>

          <p>
            I also pay close attention to automation and operational efficiency, reducing manual 
            intervention through well-designed workflows, background processes, and CI/CD pipelines.
          </p>

          <p>
            Security and performance are always part of the design from the start, not afterthoughts. 
            From implementing access control to designing efficient database queries, I build systems 
            that are reliable in production environments.
          </p>
        </div>
      </div>
    </section>
  );
}