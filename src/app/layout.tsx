import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: [{ url: "/images/daejung-symbol.jpg", type: "image/jpeg" }],
    shortcut: "/images/daejung-symbol.jpg",
    apple: "/images/daejung-symbol.jpg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
