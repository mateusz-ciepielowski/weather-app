import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
});

export const metadata = {
  title: "Weather app",
  description: "Check the weather in your city!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased bg-linear-180 from-sky-300 to-sky-500 h-vh text-white`}
      >
        {children}
      </body>
    </html>
  );
}
