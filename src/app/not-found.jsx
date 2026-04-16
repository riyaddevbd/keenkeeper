"use client";

import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-9xl font-extrabold text-[#1e3a3a] mb-4 opacity-10">404</h1>
      <h2 className="text-3xl font-bold text-[#1e3a3a] mb-2">Oops! Page not found</h2>
      <p className="text-slate-500 mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/" className="btn-primary">
        <Home size={20} />
        <span>Back to Home</span>
      </Link>
    </div>
  );
}
