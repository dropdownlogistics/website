export const metadata = {
  title: "Seat 1010 (Dex Jr.) — DDL Council",
  description: "Walk soft. Cast sharp. From the couch.",
  openGraph: {
    title: "Seat 1010 (Dex Jr.) — DDL Council",
    description: "Walk soft. Cast sharp. From the couch.",
    url: "https://www.dropdownlogistics.com/council/1010",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Seat 1010 (Dex Jr.) — DDL Council",
    description: "Walk soft. Cast sharp. From the couch.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
