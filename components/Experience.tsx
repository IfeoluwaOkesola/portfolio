export default function Experience() {
  return (
    <section id="experience" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
          Qualifications
        </p>
        <h2 className="text-3xl font-bold mb-10">Experience & Education</h2>

        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Experience</h3>

            <div className="space-y-8">
              <div className="p-6 rounded-3xl border border-gray-200 bg-neutral-50">
                <h4 className="text-xl font-semibold">
                  Backend Engineer — BeerTechAfrica (AB InBev)
                </h4>
                <p className="text-gray-600 mt-1">June 2023 – Present</p>
                <ul className="list-disc list-inside mt-3 text-gray-700 space-y-1">
                  <li>Built a rule-based driver offense tracking system</li>
                  <li>Automated coaching and penalty workflows</li>
                  <li>Integrated Google Geocoding API for location-aware tracking</li>
                </ul>
              </div>

              <div className="p-6 rounded-3xl border border-gray-200 bg-neutral-50">
                <h4 className="text-xl font-semibold">
                  Backend Engineer — FxPal (Hephzit Technology)
                </h4>
                <p className="text-gray-600 mt-1">January 2024 – March 2024</p>
                <ul className="list-disc list-inside mt-3 text-gray-700 space-y-1">
                  <li>Built a fintech backend with a multi-level KYC verification system</li>
                  <li>Integrated third-party financial services</li>
                  <li>Designed secure and scalable backend architecture</li>
                </ul>
              </div>

              <div className="p-6 rounded-3xl border border-gray-200 bg-neutral-50">
                <h4 className="text-xl font-semibold">
                  DevOps Engineer — Asher Team Technology
                </h4>
                <p className="text-gray-600 mt-1">December 2025 – Present</p>
                <ul className="list-disc list-inside mt-3 text-gray-700 space-y-1">
                  <li>Deployed containerized applications on AWS EC2</li>
                  <li>Implemented CI/CD pipelines with GitHub Actions</li>
                  <li>Configured HTTPS with Nginx and Let’s Encrypt</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Education</h3>

            <div className="space-y-6">
              <div className="p-6 rounded-3xl border border-gray-200 bg-neutral-50">
                <h4 className="text-lg font-semibold">Diploma in Cloud Engineering</h4>
                <p className="text-gray-700">AltSchool Africa</p>
                <p className="text-gray-500 text-sm mt-1">November 2024 – October 2025</p>
              </div>

              <div className="p-6 rounded-3xl border border-gray-200 bg-neutral-50">
                <h4 className="text-lg font-semibold">
                  Certificate in Software Development (Magna Cum Laude)
                </h4>
                <p className="text-gray-700">Women Techsters Fellowship, Tech4Dev</p>
                <p className="text-gray-500 text-sm mt-1">August 2022 – February 2023</p>
              </div>

              <div className="p-6 rounded-3xl border border-gray-200 bg-neutral-50">
                <h4 className="text-lg font-semibold">Postgraduate Diploma in Chemistry</h4>
                <p className="text-gray-700">Bayero University Kano</p>
                <p className="text-gray-500 text-sm mt-1">September 2019 – February 2022</p>
              </div>

              <div className="p-6 rounded-3xl border border-gray-200 bg-neutral-50">
                <h4 className="text-lg font-semibold">Bachelor of Education in Chemistry</h4>
                <p className="text-gray-700">University of Ibadan</p>
                <p className="text-gray-500 text-sm mt-1">September 2009 – December 2013</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}