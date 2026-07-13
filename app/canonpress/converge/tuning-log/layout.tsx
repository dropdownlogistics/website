export const metadata = {
  title: "Tuning Log — CanonPress",
  description: "Every week, Marcus Grey (Seat 1008) analyzes the nomination prompt, the deliberation output, and what the council revealed about its own behavior. This is the construction log.",
  openGraph: {
    title: "Tuning Log — CanonPress",
    description: "Every week, Marcus Grey (Seat 1008) analyzes the nomination prompt, the deliberation output, and what the council revealed about its own behavior. This is the construction log.",
    url: "https://www.dropdownlogistics.com/canonpress/converge/tuning-log",
    images: [{ url: "/og-canonpress.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tuning Log — CanonPress",
    description: "Every week, Marcus Grey (Seat 1008) analyzes the nomination prompt, the deliberation output, and what the council revealed about its own behavior. This is the construction log.",
    images: ["/og-canonpress.svg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
