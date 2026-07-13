export const metadata = {
  title: "LLM Setup — BlindSpot",
  description: "LLM Setup — BlindSpot D&A Analytics, Dropdown Logistics.",
  openGraph: {
    title: "LLM Setup — BlindSpot",
    description: "LLM Setup — BlindSpot D&A Analytics, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/blindspot/llm",
    images: [{ url: "/og-blindspot.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "LLM Setup — BlindSpot",
    description: "LLM Setup — BlindSpot D&A Analytics, Dropdown Logistics.",
    images: ["/og-blindspot.svg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
