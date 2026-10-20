import type { Metadata,Viewport } from "next"
import { db } from "@/lib/data/repo"
import { TimeZoneRuntime } from "@/components/settings/timezone-runtime"
import { Archivo } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { LocaleBridge } from "@/i18n/bridge"
import { LocaleThemeControls } from "@/i18n/controls"
import "./globals.css"
const archivo=Archivo({subsets:["latin","latin-ext"],axes:["wdth"],variable:"--font-archivo",display:"swap"})
export const metadata:Metadata={title:{default:"Booking · Panel",template:"%s · Booking"},description:"Booking — appointments, clients, cash and automation.",robots:{index:false,follow:false}}
export const viewport:Viewport={themeColor:[{media:"(prefers-color-scheme: dark)",color:"#050505"},{media:"(prefers-color-scheme: light)",color:"#ffffff"}]}
export default async function RootLayout({children}:LayoutProps<"/">){ const snapshot = await db();return <html lang="en" className={archivo.variable+" h-full"} suppressHydrationWarning><head><script src="/booking-boot.js"/></head><body className="min-h-full"><TooltipProvider><TimeZoneRuntime timezone={snapshot.shopSettings.timezone} />{children}</TooltipProvider><LocaleBridge/><LocaleThemeControls/><Toaster position="bottom-right"/></body></html>}
