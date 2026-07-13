export const metadata = {
  title: "Foreword Convergence — Dropdown Logistics",
  description: "Nine models. No coordination. One consensus:",
  openGraph: {
    title: "Foreword Convergence — Dropdown Logistics",
    description: "Nine models. No coordination. One consensus:",
    url: "https://www.dropdownlogistics.com/forewords",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Foreword Convergence — Dropdown Logistics",
    description: "Nine models. No coordination. One consensus:",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
