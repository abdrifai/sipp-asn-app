import Navbar from "./components/navbar/Navbar";
import ModalSearch from "./components/search/Modal-Search";
import Sidebar from "./components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIASN Touna",
  description: "Sistem Informasi Aparatur Sipil Negara",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Sidebar />
        <ModalSearch />
        <div>{children}</div>
      </body>
    </html>
  );
}
