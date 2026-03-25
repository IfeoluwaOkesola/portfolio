import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ifeoluwa Okesola | Backend Engineer",
  description:
    "Backend Engineer specializing in scalable systems, cloud infrastructure, and DevOps. Experienced with NestJS, TypeScript, AWS, and microservices.",
  openGraph: {
    title: "Ifeoluwa Okesola | Backend Engineer",
    description:
      "Backend Engineer specializing in scalable systems, cloud infrastructure, and DevOps.",
    url: "https://portfolio-eosin-rho-54.vercel.app/",
    siteName: "Ifeoluwa Okesola Portfolio",
    type: "website",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Ifeoluwa Okesola",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}