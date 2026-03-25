import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-6 py-20">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm md:text-base uppercase tracking-[0.2em] text-gray-500 mb-4">
            Backend Engineer • Cloud • DevOps
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Hi, I’m Ifeoluwa Okesola
          </h1>

          <p className="mt-5 text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
            I build scalable, secure, and efficient backend systems with
            NestJS, TypeScript, databases, and cloud infrastructure.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="bg-black text-white px-6 py-3 rounded-2xl hover:scale-105 hover:opacity-90 transition"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="border border-black px-6 py-3 rounded-2xl hover:bg-black hover:text-white transition"
            >
              Contact Me
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              className="px-6 py-3 rounded-2xl bg-white border hover:bg-gray-100 transition"
            >
              Download Resume
            </a>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-white">
            <Image
              src="/profile.jpg"
              alt="Ifeoluwa Okesola"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}