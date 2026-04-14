export const metadata = {
  title: 'WorkBench — Dropdown Logistics',
  description: "The modular business OS. Seventeen modules. One substrate. The architecture doesn't change.",
  openGraph: {
    title: 'WorkBench — Dropdown Logistics',
    description: "The modular business OS. Seventeen modules. One substrate. The architecture doesn't change.",
    url: 'https://www.dropdownlogistics.com/workbench',
    images: [{ url: '/og-workbench.svg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WorkBench — Dropdown Logistics',
    description: "The modular business OS. Seventeen modules. One substrate. The architecture doesn't change.",
    images: ['/og-workbench.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
