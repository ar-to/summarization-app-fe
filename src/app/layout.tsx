import "@/styles/globals.css"
import { fontClasses } from "@/fonts/fonts"

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={fontClasses}>{children}</body>
    </html>
  )
}
