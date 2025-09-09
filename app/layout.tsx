import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast"

export const metadata = {
  title: 'Socially',
  description: 'A description for my Next.js application.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html suppressHydrationWarning>
        <body
          className={`antialiased`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <div className="min-h-screen">
                <Navbar />
                <main className="py-8">
                  <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-13 gap-3">
                      <div className="hidden lg:block lg:col-span-3">
                        <Sidebar />
                      </div>
                      <div className="lg:col-span-10">{children}</div>
                    </div>
                  </div>
                </main>
              </div>
              <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
