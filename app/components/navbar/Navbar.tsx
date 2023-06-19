"use client";

import useSidebarModal from "@/app/hooks/useSidebarModal";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineAppstore } from "react-icons/ai";

export default function Navbar() {
  const sidebarModal = useSidebarModal();
  const [openUser, setOpenUser] = useState(false);
  return (
    <div>
      <div className="shadow-lg">
        <div className="container">
          <div className="flex justify-between item-center py-4">
            <div className="font-bold tracking-tighter text-slate-600">
              <Link href="/">SIP-ASN</Link>
            </div>
            <div className="font-bold tracking-tighter text-slate-300">
              <span className="text-lg">
                Badan Kepegawaian dan Pengembangan SDM Daerah Kabupaten Tojo
                Una-Una
              </span>
            </div>
            <div className="flex items-center px-3 relative">
              <button
                // onClick={() => setOpenUser(!openUser)}
                className={`${
                  openUser ? "text-red-700" : "text-slate-600"
                } font-semibold  hover:text-indigo-600 px-3`}
              >
                User
              </button>
              {openUser ? (
                <nav className="absolute top-16 right-0 py-5 bg-white shadow-lg rounded-lg max-w-[250px] w-full z-40">
                  <ul className="block">
                    <li className="group">
                      <Link
                        href="/login"
                        className="font-semibold py-2 mx-8 text-slate-600 group-hover:text-red-700"
                      >
                        Login
                      </Link>
                    </li>
                    <li className="group">
                      <Link
                        href="/register"
                        className="font-semibold py-2 mx-8 text-slate-600 group-hover:text-red-700"
                      >
                        Register
                      </Link>
                    </li>
                  </ul>
                </nav>
              ) : null}

              <button
                onClick={sidebarModal.onOpen}
                className="font-semibold group"
              >
                <AiOutlineAppstore className="font-bold text-slate-600 text-3xl group-hover:text-indigo-600 group-hover:shadow-md group-hover:rounded-md" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
