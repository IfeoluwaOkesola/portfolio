export type CaseStudyBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "subheading"; text: string };

export type CaseStudySection = {
  heading: string;
  blocks: CaseStudyBlock[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  stack: string[];
  excerpt: string;
  sections: CaseStudySection[];
};
