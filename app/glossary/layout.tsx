export const metadata = {
  title: "Glossary — Dropdown Logistics",
  description: "Glossary — Dropdown Logistics.",
  openGraph: {
    title: "Glossary — Dropdown Logistics",
    description: "Glossary — Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/glossary",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Glossary — Dropdown Logistics",
    description: "Glossary — Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
