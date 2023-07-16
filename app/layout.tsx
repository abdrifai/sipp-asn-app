import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar/Navbar";
import ModalSearch from "./components/search/Modal-Search";
import Sidebar from "./components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIPP-ASN",
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
        <ToastContainer />
        <Navbar />
        <Sidebar />
        <ModalSearch />
        <div>{children}</div>
      </body>
    </html>
  );
}
