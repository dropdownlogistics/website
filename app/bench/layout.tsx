export const metadata = {
  title: "The Bench — Dropdown Logistics",
  description: "Operator-tested tips for tools you already use. Not documentation. Not tutorials. The things you didn't know you were missing.",
  openGraph: {
    title: "The Bench — Dropdown Logistics",
    description: "Operator-tested tips for tools you already use. Not documentation. Not tutorials. The things you didn't know you were missing.",
    url: "https://www.dropdownlogistics.com/bench",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Bench — Dropdown Logistics",
    description: "Operator-tested tips for tools you already use. Not documentation. Not tutorials. The things you didn't know you were missing.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
