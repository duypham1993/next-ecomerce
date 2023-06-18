import { useRouter } from "next/router";
import React from "react";
import Contact from "./Contact/Contact";
import Login from "./Login/Login";

export default function Topbar() {
  const router = useRouter();

  return (
    <div className="bg-green">
      <div className="container">
        <div className="flex items-center">
          <div className="w-4/6">
            <Contact />
          </div>
          <div className="flex w-2/6 justify-end">
            {router.pathname !== "/login" && <Login />}
          </div>
        </div>
      </div>
    </div>
  );
}
