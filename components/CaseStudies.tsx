"use client";

import { useState } from "react";
import { caseStudies } from "@/data/case-studies";
import type { CaseStudyBlock } from "@/types/case-study";

function CaseStudyContent({ blocks }: { blocks: CaseStudyBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === "subheading") {
          return (
            <h4 key={i} className="text-lg font-semibold mt-6 mb-2">
              {block.text}
            </h4>
          );
        }

        if (block.type === "list") {
          const items = block.items.map((item, j) => <li key={j}>{item}</li>);
          return block.ordered ? (
            <ol
              key={i}
              className="list-decimal list-inside text-gray-700 space-y-1 mb-4"
            >
              {items}
            </ol>
          ) : (
            <ul
              key={i}
              className="list-disc list-inside text-gray-700 space-y-1 mb-4"
            >
              {items}
            </ul>
          );
        }

        return (
          <p key={i} className="text-gray-700 leading-relaxed mb-4">
            {block.text}
          </p>
        );
      })}
    </>
  );
}

export default function CaseStudies() {
  const [openSlugs, setOpenSlugs] = useState<Set<string>>(new Set());

  const toggle = (slug: string) => {
    setOpenSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  return (
    <section id="case-studies" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
          Deep Dives
        </p>
        <h2 className="text-3xl font-bold mb-10">Case Studies</h2>

        <div className="space-y-8">
          {caseStudies.map((study) => {
            const isOpen = openSlugs.has(study.slug);

            return (
              <div
                key={study.slug}
                className="p-8 rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition duration-300"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-2">
                  {study.tagline}
                </p>
                <h3 className="text-2xl font-semibold mb-3">{study.title}</h3>
                <p className="text-sm text-gray-500 italic mb-5">
                  {study.role}
                </p>

                <p className="text-gray-700 mb-5 leading-relaxed">
                  {study.excerpt}
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  {study.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-gray-100 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => toggle(study.slug)}
                  aria-expanded={isOpen}
                  className="px-5 py-2 bg-black text-white rounded-xl hover:opacity-90 transition"
                >
                  {isOpen ? "Hide Full Case Study" : "Read Full Case Study"}
                </button>

                {isOpen && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    {study.sections.map((section, i) => (
                      <div key={i} className="mb-8 last:mb-0">
                        <h4 className="text-xl font-semibold mb-4">
                          {section.heading}
                        </h4>
                        <CaseStudyContent blocks={section.blocks} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
