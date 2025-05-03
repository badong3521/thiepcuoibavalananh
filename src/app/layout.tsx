import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thiệp cưới Hoàng Ba và Lan Anh",
  description: "Kính mời quý khách",
  openGraph: {
    title: "Thiệp cưới Hoàng Ba và Lan Anh",
    description: "Kính mời quý khách",
    url: "https://thiepcuoibavalananh.vercel.app/", // Thay bằng domain thật nếu có
    siteName: "Thiệp cưới Hoàng Ba và Lan Anh",
    images: [
      {
        url: "/thiep1.jpg", // Đường dẫn ảnh trong thư mục public
        width: 1200,
        height: 630,
        alt: "Ảnh đại diện thiệp mời cưới",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  icons: {
    icon: "/thiep1.jpg", // Dùng luôn ảnh này làm favicon, có thể thay bằng ảnh khác nếu muốn
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        cz-shortcut-listen="true"
        className={`${geistSans.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
