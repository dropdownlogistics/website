export const metadata = {
  title: "ChatGPT — Council Profile · DDL",
  description: "ChatGPT — DDL Council, Dropdown Logistics.",
  openGraph: {
    title: "ChatGPT — Council Profile · DDL",
    description: "ChatGPT — DDL Council, Dropdown Logistics.",
    url: "https://www.dropdownlogistics.com/council/profiles/chatgpt",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "ChatGPT — Council Profile · DDL",
    description: "ChatGPT — DDL Council, Dropdown Logistics.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
