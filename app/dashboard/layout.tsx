// app/layout.tsx
import { DropDownProfile } from "@/components/layout/dropdown-profile";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Student Information System",
  description: "Manage student records efficiently",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="min-h-screen ">
        <div className="">
          <div></div>
          {children}
        </div>
      </main>
    </>
  );
}
