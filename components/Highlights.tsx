const achievements = [
  "First runner-up at the 2023 International Breweries hackathon, receiving a $2000 prize.",
  "Top 20 out of 100 capstone projects in the Women Techsters Fellowship.",
  "Top three ranking in the Interswitch Job Shadowing cohort.",
];

const certifications = [
  "JavaScript Algorithms and Data Structures — freeCodeCamp",
  "Backend Development and APIs — freeCodeCamp",
  "Diploma in Cloud Engineering — AltSchool Africa",
];

export default function Highlights() {
  return (
    <section id="highlights" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
          Recognition
        </p>
        <h2 className="text-3xl font-bold mb-10">Achievements & Certifications</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl border border-gray-200 bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Achievements</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-3">
              {achievements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="p-8 rounded-3xl border border-gray-200 bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Certifications</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-3">
              {certifications.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}