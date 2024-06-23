'use client'
import { Nav } from "@/components/nav";

export default function DashboardLayout({children}) {
    return (
      <div className="flex">
        <Nav/>
        {children}
      </div>
    )
  }

