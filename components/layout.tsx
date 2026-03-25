import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ifeoluwa Okesola | Backend Engineer",
  description:
    "Backend Engineer specializing in scalable systems, cloud infrastructure, and DevOps. Experienced with NestJS, TypeScript, AWS, and microservices.",
  keywords: [
    "Backend Engineer",
    "NestJS",
    "TypeScript",
    "AWS",
    "DevOps",
    "Software Engineer Nigeria",
  ],
  authors: [{ name: "Ifeoluwa Okesola" }],
  openGraph: {
    title: "Ifeoluwa Okesola | Backend Engineer",
    description:
      "Backend Engineer building scalable systems and cloud infrastructure.",
    url: "https://your-portfolio-url.com",
    siteName: "Ifeoluwa Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Ifeoluwa Okesola",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-black">
        {children}
      </body>
    </html>
  );
}