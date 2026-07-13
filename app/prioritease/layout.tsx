export const metadata = {
  title: "PrioritEase — Dropdown Logistics",
  description: "Prioritease — Dropdown Logistics.",
  openGraph: {
    title: "PrioritEase — Dropdown Logistics",
    description: "Prioritease — Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/prioritease",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "PrioritEase — Dropdown Logistics",
    description: "Prioritease — Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
