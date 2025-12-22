import type React from "react"
import { AtlasDataProvider } from "@/context/AtlasDataContext"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AtlasDataProvider>{children}</AtlasDataProvider>
}
