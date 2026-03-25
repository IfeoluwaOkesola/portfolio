export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Contact</h2>

        <p className="text-lg text-gray-700 mb-8">
          I’m open to backend engineering roles, collaborations, and interesting 
          projects. Feel free to reach out.
        </p>

        <div className="space-y-4">
          <p>
            📧{" "}
            <a
              href="mailto:ifeoluwa.o.okesola@gmail.com"
              className="underline hover:text-gray-500"
            >
              ifeoluwa.o.okesola@gmail.com
            </a>
          </p>

          <p>
            💻{" "}
            <a
              href="https://github.com/IfeoluwaOkesola"
              target="_blank"
              className="underline hover:text-gray-500"
            >
              GitHub
            </a>
          </p>

          <p>
            🔗{" "}
            <a
              href="https://www.linkedin.com/in/ifeoluwa-okesola-128584252/"
              target="_blank"
              className="underline hover:text-gray-500"
            >
              LinkedIn
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}