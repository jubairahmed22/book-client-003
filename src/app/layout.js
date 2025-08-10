// app/layout.tsx (SERVER COMPONENT - keeps metadata)
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./providers";
import DynamicLayout from "./DynamicLayout";
import logo from '../assets/book_forest.png'
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Book Forest",
  description: "",
 icons: {
    icon: '/favicon.ico',
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Add the Google Fonts link here */}
         <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Marcellus&family=Jost:wght@400;700&family=Roboto:wght@400;700&family=Space+Mono&family=Montserrat&family=Courier+Prime&family=Poppins:wght@400;700&family=Raleway:wght@400;700&family=Nunito+Sans:wght@400;700&family=Playfair+Display:wght@400;700&family=Lora:wght@400;700&family=Abril+Fatface&family=Pacifico&display=swap"
        />

      </head>
      <body className={poppins.variable}>
        <AuthProvider>
          <DynamicLayout>{children}</DynamicLayout>
       
        </AuthProvider>
      </body>
    </html>
  );
}
