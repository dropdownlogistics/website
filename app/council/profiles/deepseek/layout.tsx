export const metadata = {
  title: "DeepSeek — Council Profile · DDL",
  description: "DeepSeek — DDL Council, Dropdown Logistics.",
  openGraph: {
    title: "DeepSeek — Council Profile · DDL",
    description: "DeepSeek — DDL Council, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/council/profiles/deepseek",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "DeepSeek — Council Profile · DDL",
    description: "DeepSeek — DDL Council, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
