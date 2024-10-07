import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const utama = localFont({
  src: "./fonts/utama.ttf",
  variable: "--font-utama",
  weight: "100 900",
});

export const metadata = {
  title: "KataKitaMah!",
  description: "Afirmasi Positif Yang Selalu Menemani Hari Anda",
  icons: {
    icon: ["/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${utama.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
