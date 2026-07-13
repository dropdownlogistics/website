export const metadata = {
  title: "Review System — DDL Council",
  description: "The template, the methodology, and the first review.",
  openGraph: {
    title: "Review System — DDL Council",
    description: "The template, the methodology, and the first review.",
    url: "https://www.dropdownlogistics.com/council/review-system",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Review System — DDL Council",
    description: "The template, the methodology, and the first review.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
